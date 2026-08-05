// Simple utility to merge class names without external dependencies
export function cn(...classes: (string | boolean | undefined | null | 0)[]) {
  return classes.filter(Boolean).join(" ");
}
