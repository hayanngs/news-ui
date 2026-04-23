// app/admin/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import AdminGuard from "@/components/admin/AdminGuard"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { fetchMyProfile } from "@/lib/admin-api"
import { User } from "@/types"
import {
  IconPencil,
  IconNews,
  IconTag,
  IconUser,
} from "@/components/admin/Icons"

export default function AdminDashboard() {
  const { token, user: authUser, refreshUser } = useAuth()
  const [profile, setProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return
    fetchMyProfile(token)
      .then((p) => {
        setProfile(p)
        refreshUser(p) // sincroniza o contexto
      })
      .catch(() => {
        // Fallback: usa os dados do auth context
        setProfile(authUser)
      })
      .finally(() => setLoading(false))
  }, [token])

  return (
    <AdminGuard>
      <h1 className="admin-page-title">Bem-vindo ao Painel</h1>

      {/* ── Card de perfil do jornalista ── */}
      <div className="admin-profile-hero">
        {loading ? (
          <p style={{ color: "#999" }}>Carregando perfil...</p>
        ) : profile ? (
          <>
            <div className="admin-profile-hero-avatar">
              {profile.photoUrl ? (
                <img src={profile.photoUrl} alt={profile.name} />
              ) : (
                <div className="admin-profile-hero-placeholder">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="admin-profile-hero-info">
              <h2>{profile.name}</h2>
              {profile.position && (
                <span className="admin-profile-position">{profile.position}</span>
              )}
              <p className="admin-profile-email">{profile.email}</p>
              {profile.biography && (
                <p className="admin-profile-bio">{profile.biography}</p>
              )}
              <div className="admin-profile-meta">
                <span className="admin-role-badge">{profile.userRole}</span>
                {profile.createdAt && (
                  <small>
                    Membro desde{" "}
                    {new Date(profile.createdAt).toLocaleDateString("pt-BR", {
                      month: "long",
                      year: "numeric",
                    })}
                  </small>
                )}
              </div>
              <Link
                href="/admin/perfil"
                className="admin-btn admin-btn-primary"
                style={{ marginTop: 16, display: "inline-flex" }}
              >
                <IconPencil size={16} />
                Editar Perfil
              </Link>
            </div>
          </>
        ) : (
          <p>Não foi possível carregar o perfil.</p>
        )}
      </div>

      {/* ── Atalhos rápidos ── */}
      <h2 className="admin-section-title">Acesso Rápido</h2>
      <div className="admin-dashboard-cards">
        <Link href="/admin/noticias/nova" className="admin-dashboard-card">
          <span className="admin-dashboard-icon">
            <IconPencil size={22} />
          </span>
          <strong>Nova Notícia</strong>
          <p>Criar e publicar uma nova matéria</p>
        </Link>
        <Link href="/admin/noticias" className="admin-dashboard-card">
          <span className="admin-dashboard-icon">
            <IconNews size={22} />
          </span>
          <strong>Minhas Notícias</strong>
          <p>Gerenciar notícias publicadas</p>
        </Link>
        <Link href="/admin/tags" className="admin-dashboard-card">
          <span className="admin-dashboard-icon">
            <IconTag size={22} />
          </span>
          <strong>Tags</strong>
          <p>Gerenciar tags de notícias</p>
        </Link>
        <Link href="/admin/perfil" className="admin-dashboard-card">
          <span className="admin-dashboard-icon">
            <IconUser size={22} />
          </span>
          <strong>Meu Perfil</strong>
          <p>Atualizar dados e biografia</p>
        </Link>
      </div>
    </AdminGuard>
  )
}
