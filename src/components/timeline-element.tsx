import React from 'react'
import { icon } from '../data/icons'
import { TimelineEntry } from '../data/timeline-entries'

export interface P {
  entry: TimelineEntry
}

export function TimelineElement(props: P) {
  const entry = props.entry
  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // alignItems: 'stretch',
        alignContent: 'center',
        // justifyContent: 'center',
        padding: '10px',
      }}
    >
      <section style={{ zIndex: 2, flexShrink: 0, flexGrow: 0, position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            background: '#fff',
            border: '5px solid green',
            borderRadius: '50%',
            width: '95px',
            height: '95px',
          }}
        >
          <div style={{ alignSelf: 'center' }}>{icon(entry.type)}</div>
        </div>
      </section>
      <section style={{ zIndex: 2, flexShrink: 0, flexGrow: 0, position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            borderWidth: '12px',
            borderStyle: 'solid',
            borderColor: 'transparent white transparent transparent',
            borderImage: 'initial',
            borderRightColor: 'green',
            width: '0px',
            marginLeft: '5px',
            height: '0px',
          }}
        />
      </section>
      <section
        style={{
          background: '#2e7d32',
          color: '#fff',
          borderRadius: '10px',
          padding: '5px 20px',
          flexGrow: 1,
        }}
      >
        <h3 className="vertical-timeline-element-title">{entry.title}</h3>
        <h4 className="vertical-timeline-element-subtitle">
          {entry.date.toLocaleString()} - {entry.type}
        </h4>
        <p>{entry.desc}</p>
        {entry.result && (
          <p>
            1st moto: {entry.result.first}, 2nd moto: {entry.result.second}, Overall:{' '}
            {entry.result.overall}
          </p>
        )}
        <p>
          <a href={entry.link} target="_blank">
            Details
          </a>
        </p>
      </section>
    </article>
  )
}
