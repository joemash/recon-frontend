/** Icons are imported separatly to reduce build time */
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'

const iconClasses = `h-6 w-6`

const routes = [ 
  {
    path: '/app/reconciliations',
    icon: <WalletIcon className={iconClasses}/>, 
    name: 'Reconciliations',
  },

  
]

export default routes


