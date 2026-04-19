// components/admin/LoginForm.tsx
"use client"

import React, {useState} from "react"
import {useAuth} from "@/lib/auth-context"

export default function LoginForm() {
  const {login} = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await login(email, password)
    } catch {
      setError("Email ou senha inválidos.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-header">
          <h1>Diário Goiano</h1>
          <p>Acesso ao Painel Administrativo</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <div className="login-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@diariogoiano.com.br"
            required
          />
        </div>

        <div className="login-field">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="login-btn"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  )
}
