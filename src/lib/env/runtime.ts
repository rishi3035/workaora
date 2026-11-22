/**
 * Facts about where the app is running. Nothing secret.
 */

/** True only while the app runs with `npm run dev` on a developer's computer. */
export const isDevelopment = process.env.NODE_ENV === "development";
