import React, { useState } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { color, leftTimelineColor } from '../data/colors'
import { icon } from '../data/icons'
import { TimelineEntry } from '../data/timeline-entries'

export interface P {
  entry: TimelineEntry
}

export function TimelineElement(props: P) {
  const [visible, setVisible] = useState(false)

  const entry = props.entry
  return (
    <VisibilitySensor
      partialVisibility={true}
      offset={{ bottom: 40 }}
      onChange={isVisible => isVisible && setVisible(true)}
    >
      <article
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          // alignItems: 'stretch',
          alignContent: 'center',
          // justifyContent: 'center',
          padding: '10px',
          visibility: visible ? 'visible' : 'hidden',
        }}
      >
        <section
          style={{
            zIndex: 2,
            flexShrink: 0,
            flexGrow: 0,
            position: 'relative',
            animation: visible ? 'bounce-scale 0.6s' : '',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              background: color(entry.type),
              color: '#fff',
              border: '5px solid transparent',
              borderColor: leftTimelineColor,
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
              borderWidth: '15px',
              borderStyle: 'solid',
              borderColor: 'transparent',
              borderRightColor: color(entry.type),
              width: '0px',
              marginLeft: '5px',
              height: '0px',
              marginRight: '-2px',
              animation: visible ? 'bounce-left-to-right 0.6s' : '',
            }}
          />
        </section>
        <section
          style={{
            background: color(entry.type),
            color: '#fff',
            borderRadius: '10px',
            padding: '5px 20px',
            flexGrow: 1,
            animation: visible ? 'bounce-left-to-right 0.6s' : '',
            flexBasis: 1,
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
        {entry.images.length > 0 && (
          <section
            style={{ flexGrow: 1, animation: visible ? 'bounce-left-to-right 0.6s' : '', flexBasis: 1 }}
          >
            {entry.images.map(image => {
              return (
                <img
                  key={image}
                  src={image}
                  style={{
                    maxWidth: imagesWidth(entry.images.length),
                    borderRadius: '10px',
                    background: color(entry.type),
                    padding: '5px',
                    margin: '5px',
                  }}
                />
              )
            })}
          </section>
        )}
      </article>
    </VisibilitySensor>
  )
}

function imagesWidth(imageCount: number) {
  if (imageCount === 1) return '100%'
  if (imageCount === 2) return '45%'
  return '25%'
}
