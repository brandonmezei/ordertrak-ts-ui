import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { API_BASE_URL } from "@/lib/api"

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [valid, setValid] = useState(false)

  useEffect(() => {
    const validate = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/users/validate`, {
          method: "GET",
          credentials: "include",
        })

        setValid(res.ok)
      } catch {
        setValid(false)
      } finally {
        setLoading(false)
      }
    }

    validate()
  }, [])

  if (loading) return null // or a spinner
  return valid ? children : <Navigate to="/" />
}