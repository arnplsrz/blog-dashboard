import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { z } from "zod"
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner"
import { Link, useNavigate } from "react-router"
import { useAuth } from "@/lib/auth-context"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type RegisterInput = z.infer<typeof registerSchema>;

const API_URL = import.meta.env.VITE_API_URL;
const IS_DEV = import.meta.env.DEV;

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: IS_DEV ? "Juan Dela Cruz" : "",
      email: IS_DEV ? "juandelacruz@example.com" : "",
      password: IS_DEV ? "12345678" : "",
      confirmPassword: IS_DEV ? "12345678" : "",
    }
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (data: RegisterInput) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password
        }),
        signal: AbortSignal.timeout(5000)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      reset();

      // ponytail: register returns a token signed as { userId }, but the API's
      // passport strategy only reads `sub` — so that token 401s on every
      // protected route. Log in again to get a usable one. Drop this second
      // request once blog-api signs register tokens the same way login does.
      const loginResponse = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
        signal: AbortSignal.timeout(5000)
      });

      if (!loginResponse.ok) {
        // The account exists — don't report this as a registration failure.
        toast("Account created successfully. Please sign in.");
        navigate("/login");
        return;
      }

      const { token, user } = await loginResponse.json();

      toast("Account created successfully");
      login(token, user);
      navigate("/");
    } catch (error: any) {
      if (error.name === 'TimeoutError') {
        toast.error("Please check your network connection")
      } else {
        toast(error instanceof Error ? error.message : "Failed to register")
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">
                Name <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name")}
                aria-invalid={!!errors.name}
                disabled={isLoading}
                required
              />
              {errors.name && (
                <FieldDescription>
                  {errors.name.message}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">
                Email <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
                aria-invalid={!!errors.email}
                disabled={isLoading}
                required
              />
              {errors.email && (
                <FieldDescription>
                  {errors.email.message}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">
                Password <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="password"
                type="password"
                {...register("password")}
                aria-invalid={!!errors.password}
                disabled={isLoading}
                required
              />
              {errors.password && (
                <FieldDescription>
                  {errors.password.message}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                {...register("confirmPassword")}
                aria-invalid={!!errors.confirmPassword}
                disabled={isLoading}
                required
              />
              {errors.confirmPassword && (
                <FieldDescription>
                  {errors.confirmPassword.message}
                </FieldDescription>
              )}
            </Field>
            <FieldGroup>
              <Field>
                <Button
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering" : "Create Account"}
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link to="/login" aria-disabled={isLoading}>Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
