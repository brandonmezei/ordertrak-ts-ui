import { AppSidebar } from "@/components/AppSidebar"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 overflow-auto bg-muted p-6">
        <Outlet />
      </main>
    </div>
  )
}