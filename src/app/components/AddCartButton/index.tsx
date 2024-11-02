'use client'

import { useAppDispatch } from '@/lib/redux/hooks'
import { addItemCart } from '@/lib/redux/store'
import { Product } from '@/types/product'

interface AddCartButtonProps {
  product: Product
}

export function AddCartButton({ product }: AddCartButtonProps) {
  const dispatch = useAppDispatch()

  const handleAddProductToCart = () => {
    dispatch(addItemCart({ product }))
  }
  return (
    <button
      type="button"
      className="mt-auto items-center rounded-lg bg-principal p-5 font-roboto text-xl font-bold text-white hover:bg-light"
      onClick={handleAddProductToCart}
    >
      Colocar na sacola
    </button>
  )
}
