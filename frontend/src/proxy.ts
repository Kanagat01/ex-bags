import { NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAdminPath = pathname.startsWith("/admin/applications")

  if (!isAdminPath) {
    return NextResponse.next()
  }

  const token = request.cookies.get("access_token")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}