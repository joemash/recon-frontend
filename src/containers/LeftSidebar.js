import routes from '../routes/sidebar'
import { NavLink,  Routes, Link , useLocation} from 'react-router-dom'
import SidebarSubmenu from './SidebarSubmenu';
import XMarkIcon  from '@heroicons/react/24/outline/XMarkIcon'
import { useDispatch } from 'react-redux';

function LeftSidebar(){
    const location = useLocation();

    const dispatch = useDispatch()


    const close = (e) => {
        document.getElementById('left-sidebar-drawer').click()
    }

    return(
        <div className="drawer-side  z-30  ">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label> 
            <ul className="menu  pt-2 w-80 bg-base-100 min-h-full   text-base-content">
            <button className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden" onClick={() => close()}>
            <XMarkIcon className="h-5 inline-block w-5"/>
            </button>

                <li className="mb-2 font-semibold bg-gray-200 p-2 rounded text-xl">
               <Link to={'/app/reconciliations'} className="flex items-center">
  
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" width="100" height="40">
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor: '#4a90e2', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#50e3c2', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                  <rect x="10" y="10" rx="20" ry="20" width="280" height="80" fill="url(#grad)"/>
                  <text x="150" y="65" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="bold" textAnchor="middle" fill="white">Recon360</text>
                  <circle cx="250" cy="50" r="15" fill="white" opacity="0.3"/>
                  <path d="M250 35 L265 50 L250 65 L235 50 Z" fill="white"/>
                 </svg> 
                 <span className="ml-2 text-xl font-medium">Recon360</span> 
                </Link>

                </li>
                {
                    routes.map((route, k) => {
                        return(
                            <li className="" key={k}>
                                {
                                    route.submenu ? 
                                        <SidebarSubmenu {...route}/> : 
                                    (<NavLink
                                        end
                                        to={route.path}
                                        className={({isActive}) => `${isActive ? 'font-semibold  bg-base-200 ' : 'font-normal'}`} >
                                           {route.icon} {route.name}
                                            {
                                                location.pathname === route.path ? (<span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                                                aria-hidden="true"></span>) : null
                                            }
                                    </NavLink>)
                                }
                                
                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

export default LeftSidebar