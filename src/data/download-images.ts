import crypto from 'crypto'
import { createWriteStream, promises } from 'fs'
import { get } from 'https'
import { timeline } from './timeline-entries'

const timelineImagesDir = 'src/images/timeline'

async function main() {
  await ensureImagesDirExists()
  return Promise.all(timeline.flatMap(({ images }) => images).map(downloadImage))
}

async function ensureImagesDirExists() {
  const stats = await promises.stat(timelineImagesDir).catch(() => null)
  if (!stats || !stats.isDirectory()) await promises.mkdir(timelineImagesDir, '0755')
}

async function downloadImage(src: string) {
  const file = createWriteStream(`${timelineImagesDir}/${filename(src)}`)
  return new Promise((resolve, reject) => {
    const request = get(src, response => response.pipe(file))
    request.on('error', reject)
    request.on('close', resolve)
  })
}

function filename(src: string) {
  const name = crypto
    .createHash('sha1')
    .update(src)
    .digest('hex')
    .slice(0, 30)
  return `${name}.jpg`
}

main()
  .catch(err => console.error(err))
  .then(() => console.log('Done'))
