import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogIn, UserPlus, Mail, Lock } from "lucide-react";

import { API_BASE_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email, Password }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      localStorage.setItem("auth", JSON.stringify(data.user));
      localStorage.setItem("sidebar-collapsed", "false");
      localStorage.setItem("management-open", "false");

      navigate("/changelog");
    } catch (err) {
      toast.error("Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="w-full max-w-sm"
        autoComplete="on"
      >
        <Card className="shadow-lg">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-center text-2xl">Login</CardTitle>
            <div className="text-center text-muted-foreground mt-2 text-lg font-semibold">
              Welcome to OrderTrak!
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                <Mail className="h-4 w-4" />
              </span>
              <Input
                type="email"
                placeholder="Email"
                autoComplete="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                <Lock className="h-4 w-4" />
              </span>
              <Input
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>

          <CardFooter className="grid grid-cols-2 gap-2 border-t border-border">
            <Button
              type="submit"
              className="flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              <LogIn className="h-4 w-4" />
              Log In
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/register")}
              className="flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              <UserPlus className="h-4 w-4" />
              Register
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Login;