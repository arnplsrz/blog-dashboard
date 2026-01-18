import { NavLink, Outlet } from "react-router";

function DashboardLayout() {
  return (
    <main>
      <h1>This is dashboard layout</h1>
      <nav>
        <NavLink to='/dashboard' end>Dashboard</NavLink>
        <NavLink to='/dashboard/settings'>Settings</NavLink>
      </nav>
      <Outlet />
    </main>
  )
}

export default DashboardLayout