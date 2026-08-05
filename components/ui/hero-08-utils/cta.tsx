import React from "react"
import { Button } from "@/components/ui/button"

export interface CtaProps {
  ctaEnabled?: boolean
  text: string
  link: string
  size?: "default" | "sm" | "lg"
}

export function Cta({ cta, invert }: { cta: CtaProps; invert?: boolean }) {
  return (
    <Button
      variant={invert ? "secondary" : "default"}
      size={cta.size ?? "default"}
      className="rounded-none font-mono text-[10px] tracking-widest uppercase transition-all duration-300 border border-zinc-800 hover:bg-[#3ca2fa] hover:text-white hover:border-[#3ca2fa]"
      asChild
    >
      <a href={cta.link || "#"}>{cta.text}</a>
    </Button>
  )
}
