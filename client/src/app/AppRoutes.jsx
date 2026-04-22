import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import ProtectedRoute from '../components/common/ProtectedRoute'
import AdminRoute from '../components/common/AdminRoute'

import Home from '../pages/Home'
import Books from '../pages/Books'
import BookDetails from '../pages/BookDetails'
import AddBook from '../pages/AddBook'
import EditBook from '../pages/EditBook'
import MyBorrowedBooks from '../pages/MyBorrowedBooks'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Profile from '../pages/Profile'
import Notifications from '../pages/Notifications'
import AdminBooks from '../pages/AdminBooks'
import NotFound from '../pages/NotFound'
import AdminDashboard from '../pages/AdminDashboard'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="books" element={<Books />} />
                    <Route path="books/:id" element={<BookDetails />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    <Route
                        path="my-borrowed-books"
                        element={
                            <ProtectedRoute>
                                <MyBorrowedBooks />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="profile"
                        element={
                            <ProtectedRoute>
                                <DashboardLayout>
                                    <Profile />
                                </DashboardLayout>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="notifications"
                        element={
                            <ProtectedRoute>
                                <DashboardLayout>
                                    <Notifications />
                                </DashboardLayout>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="add-book"
                        element={
                            <AdminRoute>
                                <DashboardLayout>
                                    <AddBook />
                                </DashboardLayout>
                            </AdminRoute>
                        }
                    />

                    <Route
                        path="edit-book/:id"
                        element={
                            <AdminRoute>
                                <DashboardLayout>
                                    <EditBook />
                                </DashboardLayout>
                            </AdminRoute>
                        }
                    />

                    <Route
                        path="admin-books"
                        element={
                            <AdminRoute>
                                <DashboardLayout>
                                    <AdminBooks />
                                </DashboardLayout>
                            </AdminRoute>
                        }
                    />

                    <Route
                        path="admin-dashboard"
                        element={
                            <AdminRoute>
                                <AdminDashboard />
                            </AdminRoute>
                        }
                    />

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}