import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { timeline } from '../data/data'

declare module 'react-vertical-timeline-component' {
  interface VerticalTimelineElementProps {
    contentStyle?: React.CSSProperties
    contentArrowStyle?: React.CSSProperties
  }
}

export function Timeline(_props: any) {
  return (
    <VerticalTimeline>
      {timeline.map(entry => (
        <VerticalTimelineElement
          key={`${entry.title}-${entry.date}`}
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
          date={entry.date.toLocaleString()}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<div>{entry.type}</div>}
        >
          <h3 className="vertical-timeline-element-title">{entry.title}</h3>
          <h4 className="vertical-timeline-element-subtitle">{entry.type}</h4>
          <p>{entry.desc}</p>
          {entry.result && (
            <p>
              1st moto: {entry.result.first}, 2nd moto: {entry.result.second}, Overall:{' '}
              {entry.result.overall}
            </p>
          )}
          <p>
            <a href={entry.link}>Details</a>
          </p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  )
}
