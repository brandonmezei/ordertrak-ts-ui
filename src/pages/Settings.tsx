import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";
import { LoaderPinwheel, Mail, Lock, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [CurrentPassword, setCurrentPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const user = data.user;

      setFirstName(user.FirstName || "");
      setLastName(user.LastName || "");
      setEmail(user.Email || "");
    } catch (err) {
      toast.error("Failed to fetch settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          FirstName,
          LastName,
          Email,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMsg = errorData.error || "Profile update failed.";
        throw new Error(errorMsg);
      }

      const data = await res.json();
      localStorage.setItem("auth", JSON.stringify(data.user));

      toast.success("Profile updated successfully.");
    } catch (err) {
      toast.error(`${err}` || "Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = async () => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    if (NewPassword !== ConfirmPassword) {
      toast.error("New passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/users/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          CurrentPassword,
          NewPassword,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMsg = errorData.error || "Password change failed.";
        throw new Error(errorMsg);
      }

      toast.success("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(`${err}` || "Failed to change password.");
    } finally {
      setIsSubmitting(false);
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleProfileUpdate();
            }}
            autoComplete="off"
            className="w-full lg:w-1/2"
          >
            <Card className="shadow-lg">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-center text-2xl">
                  User Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
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
              </CardContent>
              <CardFooter className="flex justify-center border-t border-border">
                <Button
                  className="w-48 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                  disabled={isSubmitting}
                  type="submit"
                >
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </CardFooter>
            </Card>
          </form>

          {/* Password Reset Card */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePasswordChange();
            }}
            autoComplete="off"
            className="w-full lg:w-1/2"
          >
            <Card className="shadow-lg">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-center text-2xl">
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
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
              </CardContent>
              <CardFooter className="flex justify-center border-t border-border">
                <Button
                  className="w-48 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isSubmitting}
                  type="submit"
                >
                  <Save className="h-4 w-4" />
                  Change Password
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      )}
    </div>
  );
};

export default Settings;
