import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AuthProvider } from './contexts/AuthContext'
import CheckRole, { RoleName } from './components/CheckRole'
import { AdminLayout, HomeLayout, ProfileLayout } from './layouts'
import {
    Home,
    Login,
    Dashboard,
    UserManage,
    MovieManage,
    FoodManage,
    Movie,
    MovieDetail,
    CinemaManage,
    RoomManage,
    SeatManage,
    ShowtimeManage,
    VnPayReturn,
    TicketManage,
    Cinema,
    Profile,
    Ticket,
    PrintTicket,
    Register,
    ChangePass,
} from './pages'

const router = createBrowserRouter([
    {
        path: '/*',
        element: <HomeLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'movie', element: <Movie /> },
            { path: 'movie/:slug', element: <MovieDetail /> },
            { path: 'cinema', element: <Cinema /> },
            { path: '*', element: <Navigate to="/" replace /> },
        ],
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
                path: 'cinema/*',
                element: (
                    <CheckRole roles={[RoleName.MANAGE_CINEMA]}>
                        <Outlet />
                    </CheckRole>
                ),
                children: [
                    { index: true, element: <CinemaManage /> },
                    { path: ':cinemaId/room', element: <RoomManage /> },
                    { path: 'room/:roomId/seat', element: <SeatManage /> },
                ],
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
                        <ShowtimeManage />
                    </CheckRole>
                ),
            },
            {
                path: 'ticket',
                element: (
                    <CheckRole roles={[RoleName.MANAGE_TICKET]}>
                        <TicketManage />
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
        children: [
            {
                element: <ProfileLayout />,
                children: [
                    { index: true, element: <Profile /> },
                    { path: 'ticket', element: <Ticket /> },
                    { path: 'change-pass', element: <ChangePass /> },
                ],
            },
            { path: 'vnpay_return', element: <VnPayReturn /> },
            { path: '*', element: <Navigate to="/profile" replace /> },
        ],
    },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: 'print-ticket', element: <PrintTicket /> },
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
