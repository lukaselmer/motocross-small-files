import { assertNever } from '../utils'
import { TimelineEntryType } from './timeline-entries'

export function color(type: TimelineEntryType) {
  switch (type) {
    case 'fitness':
      return '#2e7d32'
    case 'info':
      return '#0d47a1'
    case 'race':
      return '#bc5100'
    case 'technical':
      return '#4a148c'
    case 'training':
      return '#3e2723'
    case 'trouble':
      return '#b71c1c'
  }
  assertNever(type)
}

export const leftTimelineColor = '#fff'
export const background = '#eceff1'
