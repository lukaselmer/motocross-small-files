import { createWriteStream, existsSync, promises } from 'fs'
import { get } from 'https'

export async function downloadFile(url: string, destination: string) {
  if (existsSync(destination)) return
  const file = createWriteStream(destination)
  try {
    console.log(`Downloading ${destination} ...`)
    const timeout = 10000
    await new Promise((resolve, reject) => {
      const request = get(url, response => {
        response
          .on('error', reject)
          .on('end', resolve)
          .setTimeout(timeout, () => {
            reject('timeout')
            request.abort()
          })
        response.pipe(file)
      })
        .on('error', reject)
        .on('close', () => resolve())
        .setTimeout(timeout, () => {
          reject('timeout')
          request.abort()
        })
      setTimeout(() => {
        reject('timeout')
        request.abort()
      }, timeout)
    })
    console.log(`Done downloading ${destination}`)
  } catch (error) {
    console.error(`Error downloading ${destination}`)
    try {
      file.close()
    } catch {}
    await promises.unlink(destination)
    throw error
  }
}
