import { stripe } from '@/lib/stripe'
import { Product } from '@/types/product'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { cartItems } = await req.json()
  const products: Product[] = Object.values(cartItems) as Product[]
  const items = products.map((item) => {
    return {
      price: item.defaultPriceId,
      quantity: 1,
    }
  })

  const successUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL_APP}/purchase?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL_APP}`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: items,
  })

  return NextResponse.json(
    {
      checkoutUrl: checkoutSession.url,
    },
    {
      status: 201,
    },
  )
}
