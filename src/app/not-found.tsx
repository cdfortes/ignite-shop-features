import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mt-auto flex w-full flex-col items-center justify-center px-3 text-center">
      <h1 className="mt-12 font-roboto text-3xl font-bold text-title">
        Página não encontrada
      </h1>
      <Link
        href={'/'}
        className="mt-16 font-roboto text-xl font-bold text-principal"
      >
        Voltar para a página principal
      </Link>
    </div>
  )
}
