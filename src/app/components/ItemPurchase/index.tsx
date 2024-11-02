import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type ItemPurchaseProps = ComponentProps<'div'>

interface ItemPurchaseChildren extends ItemPurchaseProps {
  children: ReactNode
}

export function ItemPurchase({
  children,
  className,
  ...props
}: ItemPurchaseChildren) {
  return (
    <div
      className={twMerge(
        'flex h-[140px] w-[140px] items-center justify-center rounded-full bg-gradient-to-t from-begin to-end shadow-2xl',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
