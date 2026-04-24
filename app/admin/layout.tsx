// app/admin/layout.tsx
import React from "react"
import {AuthProvider} from "@/lib/auth-context"
import type {Metadata} from "next"

export const metadata: Metadata = {
  title: "Admin",
  robots: "noindex, nofollow",
}

export default function AdminRootLayout({
                                          children,
                                        }: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}
