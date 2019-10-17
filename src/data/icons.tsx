import {
  faDumbbell,
  faFire,
  faFlagCheckered,
  faInfo,
  faMotorcycle,
  faWrench,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { assertNever } from '../utils'
import { TimelineEntryType } from './timeline-entries'

export function icon(type: TimelineEntryType) {
  return <FontAwesomeIcon icon={iconSrc(type)} size="4x" fixedWidth={true} />
}

function iconSrc(type: TimelineEntryType) {
  switch (type) {
    case 'fitness':
      return faDumbbell
    case 'info':
      return faInfo
    case 'race':
      return faFlagCheckered
    case 'technical':
      return faWrench
    case 'training':
      return faMotorcycle
    case 'trouble':
      return faFire
  }
  assertNever(type)
}
