import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type SkeletonProps = ComponentProps<'div'>

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={twMerge('animate-pulse rounded-lg bg-icon/10', className)}
      {...props}
    />
  )
}
