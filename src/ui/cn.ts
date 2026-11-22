import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Tell the class-merging helper about Workaora's own text sizes. Without
// this it would mistake "text-label" for a colour and drop the real colour.
const mergeClasses = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "label",
            "display-sm",
            "display-md",
            "display-lg",
            "display-xl",
          ],
        },
      ],
    },
  },
});

/**
 * Joins class names, skipping empty ones, and lets a later class win over an
 * earlier one that sets the same thing (so a caller can override a default).
 */
export function cn(...inputs: ClassValue[]): string {
  return mergeClasses(clsx(inputs));
}
