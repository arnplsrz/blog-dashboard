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

const VITE_API_URL = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.DEV;

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: isDev ? "Juan Dela Cruz" : "",
      email: isDev ? "juandelacruz@example.com" : "",
      password: isDev ? "12345678" : "",
      confirmPassword: isDev ? "12345678" : "",
    }
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    console.log("Data", data);
    
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ 
          name: data.name,
          email: data.email,
          password: data.password
        }),
        credentials: "include",
      });

      console.log("Response:", response);
      

      if (!response.ok) {
        const errorData = await response.json();
        console.log("errorData", errorData)
        throw new Error(errorData.error);
      }

      toast("Account created successfully");
      reset();
    } catch (error: any) {
      console.log("error", error)
      toast(error instanceof Error ? error.message : "Failed to register")
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
                  Already have an account? <a href="/login" aria-disabled={isLoading}>Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
