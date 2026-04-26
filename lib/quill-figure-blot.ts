// lib/quill-figure-blot.ts
import Quill from "quill"

const BlockEmbed = Quill.import("blots/block/embed") as any

export class FigureBlot extends BlockEmbed {
  static blotName = "figure"
  static tagName = "figure"

  static create(value: { url: string; caption: string }) {
    const node = super.create() as HTMLElement

    const img = document.createElement("img")
    img.setAttribute("src", value.url)
    img.setAttribute("alt", value.caption || "")

    const figcaption = document.createElement("figcaption")
    figcaption.textContent = value.caption || ""

    node.appendChild(img)
    node.appendChild(figcaption)
    return node
  }

  static value(node: HTMLElement) {
    return {
      url: node.querySelector("img")?.getAttribute("src") || "",
      caption: node.querySelector("figcaption")?.textContent || "",
    }
  }
}
