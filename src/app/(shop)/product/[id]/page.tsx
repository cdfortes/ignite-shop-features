import { AddCartButton } from '@/app/components/AddCartButton'
import { Product } from '@/types/product'
import { Metadata } from 'next'
import Image from 'next/image'

interface ProductProps {
  params: {
    id: string
  }
}

async function getProduct(id: string): Promise<Product> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL_APP}/api/products/${id}`,
    {
      next: {
        revalidate: 60 * 60,
      },
    },
  )

  const product = await response.json()

  return product
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProduct(params.id)

  return {
    title: product.name,
  }
}

export default async function ProductPage({ params }: ProductProps) {
  const product = await getProduct(params.id)

  return (
    <div className="w-full px-4 lg:flex lg:justify-between lg:gap-16 lg:px-11">
      <div className="flex h-[656px] items-center justify-center rounded-lg bg-gradient-to-t from-begin to-end lg:min-w-[576px]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={401}
          height={401}
          className="object-cover"
        />
      </div>
      <div className="mt-3 flex flex-col lg:mt-0">
        <h1 className="font-roboto text-3xl font-bold text-text">
          {product.name}
        </h1>
        <span className="pt-4 font-roboto text-3xl text-light">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(product.price) / 100)}
        </span>
        <p className="mb-10 pt-10 font-roboto text-lg font-normal text-text lg:mb-0">
          {product.description}
        </p>
        <AddCartButton product={product} />
      </div>
    </div>
  )
}
