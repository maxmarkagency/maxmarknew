"use client";

import { User, Briefcase, Layers, Code, DollarSign, Mail } from "lucide-react";
import RadialOrbitalTimeline, { TimelineItem } from "@/components/ui/radial-orbital-timeline";

const menuData: TimelineItem[] = [
  {
    id: 1,
    title: "About",
    date: "Who We Are",
    content: "Learn about Maxmark's mission, our team of engineering & design experts, and our creative philosophy.",
    category: "About",
    icon: User,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 95,
    route: "/about",
  },
  {
    id: 2,
    title: "Services",
    date: "What We Do",
    content: "From branding & web design to high-performance web development, SEO, and social media campaigns.",
    category: "Services",
    icon: Briefcase,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
    route: "/services",
  },
  {
    id: 3,
    title: "Products",
    date: "Our Products",
    content: "Custom SaaS platforms, advanced developer tools, and client portal templates built to scale.",
    category: "Products",
    icon: Layers,
    relatedIds: [2, 5],
    status: "in-progress" as const,
    energy: 75,
    route: "/#products",
  },
  {
    id: 4,
    title: "Work",
    date: "Case Studies",
    content: "Explore our showcase of digital experiences, interactive sites, and high-conversion client platforms.",
    category: "Work",
    icon: Code,
    relatedIds: [1, 6],
    status: "completed" as const,
    energy: 85,
    route: "/#work",
  },
  {
    id: 5,
    title: "Pricing",
    date: "Our Pricing",
    content: "Transparent investment plans tailored for startups, growing brands, and enterprise partners.",
    category: "Pricing",
    icon: DollarSign,
    relatedIds: [3, 6],
    status: "pending" as const,
    energy: 60,
    route: "/#pricing",
  },
  {
    id: 6,
    title: "Contact Us",
    date: "Get In Touch",
    content: "Ready to launch? Reach out via email, phone, or fill our custom project inquiry form.",
    category: "Contact",
    icon: Mail,
    relatedIds: [4, 5],
    status: "in-progress" as const,
    energy: 100,
    route: "/#contact",
  },
];

export default function MenuPage() {
  return (
    <div className="relative w-screen h-screen bg-[#050505] text-white">
      <RadialOrbitalTimeline timelineData={menuData} />
    </div>
  );
}
