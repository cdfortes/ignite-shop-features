import { stripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { z } from 'zod'

interface DataParams {
  params: {
    id: string
  }
}

export async function GET(req: NextRequest, { params }: DataParams) {
  const id = z.string().parse(params.id)

  const product = await stripe.products.retrieve(id, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return NextResponse.json({
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    price: price.unit_amount,
    description: product.description,
    defaultPriceId: price.id,
  })
}
