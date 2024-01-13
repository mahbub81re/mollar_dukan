"use client"
import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType
} from 'embla-carousel-react'
import imageByIndex from './imageByIndex'

import localFont from 'next/font/local'

const myFont = localFont({ src: './../fonts/Bukhari Script.ttf' })

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [scrollProgress, setScrollProgress] = useState(0)

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    setScrollProgress(progress * 100)
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onScroll(emblaApi)
    emblaApi.on('reInit', onScroll)
    emblaApi.on('scroll', onScroll)
  }, [emblaApi, onScroll])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index:number) => (
            <div className="embla__slide" key={index}>
              <div className={`embla__slide__number text-white  bg-black/50 w-[90%] md:w-[60%] p-6 font-mono`}>
                <div className='text-3xl'>{imageByIndex(index).title}</div>
                <div className='text-sm '>{imageByIndex(index).sub_title}</div>
                <div className='text-sm pl-[10px] pt-3   text-justify '>{imageByIndex(index).descrition}</div>
              </div>
              <img
                className="embla__slide__img"
                src={imageByIndex(index).image}
                alt="Your alt text"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="embla__progress">
        <div
          className="embla__progress__bar"
          style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
        />
      </div>
    </div>
  )
}

export default EmblaCarousel