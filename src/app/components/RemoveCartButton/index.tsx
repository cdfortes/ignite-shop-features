'use client'

import { useAppDispatch } from '@/lib/redux/hooks'
import { removeItemCart } from '@/lib/redux/store'

interface RemoveCartButtonProps {
  productId: string
}

export function RemoveCartButton({ productId }: RemoveCartButtonProps) {
  const dispatch = useAppDispatch()

  const handleRemoveProductToCart = () => {
    dispatch(removeItemCart({ productId }))
  }

  return (
    <button
      type="button"
      className="absolute bottom-0 flex font-roboto text-base font-bold text-principal"
      onClick={handleRemoveProductToCart}
      data-cy="button-item-cart"
    >
      Remover
    </button>
  )
}
