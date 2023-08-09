import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// ....what?
//i can only assume this does something with classnames so shout out to the "classnames" package which is great
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
