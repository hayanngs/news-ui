// components/admin/AdminShell.tsx
"use client"

import React, {useState} from "react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {useAuth} from "@/lib/auth-context"
import {
  IconHome,
  IconNews,
  IconTag,
  IconUser,
  IconMenu,
  IconLogout,
} from "@/components/admin/Icons"

const NAV_ITEMS = [
  { href: "/admin", label: "Início", Icon: IconHome },
  { href: "/admin/noticias", label: "Notícias", Icon: IconNews },
  { href: "/admin/tags", label: "Tags", Icon: IconTag },
  { href: "/admin/perfil", label: "Meu Perfil", Icon: IconUser },
]

export default function AdminShell({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  const {user, logout} = useAuth()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="admin-layout">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="admin-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-header">
          <h2>Diário Goiano</h2>
          <span>Painel do Usuário</span>
        </div>

        <nav className="admin-nav">
          {NAV_ITEMS.map(({ href, label, Icon }) => {
            const isActive =
              href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`admin-nav-link ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="admin-nav-icon">
                  <Icon size={18} />
                </span>
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            {user?.photoUrl ? (
              <img
                src={user.photoUrl}
                alt={user.name}
                className="admin-sidebar-avatar"
              />
            ) : (
              <div className="admin-sidebar-avatar admin-sidebar-avatar-fallback">
                {user?.name?.charAt(0).toUpperCase() ?? "?"}
              </div>
            )}
            <div>
              <strong>{user?.name}</strong>
              <small>{user?.position || user?.userRole}</small>
            </div>
          </div>
          <button onClick={logout} className="admin-btn-logout">
            <IconLogout size={16} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Abrir menu"
          >
            <IconMenu size={20} />
          </button>
          <div className="admin-topbar-right">
            <span>Olá, {user?.name}</span>
          </div>
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  )
}
