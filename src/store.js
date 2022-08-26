import { configureStore } from '@reduxjs/toolkit';

import pageSlice from './reducer/pageSlice';

export default configureStore({
  reducer: {
    page: pageSlice
  },
});