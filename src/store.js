import { configureStore } from '@reduxjs/toolkit'

import pageReducer from './reducer/pageSlice'

export default configureStore({
  reducer: {
    page: pageReducer
  },
})