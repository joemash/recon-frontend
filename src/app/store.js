import { configureStore } from '@reduxjs/toolkit'
import headerSlice from '../features/common/headerSlice'
import reconSlice from '../features/recon/reconciliationsSlice'
import authSlice from '../features/user/authSlice'

const combinedReducer = {
  header : headerSlice,
  authentication: authSlice,
  reconciliation: reconSlice,
}

export default configureStore({
    reducer: combinedReducer
})