import { Box } from "@mui/material"
import { Outlet } from "react-router"

function AuthLayout() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "grey.100",
      }}
    >
      <Outlet />
    </Box>
  )
}

export default AuthLayout