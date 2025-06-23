import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlePageLoad = () => {
    const auth = localStorage.getItem("auth");

    if (auth) {
      const userData = JSON.parse(auth);
      if (userData && userData._id) {
        navigate("/changelog");
      }
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email, Password }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      const userData = data.user;
      localStorage.setItem("auth", JSON.stringify(userData));
      localStorage.setItem("sidebar-collapsed", "false");

      navigate("/changelog");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  useEffect(() => {
    handlePageLoad();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
          <div className="text-center text-muted-foreground mt-2 text-lg font-semibold">
            Welcome to OrderTrak!
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            autoComplete="on"
            className="space-y-4"
          >
            <Input
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <Button type="submit">Log In</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
