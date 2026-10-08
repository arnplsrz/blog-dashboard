import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import { AuthProvider } from './components/auth-provider.tsx'
import Home from './pages/Home.tsx'
import AuthLayout from './pages/auth/AuthLayout.tsx'
const Login = lazy(() => import('./pages/auth/Login.tsx'))
const Register = lazy(() => import('./pages/auth/Register.tsx'))
const Post = lazy(() => import('./pages/Post.tsx'))
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

          <Route path='posts/:postId' element={<Post />} />

          <Route path='*' element={<Error />}></Route>
        </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
