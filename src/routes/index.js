// All components mapping with path for internal routes

import { lazy } from 'react'

const ReconComponent = lazy(() => import('../pages/protected/Reconcile'))
const ReconDetailComponent = lazy(() => import('../pages/protected/ReconcileDetails'))
const ReconcileForm = lazy(() => import('../pages/protected/ReconForm'))


const routes = [
  {
    path: '/reconciliations', // the url
    component: ReconComponent, // view rendered
  },
  {
    path: '/reconciliations/:id', // the url
    component: ReconDetailComponent, // view rendered
  },
  {
    path: '/reconcile', // the url
    component: ReconcileForm, // view rendered
  },
]

export default routes
