/* eslint-disable @typescript-eslint/no-unused-vars */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertDateFormat(dateString: string) {
  // Split the input string into parts
  const [year, month, day] = dateString.split("-");
  
  // Rearrange the parts into the desired format
  const formattedDate = `${month}${day}${year}`;
  
  return formattedDate;
}