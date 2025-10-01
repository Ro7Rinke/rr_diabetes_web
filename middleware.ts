import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const PUBLIC_PATHS = ["/signin", "/signup", "/reset-password"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Se for rota pública, deixa passar
  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Pega o token do cookie (definido pela API Nest)
  const token = req.cookies.get("token")?.value;

  if (!token) {
    // Redireciona para login se não houver token
    const url = req.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  try {
    // Valida o token usando a mesma chave secreta da API Nest
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch (err) {
    // Token inválido → redireciona para login
    const url = req.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }
}

// Middleware aplicado para todas as rotas exceto assets e _next
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};