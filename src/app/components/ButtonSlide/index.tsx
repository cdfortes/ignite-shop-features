'use client'
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr'
import { ComponentProps } from 'react'

type ButtonSlideType = ComponentProps<'button'>

interface ButtonSlideProps extends ButtonSlideType {
  arrowLeft?: boolean
  // onClick: (e: any) => void
}

export function ButtonSlide({ arrowLeft, ...props }: ButtonSlideProps) {
  return (
    <>
      {arrowLeft ? (
        <div className="absolute top-0 flex h-[656px] w-[136px] items-center bg-gradient-to-r from-background/75 from-0%">
          <button type="button" className="flex h-12 w-12" {...props}>
            <CaretLeft size={48} className="text-text" />
          </button>
        </div>
      ) : (
        <div className="absolute right-0 top-0 flex h-[656px] w-[136px] items-center justify-end bg-gradient-to-l from-background/75 from-0%">
          <button type="button" className="flex h-12 w-12" {...props}>
            <CaretRight size={48} className="text-text" />
          </button>
        </div>
      )}
    </>
  )
}
