import { parseISO } from 'date-fns'
import imageMetadata from '../images/timeline/meta.json'
import { Unpacked } from '../utils'
import { timeline2019 } from './data-2019'

const metaMap = new Map(imageMetadata.map(meta => [meta.url, meta]))

export const timeline = Object.freeze(
  timeline2019.map(entry => ({
    type: entry.type,
    title: entry.title as string,
    desc: entry.desc as string,
    date: parseISO(entry.date),
    link: 'link' in entry ? entry.link : '',
    result: 'result' in entry ? parseResult(entry.result) : null,
    images: enhanceImages('images' in entry ? entry.images : []),
  }))
)

function parseResult(result: string) {
  const all = result.split('-').map(str => parseInt(str, 10))
  if (all.length !== 3) throw new Error(`Unexpected result ${result}`)
  const [first, second, overall] = all
  return { first, second, overall }
}

function enhanceImages(images: readonly (readonly string[])[]) {
  return images.map(imageRow =>
    imageRow.map(image => {
      const meta = metaMap.get(image)
      if (!meta) throw new Error(`No metadata found for image ${image}`)
      return meta
    })
  )
}

export const timelineEntryTypes = [...new Set(timeline.map(({ type }) => type))].sort()

export type TimelineEntry = Unpacked<typeof timeline>
export type TimelineEntryType = Unpacked<typeof timelineEntryTypes>
export type TimelineImage = Unpacked<Unpacked<ReturnType<typeof enhanceImages>>>
