import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material"
import { Link as RouterLink } from "react-router"

function Login() {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 420 }} elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Sign in
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Welcome back! Enter your credentials to continue.
          </Typography>

          <Box component="form" noValidate sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Username"
              name="username"
              id="username"
              type="text"
              autoComplete="username"
              fullWidth
              required
            />
            <TextField
              label="Password"
              name="password"
              id="password"
              type="password"
              autoComplete="current-password"
              fullWidth
              required
            />

            <Link
              component={RouterLink}
              to="/forgot-password"
              variant="body2"
              sx={{ alignSelf: "flex-end" }}
            >
              Forgot password?
            </Link>

            <Button type="submit" variant="contained" size="large" fullWidth>
              Sign in
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" textAlign="center">
            Don&apos;t have an account?{" "}
            <Link component={RouterLink} to="/register">
              Sign up
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Login
