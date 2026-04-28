// components/PillList.tsx
import Link from "next/link"

interface PillItem {
  id: number | string
  name: string
  slug: string
}

interface PillListProps {
  titulo: string
  items: PillItem[] | PillItem
  buildHref: (item: PillItem) => string
}

export function PillList({titulo, items, buildHref}: PillListProps) {
  const list = Array.isArray(items) ? items : [items]

  if (!list?.length) return null

  return (
    <div className="pill-noticia">
      <p className="pill-noticia__titulo">{titulo}</p>
      <div className="pill-noticia__lista">
        {list.map(item => (
          <Link key={item.id} href={buildHref(item)} className="pill-link">
            {item.name.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  )
}
