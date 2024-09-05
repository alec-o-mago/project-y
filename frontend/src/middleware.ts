import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { cookies } from 'next/headers'

const protectedRoutes = ['/home']

export function middleware(request: NextRequest) {
  // console.log("entering middleware")
  // const cookieStore = cookies()
  // Prevents of
  // const path = request.nextUrl.pathname
  // if (protectedRoutes.includes(path)) {
    // const token = cookieStore.get('authToken')
    // if (!token){
    //   console.log("blocked from middleware")
    //  return NextResponse.redirect(new URL('/', request.nextUrl))
    // }
  // }
  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}