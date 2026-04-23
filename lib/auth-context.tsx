// lib/auth-context.tsx
"use client"

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react"
import { User } from "@/types"
import { login as apiLogin } from "@/lib/admin-api"

// ══════════════════════════════════════════════
// MOCK DE AUTENTICAÇÃO — remova quando o backend estiver pronto
// Para logar use:
//   email: admin@diariogoiano.com.br
//   senha: qualquer coisa
// ══════════════════════════════════════════════
const isMockEnabled = process.env.MOCK_ENABLED === 'true'

const MOCK_USER: User = {
  id: "1",
  name: "Maria Silva",
  email: "admin@diariogoiano.com.br",
  userRole: "JORNALISTA",
  active: true,
  photoUrl: "https://i.pravatar.cc/150?u=maria",
  biography: "Jornalista com 10 anos de experiência em cobertura política e econômica no estado de Goiás. Apaixonada por reportagens investigativas.",
  position: "Repórter Especial",
  createdAt: "2024-03-15T10:00:00Z",
}

// JWT falso com expiração em 24h a partir de agora
function gerarTokenFake(): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
  const payload = btoa(
    JSON.stringify({
      sub: "1",
      name: "Admin Dev",
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h
    })
  )
  const signature = "assinatura-falsa"
  return `${header}.${payload}.${signature}`
}

async function loginMock(email: string, password: string) {
  // Simula delay de rede
  await new Promise((r) => setTimeout(r, 600))

  // Aceita qualquer senha para facilitar testes
  if (!email.includes("@")) {
    throw new Error("Email inválido")
  }

  return {
    token: gerarTokenFake(),
    user: { ...MOCK_USER, email },
  }
}
// ══════════════════════════════════════════════

interface AuthState {
  token: string | null
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  refreshUser: (updatedUser: User) => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Hidratar estado do localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token")
    const savedUser = localStorage.getItem("admin_user")
    if (savedToken && !isTokenExpired(savedToken) && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    } else {
      localStorage.removeItem("admin_token")
      localStorage.removeItem("admin_user")
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const response = isMockEnabled
      ? await loginMock(email, password)
      : await apiLogin(email, password)

    setToken(response.token)
    setUser(response.user)
    localStorage.setItem("admin_token", response.token)
    localStorage.setItem("admin_user", JSON.stringify(response.user))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_user")
  }, [])

  const refreshUser = useCallback((updatedUser: User) => {
    setUser(updatedUser)
    localStorage.setItem("admin_user", JSON.stringify(updatedUser))
  }, [])

  return (
    <AuthContext.Provider value={{ token, user, isLoading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider")
  return ctx
}
