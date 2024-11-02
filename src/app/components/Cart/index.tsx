'use client'
import { Handbag, X } from '@phosphor-icons/react/dist/ssr'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useAppSelector } from '@/lib/redux/hooks'
import Image from 'next/image'
import { RemoveCartButton } from '../RemoveCartButton'

export function Cart() {
  const quantityItems = useAppSelector(
    (state) => state.cartWidget.quantityItems,
  )

  const cartItems = useAppSelector((state) => state.cartWidget.cartItems)

  const totalPrice = useAppSelector((state) => state.cartWidget.totalPrice)

  async function handleBuyProduct() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_URL_APP}/api/checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cartItems }),
        },
      )

      const checkoutUrl = response.json()
      checkoutUrl.then((res) => {
        window.location.href = res.checkoutUrl
      })
    } catch (err) {
      alert(`Falha ao redirecionar ao checkout \n${err}`)
    }
  }

  return (
    <Collapsible.Root>
      <div className="relative z-20 flex">
        <Collapsible.Trigger asChild className="">
          <button
            className="items-center rounded-md bg-elements p-2"
            data-cy="button-cart"
          >
            <Handbag className="h-6 w-6 text-icon" />
            {quantityItems < 1 ? (
              ''
            ) : (
              <div className="absolute -right-3 top-[-8px] flex h-6 w-6 items-center justify-center overflow-visible rounded-full border-2 border-background bg-principal">
                <span
                  className="text-sm font-bold text-white"
                  data-cy="span-quantity-items"
                >
                  {quantityItems}
                </span>
              </div>
            )}
          </button>
        </Collapsible.Trigger>
      </div>
      <Collapsible.Content
        forceMount
        className="fixed right-0 top-0 z-20 flex h-screen w-screen flex-col overflow-auto bg-elements transition duration-200 ease-in-out data-[state=closed]:hidden lg:w-[480px] lg:translate-x-0"
        data-cy="content-cart"
      >
        <div className="flex justify-end">
          <Collapsible.Trigger asChild>
            <button
              className="mr-6 mt-8 flex h-6 w-6 data-[state=closed]:hidden"
              data-cy="button-close-cart"
            >
              <X className="h-6 w-6 text-icon" />
            </button>
          </Collapsible.Trigger>
        </div>
        <div className="flex w-full flex-col px-12">
          <h1 className="font-roboto text-xl font-bold text-title">
            Sacola de compras
          </h1>
          <div className="mt-8 flex h-[400px] w-full flex-col gap-6 overflow-auto md:h-full lg:h-[250px] 2xl:h-[520px]">
            {cartItems.length < 1 ? (
              <span className="font-roboto text-base font-normal text-text">
                A sacola de compras está vazia
              </span>
            ) : (
              ''
            )}
            {cartItems?.map((item) => {
              return (
                <>
                  <div className="flex gap-5">
                    <div
                      key={item.id}
                      className="flex h-28 min-w-28 items-center justify-center rounded-lg bg-gradient-to-t from-begin to-end"
                    >
                      <Image
                        src={item.imageUrl}
                        width={95}
                        height={95}
                        alt=""
                        className="object-cover"
                      />
                    </div>
                    <div className="relative flex flex-col gap-2">
                      <span className="font-roboto text-lg font-normal text-text">
                        {item.name}
                      </span>
                      <strong className="font-roboto text-lg font-bold text-title">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(Number(item.price) / 100)}
                      </strong>
                      <RemoveCartButton productId={item.id} />
                    </div>
                  </div>
                </>
              )
            })}
          </div>
          {cartItems.length > 0 ? (
            <footer className="absolute bottom-12 left-12 right-12">
              <div className="flex justify-between">
                <span className="font-roboto text-base font-normal text-text">
                  Quantidade
                </span>
                <span className="font-roboto text-lg font-normal text-text">
                  {quantityItems < 2
                    ? `${quantityItems} item`
                    : `${quantityItems} itens`}
                </span>
              </div>
              <div className="flex justify-between">
                <strong className="font-roboto text-lg font-bold text-title">
                  Valor Total
                </strong>
                <strong className="font-roboto text-2xl font-bold text-title">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(Number(totalPrice) / 100)}
                </strong>
              </div>
              <button
                type="button"
                className="mt-14 w-full items-center rounded-lg bg-principal p-5 font-roboto text-xl font-bold text-white hover:bg-light"
                onClick={handleBuyProduct}
                data-cy="button-checkout"
              >
                Finalizar compra
              </button>
            </footer>
          ) : (
            ''
          )}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
