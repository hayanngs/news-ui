// components/admin/AdminGuard.tsx
"use client"

import React from "react"
import {useAuth} from "@/lib/auth-context"
import LoginForm from "@/components/admin/LoginForm"
import AdminShell from "@/components/admin/AdminShell"

export default function AdminGuard({ children, }: { children: React.ReactNode }) {
  const {token, isLoading} = useAuth()

  if (isLoading) {
    return (
      <div className="login-wrapper">
        <p style={{color: "#666"}}>Carregando...</p>
      </div>
    )
  }

  if (!token) {
    return <LoginForm/>
  }

  return <AdminShell>{children}</AdminShell>
}
