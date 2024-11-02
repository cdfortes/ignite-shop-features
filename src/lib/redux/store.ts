import { Product } from '@/types/product'
import {
  combineReducers,
  configureStore,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

interface CartItem {
  cartItems: Product[]
  quantityItems: number
  totalPrice: number
}

interface AddItemCart {
  product: Product
}

interface RemoveItemCart {
  productId: string
}

const initialState: CartItem = {
  cartItems: [],
  quantityItems: 0,
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cartWidget',
  initialState,
  reducers: {
    addItemCart: (state, action: PayloadAction<AddItemCart>) => {
      const itemCart = state.cartItems?.find(
        (item) => item.id === action.payload.product.id,
      )

      if (!itemCart) {
        state.cartItems?.push(action.payload.product)
        state.quantityItems += 1
        state.totalPrice += action.payload.product.price
      }
    },
    removeItemCart: (state, action: PayloadAction<RemoveItemCart>) => {
      const newCartItems = state.cartItems?.filter(
        (item) => item.id !== action.payload.productId,
      )
      const newQuantityItems = state.quantityItems - 1

      const newTotalPrice = newCartItems?.reduce(
        (acc, item) => acc + item.price,
        0,
      )

      state.cartItems = newCartItems
      state.quantityItems = newQuantityItems
      state.totalPrice = newTotalPrice || 0
    },
    reset: (state) => {
      state.cartItems = initialState.cartItems
      state.quantityItems = initialState.quantityItems
      state.totalPrice = initialState.totalPrice
    },
  },
})

const persistConfig = {
  key: 'igniteShop:CartItems',
  storage,
  timeout: 1000,
}

const persistedReducer = persistReducer(persistConfig, cartSlice.reducer)

const rootReducer = combineReducers({
  cartWidget: persistedReducer,
})

export const cartStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
}

export const { addItemCart, removeItemCart, reset } = cartSlice.actions

export type AppStore = ReturnType<typeof cartStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
