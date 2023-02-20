import { configureStore } from '@reduxjs/toolkit'
import moduleReducer from './ModuleReducer'

const store = configureStore({
  reducer: {
    module: moduleReducer,
  },
})

export default store