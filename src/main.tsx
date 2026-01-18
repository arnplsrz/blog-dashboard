import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import Home from './pages/Home.tsx'
import AuthLayout from './pages/auth/AuthLayout.tsx'
import Login from './pages/auth/Login.tsx'
import Register from './pages/auth/Register.tsx'
import DashboardLayout from './pages/dashboard/DashboardLayout.tsx'
import Dashboard from './pages/dashboard/Dashboard.tsx'
import Settings from './pages/dashboard/Settings.tsx'
import BlogLayout from './pages/blog/BlogLayout.tsx'
import Blog from './pages/blog/Blog.tsx'
import EditBlog from './pages/blog/EditBlog.tsx'
import Error from './pages/404.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />

        <Route element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        <Route path='dashboard'>
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

        <Route path='*' element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
