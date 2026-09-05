import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatINR(amountInLakhs: number): string {
  if (amountInLakhs >= 100) {
    return `₹${(amountInLakhs / 100).toFixed(2)} Cr`;
  }
  return `₹${amountInLakhs} L`;
}
