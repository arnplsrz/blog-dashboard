import { Outlet } from "react-router"
import { Toaster } from "sonner"

function AuthLayout() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  )
}

export default AuthLayout