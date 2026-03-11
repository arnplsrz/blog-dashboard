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

function Register() {
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
            Create an account
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Fill in the details below to get started.
          </Typography>

          <Box component="form" noValidate sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Full Name"
              name="fullName"
              id="fullName"
              type="text"
              autoComplete="name"
              fullWidth
              required
            />
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
              label="Email"
              name="email"
              id="email"
              type="email"
              autoComplete="email"
              fullWidth
              required
            />
            <TextField
              label="Password"
              name="password"
              id="password"
              type="password"
              autoComplete="new-password"
              fullWidth
              required
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              fullWidth
              required
            />

            <Button type="submit" variant="contained" size="large" fullWidth>
              Create account
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" textAlign="center">
            Already have an account?{" "}
            <Link component={RouterLink} to="/login">
              Sign in
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Register
