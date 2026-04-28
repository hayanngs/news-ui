// lib/admin-api.ts

import {
  News,
  Category,
  Tag,
  User,
  LoginResponse,
  NewsFormData,
} from "@/types"
import {NOTICIAS_MOCK} from "@/lib/api-mock";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
const MOCK_ENABLED = process.env.NEXT_PUBLIC_MOCK_ENABLED === 'true'

// -- Helper para requisições autenticadas --

function authHeaders(token: string | null): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 401) {
    throw new Error("UNAUTHORIZED")
  }
  if (!res.ok) {
    const body = await res.text()
    throw new Error(body || `Erro ${res.status}`)
  }
  return res.json()
}

// -- Auth --

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  return handleResponse<LoginResponse>(res)
}

// -- Notícias --

export async function fetchAdminNews(token: string): Promise<News[]> {
  try {
    const res = await fetch(`${API_URL}/api/admin/news`, {
      headers: authHeaders(token),
    })
    return handleResponse<News[]>(res)
  } catch (error) {
    if (MOCK_ENABLED) {
      return NOTICIAS_MOCK.slice(0, 5)
    }
    throw error
  }
}

export async function fetchNewsById(
  token: string,
  id: string
): Promise<News> {
  try {
    const res = await fetch(`${API_URL}/api/admin/news/${id}`, {
      headers: authHeaders(token),
    })
    return handleResponse<News>(res)
  } catch (error) {
    if (MOCK_ENABLED) {
      return NOTICIAS_MOCK.find(it => it.id === id) as News
    }

    throw error
  }
}

export async function createNews(
  token: string,
  data: NewsFormData
): Promise<News> {
  const res = await fetch(`${API_URL}/api/admin/news`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  })
  return handleResponse<News>(res)
}

export async function updateNews(
  token: string,
  id: string,
  data: NewsFormData
): Promise<News> {
  const res = await fetch(`${API_URL}/api/admin/news/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  })
  return handleResponse<News>(res)
}

export async function deleteNews(
  token: string,
  id: string
): Promise<void> {
  const res = await fetch(`${API_URL}/api/admin/news/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  })
  if (!res.ok) throw new Error("Erro ao deletar notícia")
}

// -- Categorias --

export async function fetchCategories(token: string): Promise<Category[]> {
  const res = await fetch(`${API_URL}/api/admin/categories`, {
    headers: authHeaders(token),
  })
  return handleResponse<Category[]>(res)
}

// -- Tags --

export async function fetchTags(token: string): Promise<Tag[]> {
  const res = await fetch(`${API_URL}/api/admin/tags`, {
    headers: authHeaders(token),
  })
  return handleResponse<Tag[]>(res)
}

export async function createTag(
  token: string,
  data: { name: string; slug: string }
): Promise<Tag> {
  const res = await fetch(`${API_URL}/api/admin/tags`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  })
  return handleResponse<Tag>(res)
}

export async function deleteTag(
  token: string,
  id: string
): Promise<void> {
  const res = await fetch(`${API_URL}/api/admin/tags/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  })
  if (!res.ok) throw new Error("Erro ao deletar tag")
}

// -- Perfil do jornalista (usuário logado) --

export async function fetchMyProfile(token: string): Promise<User> {
  const res = await fetch(`${API_URL}/api/admin/user`, {
    headers: authHeaders(token),
  })
  return handleResponse<User>(res)
}

export async function updateMyProfile(
  token: string,
  data: {
    name?: string
    email?: string
    biography?: string
    position?: string
    photoUrl?: string
  }
): Promise<User> {
  const res = await fetch(`${API_URL}/api/admin/user`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  })
  return handleResponse<User>(res)
}

export async function changeMyPassword(
  token: string,
  data: { currentPassword: string; newPassword: string }
): Promise<void> {
  const res = await fetch(`${API_URL}/api/admin/user/password`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(body || "Erro ao alterar senha")
  }
}

// -- Upload de imagem para S3 --

export async function uploadImage(
  token: string,
  file: File
): Promise<{ key: string }> {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch(`${API_URL}/api/admin/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  return handleResponse<{ key: string }>(res)
}
