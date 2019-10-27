import crypto from 'crypto'
import { existsSync, promises } from 'fs'
import { imageSize } from 'image-size'
import { promisify } from 'util'
import { timeline2019 } from './data-2019'
import { downloadFile } from './download-file'
import { allSettled } from './promise-pool'

const sizeOf = promisify(imageSize)
const timelineImagesDir = 'src/images/timeline'

async function main() {
  await ensureImagesDirExists()
  const downloadImages = timelineImages().map(image => () => handleImage(image))
  const metadata = await allSettled(downloadImages)
  await promises.writeFile(`${timelineImagesDir}/meta.json`, JSON.stringify(metadata, null, '  '))
}

async function ensureImagesDirExists() {
  if (!existsSync(timelineImagesDir)) await promises.mkdir(timelineImagesDir, '0755')
}

function timelineImages() {
  return timeline2019.flatMap(entry => entry.images.flat<string>())
}

async function handleImage(url: string) {
  const filePath = `${timelineImagesDir}/${filename(url)}`
  await downloadFile(url, filePath)
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

async function extractDimensions(filePath: string) {
  const dimensions = await sizeOf(filePath)
  if (!dimensions) throw new Error(`Unable to determine dimensions of ${filePath}`)
  const { height, width } = dimensions
  return { width, height }
}

main()
  .catch(err => console.error(err))
  .then(() => console.log('Done'))
