import Image from 'next/image'

export function ItemCart() {
  return (
    <div className="flex gap-5">
      <div className="flex h-28 w-28 items-center justify-center rounded-lg bg-gradient-to-t from-begin to-end">
        <Image
          src={'/shirt01.png'}
          width={95}
          height={95}
          alt=""
          className="object-cover"
        />
      </div>
      <div className="relative flex flex-col gap-2">
        <span className="font-roboto text-lg font-normal text-text">
          Camiseta Beyond the Limits
        </span>
        <strong className="font-roboto text-lg font-bold text-title">
          R$ 79,90
        </strong>
        <button className="absolute bottom-0 flex font-roboto text-base font-bold text-principal">
          Remover
        </button>
      </div>
    </div>
  )
}
