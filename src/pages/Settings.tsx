import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";
import { LoaderPinwheel, Mail, Lock, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [CurrentPassword, setCurrentPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const handlePageLoad = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch settings.");

      const data = await res.json();
      setFirstName(data.FirstName || "");
      setLastName(data.LastName || "");
      setEmail(data.Email || "");
    } catch (err) {
      toast.error("Failed to fetch settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePageLoad();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <p className="mb-4 text-muted-foreground">
        Manage user profile and change password.
      </p>

      {loading ? (
        <div className="flex justify-center items-center">
          <LoaderPinwheel className="h-32 w-32 animate-spin text-primary" />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Profile Info Card */}
          <Card className="w-full lg:w-1/2 shadow-lg">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-center text-2xl">
                User Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <form
                onSubmit={(e) => e.preventDefault()}
                autoComplete="off"
                className="space-y-4"
              >
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
                    type="text"
                    placeholder="Email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Password Reset Card */}
          <Card className="w-full lg:w-1/2 shadow-lg">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-center text-2xl">
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <form
                onSubmit={(e) => e.preventDefault()}
                autoComplete="off"
                className="space-y-4"
              >
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    <Lock className="h-4 w-4" />
                  </span>
                  <Input
                    type="password"
                    placeholder="Current Password"
                    value={CurrentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    <Lock className="h-4 w-4" />
                  </span>
                  <Input
                    type="password"
                    placeholder="New Password"
                    value={NewPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    <Lock className="h-4 w-4" />
                  </span>
                  <Input
                    type="password"
                    placeholder="Confirm New Password"
                    value={ConfirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-2">
                  <li>At least 8 characters long</li>
                  <li>Contains at least one lowercase letter (a-z)</li>
                  <li>Contains at least one uppercase letter (A-Z)</li>
                  <li>Contains at least one number (0-9)</li>
                </ul>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Settings;
