import { FileClock, Settings, Menu, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { API_BASE_URL } from "@/lib/api";
import { toast } from "sonner";

const navItems = [
  { name: "Change Log", path: "/changelog", icon: FileClock },
  { name: "Settings", path: "/settings", icon: Settings },
];

export const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedInName, setLoggedInName] = useState("");

  const handlePageLoad = async () => {
    const auth = localStorage.getItem("auth");

    if (!auth) {
      return;
    }

    const { FirstName, LastName } = JSON.parse(auth);
    setLoggedInName(`${FirstName} ${LastName}`);
  };

  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved === "true";
  });

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sidebar-collapsed", String(next));
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Login failed");

      localStorage.removeItem("auth");
      localStorage.removeItem("sidebar-collapsed");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    handlePageLoad();
  }, []);

  return (
    <aside
      className={cn(
        "flex flex-col h-screen transition-all duration-200 ease-in-out border-r",
        collapsed ? "w-16" : "w-64",
        "bg-background text-foreground border-border"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        {!collapsed && <span className="text-lg font-semibold">OrderTrak</span>}
        <button className="p-1 hover:bg-muted rounded" onClick={toggleCollapse}>
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-2 text-sm rounded-md transition-colors",
                "hover:bg-muted",
                isActive && "bg-muted font-semibold"
              )}
            >
              <item.icon className="h-4 w-4" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-4 py-4 space-y-2">
        {!collapsed && loggedInName && (
          <div className="text-sm text-muted-foreground truncate">
            Logged in as <span className="font-medium">{loggedInName}.</span>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center justify-center gap-2 text-sm font-medium rounded-md",
            "bg-destructive text-primary-foreground hover:bg-destructive/90",
            "px-3 py-2 transition-colors"
          )}
          title="Log Out"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
};
