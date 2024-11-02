'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ItemPurchase } from '../components/ItemPurchase'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { NextResponse } from 'next/server'
import { reset } from '@/lib/redux/store'
import { useAppDispatch } from '@/lib/redux/hooks'

interface GetSessionProps {
  params: {
    session_id: string
  }
}

interface DataProps {
  customerName: string | undefined
  product: {
    name: string
    imageUrl: string
  }[]
}

export default function Purchase() {
  const router = useRouter()

  const searchParams = useSearchParams()
  const search = searchParams.get('session_id')

  const [purchase, setPurchase] = useState<DataProps>()

  const dispatch = useAppDispatch()

  const getPurchase = useCallback(
    async ({ params }: GetSessionProps) => {
      if (!params.session_id) {
        router.push('/')
      }
      const sessionId = String(params.session_id)

      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product'],
      })

      const customerName = session.customer_details?.name
      const products = session.line_items?.data.map((item) => {
        return item.price?.product
      }) as Stripe.Product[]

      const buy = products.map((item) => {
        return {
          name: item.name,
          imageUrl: item.images[0],
        }
      })

      dispatch(reset())

      return NextResponse.json({
        customerName,
        product: buy,
      })
    },
    [router, dispatch],
  )

  useEffect(() => {
    getPurchase({
      params: {
        session_id: String(search),
      },
    }).then((res) => res.json().then((data: DataProps) => setPurchase(data)))
  }, [search, getPurchase])

  return (
    <div className="flex w-full flex-col items-center justify-center px-3 text-center">
      <Image
        src={'/logo.svg'}
        alt="img"
        width={129.74}
        height={52}
        className="mt-16"
      />
      <section className="mt-28 flex flex-row [&>div+div]:-ml-12">
        {purchase?.product.map((item) => {
          return (
            <ItemPurchase key={item.name.toLowerCase()}>
              <Image src={item.imageUrl} width={130} height={133} alt="" />
            </ItemPurchase>
          )
        })}
      </section>
      <h1 className="mt-12 font-roboto text-3xl font-bold text-title">
        Compra efetuada!
      </h1>
      <p className="mt-6 font-roboto text-xl font-normal text-title">
        Uhuul{' '}
        <strong className="font-roboto text-2xl font-bold">
          {purchase?.customerName}
        </strong>
        , sua compra de {purchase?.product.length}{' '}
        {purchase?.product && purchase.product.length < 2
          ? 'camiseta'
          : 'camisetas'}{' '}
        já está a caminho da sua casa.
      </p>
      <Link
        href={'/'}
        className="mt-16 font-roboto text-xl font-bold text-principal"
      >
        Voltar ao catálogo
      </Link>
    </div>
  )
}
