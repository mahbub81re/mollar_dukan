import React from 'react'

import { EmblaOptionsType } from 'embla-carousel-react'
import EmblaCarousel from '@/components/EmblaCarousel'

const OPTIONS: EmblaOptionsType = {
   dragFree: true , 
  }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


export default function Benner() {
  return (
    <div>
       <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </div>
  )
}
