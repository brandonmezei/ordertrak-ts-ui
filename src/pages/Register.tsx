import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { API_BASE_URL } from "@/lib/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ FirstName, LastName, Email, Password }),
        credentials: "include"
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMsg = errorData.error || "Registration failed";
        throw new Error(errorMsg);
      }

      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Registration</CardTitle>
          <div className="text-center text-muted-foreground mt-2 text-lg font-semibold">
            Welcome to OrderTrak!
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
            autoComplete="off"
            className="space-y-4"
          >
            <Input
              type="text"
              placeholder="First Name"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <Button type="submit">Register</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
              >
                Log In
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
