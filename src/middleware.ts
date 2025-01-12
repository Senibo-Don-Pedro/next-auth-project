import { auth } from "./auth"
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default async function middleware(request: NextRequest) {
  const session = await auth()
  const { pathname, search } = request.nextUrl

  const isLoggedIn = !!session
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(pathname)
  const isAuthRoute = authRoutes.includes(pathname)

  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url))
    }
    return NextResponse.next()
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = pathname
    if (search) {
      callbackUrl += search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}


// import authConfig from "./auth.config";
// import NextAuth from "next-auth";

// import {
//   DEFAULT_LOGIN_REDIRECT,
//   apiAuthPrefix,
//   authRoutes,
//   publicRoutes,
// } from "@/routes";


// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
  

//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   if (isApiAuthRoute) return null;

//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     return null;
//   }

//   if (!isLoggedIn && !isPublicRoute) {
//     let callbackUrl = nextUrl.pathname;
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search;
//     }

//     const encodedCallbackUrl = encodeURIComponent(callbackUrl);

//     return Response.redirect(
//       new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
//     );
//   }
  
// });

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
