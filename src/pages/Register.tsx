import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UserPlus, LogIn, Mail, Lock, User } from "lucide-react";

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

const Register = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ FirstName, LastName, Email, Password }),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMsg = errorData.error || "Registration failed";
        throw new Error(errorMsg);
      }

      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(`${err}` || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        className="w-full max-w-md"
        autoComplete="off"
      >
        <Card className="shadow-lg">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-center text-2xl">Registration</CardTitle>
            <div className="text-center text-muted-foreground mt-2 text-lg font-semibold">
              Welcome to OrderTrak!
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                <User className="h-4 w-4" />
              </span>
              <Input
                type="text"
                placeholder="First Name"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                <User className="h-4 w-4" />
              </span>
              <Input
                type="text"
                placeholder="Last Name"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
                className="pl-10"
              />
            </div>

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
                autoComplete="new-password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
              />
            </div>

            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-2">
              <li>At least 8 characters long</li>
              <li>Contains at least one lowercase letter (a-z)</li>
              <li>Contains at least one uppercase letter (A-Z)</li>
              <li>Contains at least one number (0-9)</li>
            </ul>
          </CardContent>

          <CardFooter className="grid grid-cols-2 gap-2 border-t border-border">
            <Button
              type="submit"
              className="flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              <UserPlus className="h-4 w-4" />
              Register
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              <LogIn className="h-4 w-4" />
              Log In
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Register;