// components/LoadingBoundary.tsx
"use client"

import React from "react"

interface Props {
  fallback: React.ReactNode
  children: React.ReactNode
}

interface State { hasError: boolean }

/**
 * Quando a Promise filha (Server Component async) lança erro,
 * renderizamos o MESMO skeleton que o <Suspense> usa — assim a UI fica
 * visualmente "carregando para sempre" enquanto o backend estiver fora.
 */
export class LoadingBoundary extends React.Component<Props, State> {
  state: State = {hasError: false}

  static getDerivedStateFromError(): State {
    return {hasError: true}
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[LoadingBoundary] fetch falhou, mantendo skeleton:", error)
    }
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

/** Mostra `fallback` enquanto carrega E quando falha. */
export function LoadingSlot({
  fallback,
  children,
}: {
  fallback: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <LoadingBoundary fallback={fallback}>
      <React.Suspense fallback={fallback}>{children}</React.Suspense>
    </LoadingBoundary>
  )
}
