import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import config from "@/config";
import { cn } from "@/lib/utils";
// import { useLoginMutation, useUserInfoQuery } from "@/redux/api/auth.api";
// import { setCredentials } from "@/redux/features/Authencation/authenticationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useLoginMutation, useUserInfoQuery } from "@/redux/api/authApi";
import { setCredentials } from "@/redux/features/Authentication/authenticationSlice";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setIsLoading] = useState(false);

  const [login] = useLoginMutation();
  const { token } = useAppSelector((state) => state.auth);
  console.log("userInfo token", token);
  const { data: userInfo } = useUserInfoQuery(undefined, {
    skip: !token,
  });
  console.log("userInfo login", userInfo);
  useEffect(() => {
    if (userInfo?.data?.role) {
      if (userInfo.data.role === "ADMIN") navigate("/admin");
      else if (userInfo.data.role === "AGENT") navigate("/agent");
      else if (userInfo.data.role === "USER") navigate("/user/userHome");
    }
  }, [userInfo, navigate]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      console.log(data);
      const res = await login(data).unwrap();
      console.log("login form", res);
      if (res.success) {
        toast.success(`Successful login...`);
        const cleanToken = res.data.accessToken.trim();
        dispatch(setCredentials({ token: cleanToken, user: res.data.user }));
        setIsLoading(false);
      } else {
        toast.error(`${res.message}`);
        setIsLoading(false);
      }

      // Ensure token is properly formatted before storing
    } catch (err: unknown) {
      setIsLoading(false);

      console.error(err);
      if (err && typeof err === "object" && "data" in err) {
        const errorObj = err as { data?: { message?: string } };

        if (errorObj.data?.message === "Password does not match") {
          toast.error("Invalid credentials");
        }
      }
    }
  };
  // 👇 Helper to quickly fill login details
  const fillCredentials = (role: "admin" | "agent" | "user") => {
    switch (role) {
      case "admin":
        form.setValue("email", "admin1@gmail.com");
        form.setValue("password", "123456");
        break;
      case "agent":
        form.setValue("email", "agent1@gmail.com");
        form.setValue("password", "123456");
        break;
      case "user":
        form.setValue("email", "user1@gmail.com");
        form.setValue("password", "123456");
        break;
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account </h1>
        {/* Quick login buttons */}
        <div className="flex justify-between gap-4">
          <Button
            type="button"
            className="w-1/3"
            onClick={() => fillCredentials("admin")}
          >
            Admin
          </Button>
          <Button
            type="button"
            className="w-1/3"
            onClick={() => fillCredentials("agent")}
          >
            Agent
          </Button>
          <Button
            type="button"
            className="w-1/3"
            onClick={() => fillCredentials("user")}
          >
            User
          </Button>
        </div>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@example.com"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} type="submit" className="w-full">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Login...
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        {/*//* http://localhost:5000/api/v1/auth/google */}
        <Button
          onClick={() => window.open(`${config.baseUrl}/auth/google`)}
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
        >
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}
