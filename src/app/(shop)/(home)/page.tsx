import { Product } from '@/types/product'
import { Handbag } from '@phosphor-icons/react/dist/ssr'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import 'keen-slider/keen-slider.min.css'
import { ProductContainer } from '@/app/components/ProductContainer'

async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL_APP}/api/products`,
    {
      next: {
        revalidate: 60 * 60,
      },
    },
  )
  const products = await response.json()

  return products
}

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  if (!process.env.NEXT_PUBLIC_VERCEL_URL_APP) {
    return null
  }
  const products = await getProducts()

  return (
    <ProductContainer>
      {products.map((product) => {
        return (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            data-cy="link-product"
          >
            <div className="keen-slider__slide group relative flex h-[656px] min-w-[696px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-t from-begin to-end">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={401}
                height={401}
                className="object-cover"
              />
              <footer className="absolute bottom-1 left-1 right-1 flex translate-y-[110%] items-center justify-between rounded-md bg-elements p-2 opacity-90 transition duration-200 ease-in-out group-hover:translate-y-0">
                <div className="flex flex-col">
                  <strong className="font-roboto text-xl font-bold text-title">
                    {product.name}
                  </strong>
                  <span className="font-roboto text-2xl font-bold text-light">
                    {product.price}
                  </span>
                </div>
                <div className="rounded-md bg-principal p-3">
                  <Handbag width={32} height={32} className="text-white" />
                </div>
              </footer>
            </div>
          </Link>
        )
      })}
    </ProductContainer>
  )
}
