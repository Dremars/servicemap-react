import React from 'react'
const {divIcon} = require('leaflet')
import { renderToStaticMarkup } from 'react-dom/server';
import './MapView.css'

const BusIcon = divIcon({
  html: renderToStaticMarkup(<p className='bus-icon'>2</p>)
})

const TramIcon = divIcon({
  html: renderToStaticMarkup(<p className='tram-icon'>3</p>)
})

export {BusIcon, TramIcon}