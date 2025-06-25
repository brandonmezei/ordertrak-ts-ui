import {
  FileClock,
  Settings,
  Menu,
  LogOut,
  Users,
  BadgePlus,
  Shield,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { API_BASE_URL } from "@/lib/api";
import { toast } from "sonner";

export const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedInName, setLoggedInName] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handlePageLoad = async () => {
    const auth = localStorage.getItem("auth");

    if (!auth) return;

    const { FirstName, LastName } = JSON.parse(auth);
    setLoggedInName(`${FirstName} ${LastName}`);
  };

  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved === "true";
  });

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved === "true";
  });

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sidebar-collapsed", String(next));
  };

  const toggleMobileCollapse = () => {
    const next = !mobileSidebarOpen;
    setMobileSidebarOpen(next);
    setCollapsed(false);
    localStorage.setItem("sidebar-collapsed", String(next));
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    try {
      const res = await fetch(`${API_BASE_URL}/users/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Logout failed");

      localStorage.removeItem("auth");
      localStorage.removeItem("sidebar-collapsed");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  useEffect(() => {
    handlePageLoad();
  }, []);

  const sidebarContent = (
    <>
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          {!collapsed && (
            <span className="text-lg font-semibold">OrderTrak</span>
          )}
          <button
            className="p-1 hover:bg-muted rounded hidden md:inline-flex"
            onClick={toggleCollapse}
          >
            <Menu className="h-5 w-5" />
          </button>
          <button
            className="p-1 hover:bg-muted rounded md:hidden"
            onClick={toggleMobileCollapse}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex flex-col gap-1">
          <Link
            to="/changelog"
            className={cn(
              "flex items-center gap-3 px-4 py-2 text-sm rounded-md transition-colors",
              "hover:bg-muted",
              location.pathname === "/changelog" && "bg-muted font-semibold"
            )}
          >
            <FileClock className="h-4 w-4" />
            {!collapsed && <span>Change Log</span>}
          </Link>
          <div className="border-t border-border mt-4" />
          <div className="mt-4">
            {!collapsed && (
              <div className="px-4 text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                Management
              </div>
            )}
            <div className="flex flex-col gap-1">
              <Link
                to="/customer"
                className={cn(
                  "flex items-center gap-3 px-4 py-2 text-sm rounded-md transition-colors",
                  "hover:bg-muted",
                  location.pathname === "/customer" && "bg-muted font-semibold"
                )}
              >
                <BadgePlus className="h-4 w-4" />
                {!collapsed && <span>Customer</span>}
              </Link>
              <Link
                to="/role"
                className={cn(
                  "flex items-center gap-3 px-4 py-2 text-sm rounded-md transition-colors",
                  "hover:bg-muted",
                  location.pathname === "/role" && "bg-muted font-semibold"
                )}
              >
                <Shield className="h-4 w-4" />
                {!collapsed && <span>Role</span>}
              </Link>
              <Link
                to="/user"
                className={cn(
                  "flex items-center gap-3 px-4 py-2 text-sm rounded-md transition-colors",
                  "hover:bg-muted",
                  location.pathname === "/user" && "bg-muted font-semibold"
                )}
              >
                <Users className="h-4 w-4" />
                {!collapsed && <span>User</span>}
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <div className="mt-auto px-4 py-4 space-y-2">
        {!collapsed && loggedInName && (
          <div className="text-sm text-muted-foreground truncate">
            Logged in as <span className="font-medium">{loggedInName}</span>
          </div>
        )}

        <Link
          to="/settings"
          className={cn(
            "w-full flex items-center justify-center gap-2 text-sm font-medium rounded-md",
            "bg-muted text-foreground hover:bg-muted/70",
            "px-3 py-2 transition-colors"
          )}
          title="User Settings"
        >
          <Settings className="h-4 w-4" />
          {!collapsed && <span>Settings</span>}
        </Link>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
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
    </>
  );

  return (
    <>
      <button
        onClick={toggleMobileCollapse}
        className="md:hidden p-2 m-2 rounded hover:bg-muted"
        aria-label="Open sidebar"
      >
        <Menu />
      </button>

      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleMobileCollapse}
          />
          <aside className="fixed left-0 top-0 z-50 w-64 h-full bg-background border-r border-border flex flex-col md:hidden">
            {sidebarContent}
          </aside>
        </>
      )}

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col h-screen overflow-hidden transition-all duration-200 ease-in-out border-r",
          collapsed ? "w-16" : "w-64",
          "bg-background text-foreground border-border"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
};
