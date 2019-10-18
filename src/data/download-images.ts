import crypto from 'crypto'
import { createWriteStream, existsSync, promises } from 'fs'
import { get } from 'https'
import { imageSize } from 'image-size'
import { promisify } from 'util'
import { timeline } from './timeline-entries'

const sizeOf = promisify(imageSize)
const timelineImagesDir = 'src/images/timeline'

async function main() {
  await ensureImagesDirExists()
  const metadata = await Promise.all(timeline.flatMap(({ images }) => images).map(handleImage))
  await promises.writeFile(`${timelineImagesDir}/meta.json`, JSON.stringify(metadata, null, '  '))
}

async function ensureImagesDirExists() {
  if (!existsSync(timelineImagesDir)) await promises.mkdir(timelineImagesDir, '0755')
}

async function handleImage(url: string) {
  const filePath = `${timelineImagesDir}/${filename(url)}`
  await downloadImage(url, filePath)
  return { filePath, url, filename: filename(url), dimensions: await extractDimensions(filePath) }
}

function filename(src: string) {
  const name = crypto
    .createHash('sha1')
    .update(src)
    .digest('hex')
    .slice(0, 30)
  return `${name}.jpg`
}

async function downloadImage(src: string, filePath: string) {
  if (existsSync(filePath)) return

  const file = createWriteStream(filePath)
  await new Promise((resolve, reject) => {
    const request = get(src, response => response.pipe(file))
    request.on('error', reject)
    request.on('close', resolve)
  })
}
async function extractDimensions(filePath: string) {
  const dimensions = await sizeOf(filePath)
  if (!dimensions) throw new Error(`Unable to determine dimensions of ${filePath}`)
  const { height, width } = dimensions
  return { width, height }
}

main()
  .catch(err => console.error(err))
  .then(() => console.log('Done'))
