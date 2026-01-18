import { Outlet } from "react-router"

function AuthLayout() {
  return (
    <div className="bg-red-100">
      <h1>This is AuthLayout</h1>
      <Outlet />
    </div>
  )
}

export default AuthLayout