import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import { APP_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [ADMIN],
    },
    {
        key: 'accessDenied',
        path: '/access-denied',
        component: lazy(() => import('@/views/pages/AccessDenied')),
        authority: [ADMIN, USER],
    },
    {
        key:'About',
        path : '/About',
        component : lazy(()=>import('@/views/About')),
    },
    /** Example purpose only, please remove */
    {
        key: 'singleMenuItem',
        path: '/single-menu-view',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: lazy(() =>
            import('@/views/demo/GroupSingleMenuItemView')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView1')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView2')
        ),
        authority: [],
    },
    {
        key: 'appsProject.dashboard',
        path: `${APP_PREFIX_PATH}/project/dashboard`,
        component: lazy(() => import('@/views/project/ProjectDashboard')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsProject.projectList',
        path: `${APP_PREFIX_PATH}/project/project-list`,
        component: lazy(() => import('@/views/project/ProjectList')),
        authority: [ADMIN, USER],
    },
    
    {
        key: 'appsProject.issue',
        path: `${APP_PREFIX_PATH}/project/issue`,
        component: lazy(() => import('@/views/project/Issue')),
        authority: [ADMIN, USER],
    },
    // {
    //     key: 'appsAccount.invoice',
    //     path: `${APP_PREFIX_PATH}/account/invoice/:id`,
    //     component: lazy(() => import('@/views/account/Invoice')),
    //     authority: [ADMIN, USER],
    // },
    {
        key: 'appsCrm.dashboard',
        path: `${APP_PREFIX_PATH}/crm/dashboard`,
        component: lazy(() => import('@/views/crm/CrmDashboard')),
        authority: [ADMIN, USER],
    },
    // {
    //     key: 'appsCrm.calendar',
    //     path: `${APP_PREFIX_PATH}/crm/calendar`,
    //     component: lazy(() => import('@/views/crm/Calendar')),
    //     authority: [ADMIN, USER],
    // },
    // {
    //     key: 'appsCrm.customers',
    //     path: `${APP_PREFIX_PATH}/crm/customers`,
    //     component: lazy(() => import('@/views/crm/Customers')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         header: 'Customers',
    //     },
    // },
    // {
    //     key: 'appsCrm.customerDetails',
    //     path: `${APP_PREFIX_PATH}/crm/customer-details`,
    //     component: lazy(() => import('@/views/crm/CustomerDetail')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         header: 'Customer Details',
    //         headerContainer: true,
    //     },
    // },
]