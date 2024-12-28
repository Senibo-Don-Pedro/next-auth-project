/**
 *
 * An array of routes accessible to the public
 * Do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * Array of routes used for authentication
 * Redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = ["/auth/login", "/auth/register", "/auth/error", "/auth/reset", "/auth/new-password"];

/**
 * The prefix for API auth routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
