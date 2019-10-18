import { zip } from 'lodash'
import React, { useState } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { color, leftTimelineColor } from '../data/colors'
import { icon } from '../data/icons'
import { TimelineEntry, TimelineEntryType, TimelineImage } from '../data/timeline-entries'

export interface P {
  entry: TimelineEntry
}

const innerImageBorder = 5
const outerImageBorder = 7

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
          // alignItems: 'center',
          // justifyContent: 'center',
          alignItems: 'stretch',
          alignContent: 'center',
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
              marginTop: '40px',
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
            style={{
              flexGrow: 1,
              animation: visible ? 'bounce-left-to-right 0.6s' : '',
              flexBasis: 1,
              margin: '0 0 0 15px',
              borderRadius: `${outerImageBorder}px`,
              border: `${outerImageBorder}px solid`,
              borderColor: color(entry.type),
              background: color(entry.type),
            }}
          >
            {entry.images.map((imageRow, rowIndex) => renderImageRow(entry.type, imageRow, rowIndex))}
          </section>
        )}
      </article>
    </VisibilitySensor>
  )
}

function renderImageRow(type: TimelineEntryType, imageRow: TimelineImage[], rowIndex: number) {
  const imageWidths = calculateImageWidths(imageRow)
  return (
    <div
      key={rowIndex}
      style={{ fontSize: 0, marginTop: rowIndex === 0 ? '' : `${innerImageBorder}px` }}
    >
      {zip(imageRow, imageWidths).map(([image, width]) => {
        if (!image || !width) throw new Error(`Image or with are not set ${image} ${image}`)

        return (
          <img
            key={image.url}
            src={image.url}
            style={{
              width,
              marginLeft: `-${innerImageBorder}px`,
              borderLeft: `${innerImageBorder}px solid`,
              borderLeftColor: color(type),
            }}
          />
        )
      })}
    </div>
  )
}

function calculateImageWidths(imageRow: TimelineImage[]) {
  const widthsAndHeights = imageRow.map(({ dimensions: { width, height } }) => [width, height])
  const tooSmallWidths = widthsAndHeights.map(([width, height]) => width / height)
  const totalWidth = sum(tooSmallWidths)
  return tooSmallWidths
    .map(width => width / totalWidth)
    .map(width => width * 100)
    .map(width => Math.floor(10000 * width) / 10000)
    .map(width => `${width}%`)
}

function imagesWidth(imageCount: number) {
  return `${Math.floor(100000 / imageCount) / 1000}%`
}

function sum(arr: number[]) {
  return arr.reduce((sum, current) => sum + current, 0)
}
