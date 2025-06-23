import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ChangeLog from "./pages/ChangeLog"
import Layout from "@/components/layout"
import { ThemeProvider } from "@/components/theme-provider"
import { ProtectedRoute } from "@/components/ProtectedRoute"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/changelog" element={<ChangeLog />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App