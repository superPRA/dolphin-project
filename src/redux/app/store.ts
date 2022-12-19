import { configureStore } from '@reduxjs/toolkit'
import inputSlice from './features/inputs/inputSlice'
import cartSlice from './features/shopingCart/cartSlice'
// ...

const store = configureStore({
  reducer: {
    cart: cartSlice,
    inp: inputSlice
  }
})

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch