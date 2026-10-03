import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import { AuthProvider, ProtectedRoute } from './components/auth-provider.tsx'
import Home from './pages/Home.tsx'
import AuthLayout from './pages/auth/AuthLayout.tsx'
const Login = lazy(() => import('./pages/auth/Login.tsx'))
const Register = lazy(() => import('./pages/auth/Register.tsx'))
const DashboardLayout = lazy(() => import('./pages/dashboard/DashboardLayout.tsx'))
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard.tsx'))
const Settings = lazy(() => import('./pages/dashboard/Settings.tsx'))
const BlogLayout = lazy(() => import('./pages/blog/BlogLayout.tsx'))
const Blog = lazy(() => import('./pages/blog/Blog.tsx'))
const EditBlog = lazy(() => import('./pages/blog/EditBlog.tsx'))
import Error from './pages/404.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={null}>
        <Routes>
          <Route index element={<Home />} />

          <Route element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>

          <Route path='dashboard'>
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path='settings' element={<Settings />} />

                <Route path='blogs'>
                  <Route element={<BlogLayout />}>
                    <Route path=':blogId' element={<Blog />} />
                    <Route path=':blogId/edit' element={<EditBlog />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>

          <Route path='*' element={<Error />}></Route>
        </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
