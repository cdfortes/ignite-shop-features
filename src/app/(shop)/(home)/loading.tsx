import { Skeleton } from '@/app/components/Skeleton'
import { CaretRight } from '@phosphor-icons/react/dist/ssr'

export default function HomeLoading() {
  return (
    <div className="flex h-full justify-between gap-12 pl-11">
      <div className="">
        <Skeleton className="h-[600px] w-[320px] lg:min-w-[696px]" />
        <div className="mt-6 flex flex-row justify-between">
          <Skeleton className="h-[32px] min-w-[150px] lg:min-w-[330px]" />
          <Skeleton className="h-[32px] min-w-[50px] lg:min-w-[100px]" />
        </div>
      </div>
      <div className="relative hidden lg:inline">
        <Skeleton className="h-[600px] min-w-[696px]" />
        <div className="absolute right-0 top-0 mr-4 flex h-[600px] w-[136px] items-center justify-end">
          <CaretRight size={48} className="mt-10 text-text" />
        </div>
        <div className="mt-6 flex flex-row justify-between">
          <Skeleton className="h-[32px] lg:min-w-[330px]" />
          <Skeleton className="h-[32px] lg:min-w-[100px]" />
        </div>
      </div>
    </div>
  )
}
