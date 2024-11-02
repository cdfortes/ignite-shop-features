'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { ReactNode, useEffect, useState } from 'react'
import { ButtonSlide } from '../ButtonSlide'

interface ProductContainerProps {
  children: ReactNode
}

export function ProductContainer({ children }: ProductContainerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [screenResolution, setScreenResolution] = useState(3)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    slides: {
      perView: 3,
      spacing: 48,
    },
    breakpoints: {
      '(max-width: 768px)': {
        slides: {
          perView: 1,
          spacing: 24,
        },
      },
    },
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.screen.width < 768) {
        setScreenResolution(1)
      } else {
        setScreenResolution(3)
      }
    }
  }, [])

  return (
    <>
      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          {children}
        </div>
        {loaded && instanceRef.current && (
          <>
            {currentSlide === 0 ? (
              ''
            ) : (
              <ButtonSlide
                arrowLeft
                onClick={() => instanceRef.current?.prev()}
                data-cy="buttonLeft"
              />
            )}
            {currentSlide ===
            instanceRef.current.track.details.slides.length -
              screenResolution ? (
              ''
            ) : (
              <ButtonSlide
                onClick={() => instanceRef.current?.next()}
                data-cy="buttonRight"
              />
            )}
          </>
        )}
      </div>
    </>
  )
}
