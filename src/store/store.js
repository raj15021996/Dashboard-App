import { configureStore } from '@reduxjs/toolkit'
import widgetsReducer from './reducers'
const store = configureStore({
  reducer: {
    widgets: widgetsReducer,
  },
})

export default store;
