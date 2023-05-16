import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AuthProvider } from './contexts/AuthContext'
import CheckRole, { RoleName } from './components/CheckRole'
import { AdminLayout, HomeLayout } from './layouts'
import { Home, Login, Dashboard, UserManage, MovieManage, FoodManage } from './pages'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        children: [{ index: true, element: <Home /> }],
    },
    {
        path: 'admin/*',
        element: (
            <CheckRole roles={[RoleName.SHOW_ADMIN]}>
                <AdminLayout />
            </CheckRole>
        ),
        children: [
            { index: true, element: <Dashboard /> },
            {
                path: 'user',
                element: (
                    <CheckRole roles={[RoleName.MANAGE_USER]}>
                        <UserManage />
                    </CheckRole>
                ),
            },
            {
                path: 'cinema',
                element: (
                    <CheckRole roles={[RoleName.MANAGE_CINEMA]}>
                        <Dashboard />
                    </CheckRole>
                ),
            },
            {
                path: 'food',
                element: (
                    <CheckRole roles={[RoleName.MANAGE_FOOD]}>
                        <FoodManage />
                    </CheckRole>
                ),
            },
            {
                path: 'movie',
                element: (
                    <CheckRole roles={[RoleName.MANAGE_MOVIE]}>
                        <MovieManage />
                    </CheckRole>
                ),
            },
            {
                path: 'showtime',
                element: (
                    <CheckRole roles={[RoleName.MANAGE_SHOWTIME]}>
                        <Dashboard />
                    </CheckRole>
                ),
            },
            {
                path: 'ticket',
                element: (
                    <CheckRole roles={[RoleName.MANAGE_TICKET]}>
                        <Dashboard />
                    </CheckRole>
                ),
            },
            { path: '*', element: <Navigate to="/admin" replace /> },
        ],
    },
    {
        path: 'profile/*',
        element: (
            <CheckRole>
                <HomeLayout />
            </CheckRole>
        ),
        children: [{ path: '*', element: <Navigate to="/profile" replace /> }],
    },
    { path: 'login', element: <Login /> },
    { path: '*', element: <Navigate to="/" replace /> },
])

function App() {
    return (
        <>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
            <ToastContainer />
        </>
    )
}

export default App
