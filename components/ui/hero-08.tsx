'use client'

import * as React from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import Balancer from 'react-wrap-balancer'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

import { Cta, type CtaProps } from '@/components/ui/hero-08-utils/cta'

export interface Hero08Avatar {
  src: string
  fallback: string
}

export interface Hero08Card {
  title: string
  subtitle: string
  image: string
  imageAlt?: string
  invert?: boolean
  cta: CtaProps
}

export interface Hero08Props {
  title: string
  description: string
  socialProof?: string
  avatars?: Hero08Avatar[]
  cards: Hero08Card[]
  animation?: 'none' | 'subtle'
  variant?: 'standard' | 'compact'
}

const variantStyles = {
  standard: {
    section: 'py-20 sm:py-28',
    title: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
    description: 'text-sm sm:text-base',
    header: 'gap-10 lg:gap-16',
    content: 'gap-12 sm:gap-16',
    grid: 'gap-5 sm:gap-6',
    card: 'aspect-16/10',
    cardTitle: 'text-2xl sm:text-3xl',
    cardBody: 'p-6 sm:p-8',
  },
  compact: {
    section: 'py-14 sm:py-20',
    title: 'text-2xl sm:text-3xl md:text-4xl',
    description: 'text-sm',
    header: 'gap-8 lg:gap-12',
    content: 'gap-10 sm:gap-12',
    grid: 'gap-4 sm:gap-5',
    card: 'aspect-16/11',
    cardTitle: 'text-xl sm:text-2xl',
    cardBody: 'p-5 sm:p-6',
  },
} as const

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const mediaItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

function Reveal({
  active,
  variants,
  className,
  children,
}: Readonly<{
  active: boolean
  variants?: Variants
  className?: string
  children: React.ReactNode
}>) {
  if (!active) return <div className={className}>{children}</div>

  return (
    <motion.div variants={variants ?? item} className={className}>
      {children}
    </motion.div>
  )
}

function FeatureCard({
  card,
  vs,
}: Readonly<{ card: Hero08Card; vs: (typeof variantStyles)[keyof typeof variantStyles] }>) {
  const titleClass = card.invert ? 'text-white' : 'text-foreground font-sans'
  const subtitleClass = card.invert ? 'text-white/80' : 'text-muted-foreground'

  return (
    <div
      className={cn(
        'relative isolate w-full overflow-hidden rounded-none border border-zinc-900',
        vs.card,
      )}
    >
      {card.image && (
        <img
          src={card.image}
          alt={card.imageAlt ?? ''}
          decoding="async"
          className="absolute inset-0 -z-10 size-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700 ease-in-out"
        />
      )}

      {card.invert && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-br from-black/60 via-black/35 to-black/10"
        />
      )}

      <div className={cn('flex h-full flex-col items-start justify-end bg-black/40', vs.cardBody)}>
        <h3 className={cn('font-bold tracking-tight font-sans', vs.cardTitle, titleClass)}>
          <Balancer>{card.title}</Balancer>
        </h3>
        <p className={cn('mt-2 text-xs font-mono tracking-wide uppercase', subtitleClass)}>{card.subtitle}</p>
        {card.cta?.ctaEnabled && (
          <div className="mt-4">
            <Cta cta={card.cta} invert={card.invert} />
          </div>
        )}
      </div>
    </div>
  )
}

export function Hero08({
  title,
  description,
  socialProof,
  avatars,
  cards,
  animation = 'none',
  variant = 'standard',
}: Readonly<Hero08Props>) {
  const reduce = useReducedMotion()
  const animate = animation === 'subtle' && !reduce
  const vs = variantStyles[variant]

  const titleElement = title && (
    <h1
      className={cn(
        'text-white font-bold tracking-tight text-balance font-sans',
        vs.title,
      )}
    >
      <Balancer>{title}</Balancer>
    </h1>
  )

  const descriptionElement = description && (
    <p className={cn('text-zinc-400 max-w-md font-sans font-light leading-relaxed', vs.description)}>
      <Balancer>{description}</Balancer>
    </p>
  )

  const socialProofElement = (socialProof || avatars?.length) && (
    <div className="flex flex-col items-start gap-3">
      {socialProof && (
        <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">{socialProof}</p>
      )}
      {avatars?.length ? (
        <div className="flex -space-x-2.5">
          {avatars.map((a, i) => (
            <Avatar
              key={i}
              className="ring-[#050505] size-9 ring-2"
            >
              <AvatarImage src={a.src} alt="" />
              <AvatarFallback className="text-xs bg-zinc-900 text-white font-mono">{a.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      ) : null}
    </div>
  )

  const cardsElement = cards?.length ? (
    <div className={cn('grid grid-cols-1 md:grid-cols-2', vs.grid)}>
      {cards.map((card, i) => (
        <FeatureCard key={i} card={card} vs={vs} />
      ))}
    </div>
  ) : null

  return (
    <section className="bg-[#050505] text-white relative isolate w-full overflow-hidden border-b border-zinc-900">
      <motion.div
        className={cn(
          'relative z-10 mx-auto flex max-w-6xl flex-col px-8',
          vs.section,
          vs.content,
        )}
        variants={animate ? container : undefined}
        initial={animate ? 'hidden' : false}
        whileInView={animate ? 'visible' : undefined}
        viewport={{ once: true, margin: '-80px' }}
      >
        <Reveal
          active={animate}
          className={cn(
            'grid grid-cols-1 items-end lg:grid-cols-2 gap-8',
            vs.header,
          )}
        >
          {titleElement}
          <div className="flex flex-col items-start gap-6">
            {descriptionElement}
            {socialProofElement}
          </div>
        </Reveal>

        <Reveal active={animate} variants={mediaItem} className="w-full">
          {cardsElement}
        </Reveal>
      </motion.div>
    </section>
  )
}

export default Hero08;
