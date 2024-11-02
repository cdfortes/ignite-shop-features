'use client'

import { AppStore, cartStore } from '@/lib/redux/store'
import { ReactNode, useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'

interface StoreProviderProps {
  children: ReactNode
}

export default function StoreProvider({ children }: StoreProviderProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storeRef: any = useRef<AppStore>()
  if (!storeRef.current) {
    storeRef.current = cartStore()
  }

  useEffect(() => {
    persistStore(storeRef.current)
  }, [])

  return <Provider store={storeRef.current}>{children}</Provider>
}
