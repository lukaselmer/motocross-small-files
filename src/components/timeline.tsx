import React from 'react'
import { background, leftTimelineColor } from '../data/colors'
// import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
// import 'react-vertical-timeline-component/style.min.css'
import { timeline } from '../data/timeline-entries'
import { TimelineElement } from './timeline-element'

declare module 'react-vertical-timeline-component' {
  interface VerticalTimelineElementProps {
    contentStyle?: React.CSSProperties
    contentArrowStyle?: React.CSSProperties
  }
}

export function Timeline() {
  return (
    <section style={{ display: 'flex', position: 'relative', flexDirection: 'column', background }}>
      <div
        style={{
          zIndex: 1,
          position: 'absolute',
          top: 0,
          left: '59.5px',
          width: '6px',
          height: '100%',
          // marginTop: '98px',
          // marginLeft: '-55px',
          // borderRadius: '10px',
          // margin: '10px 0 10px 0',
          background: leftTimelineColor,
          // flexGrow: 0,
          // flexShrink: 0,
        }}
      />
      {timeline.map(entry => (
        <TimelineElement key={`${entry.title}-${entry.date}`} entry={entry} />
      ))}
    </section>
  )
}
