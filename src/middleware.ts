import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { TokenPayload } from './types/authTypes';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;


  if (
    pathname.startsWith('/login') || 
    pathname.startsWith('/admin/login') || 
    pathname.startsWith('/api/auth/login')
  ) {
    console.log("Skipping middleware for login request...");
    return NextResponse.next();
  }

  let token = null;
  let refreshToken = null;
  let role = null;


  if (pathname.startsWith('/admin')) {
    token = req.cookies.get('adminAccessToken')?.value;
    refreshToken = req.cookies.get('adminRefreshToken')?.value;
  } 

  else if (pathname.startsWith('/carOwner')) {
    token = req.cookies.get('carOwnerAccessToken')?.value;
    refreshToken = req.cookies.get('carOwnerRefreshToken')?.value;
  } 

  else {
    token = req.cookies.get('customerAccessToken')?.value;
    refreshToken = req.cookies.get('customerRefreshToken')?.value;
  }


  token = token || req.cookies.get('accessToken')?.value;
  refreshToken = refreshToken || req.cookies.get('refreshToken')?.value;


  if (token) {
    try {
      const decoded = jwt.decode(token) as TokenPayload | null;
      role = decoded?.role || null;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  console.log("middleware role =>", role);
  console.log("middleware path =>", pathname);

  if (!token) {
   
    if (pathname.startsWith('/carOwner')) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }

 
  if (!token && refreshToken) {
    console.log("Access token expired, but refresh token exists. Allowing frontend to refresh.");
    return NextResponse.next();
  }


  if (role) {

    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

   
    if (pathname.startsWith('/carowner') && role !== 'carowner' ) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    
    '/home',
    '/profile',
     '/bookings',
    '/checkout',
    '/wishlist',
    
  
    '/carOwner/dashboard/profile',
    '/carOwner/dashboard/bookings',
    '/carOwner/dashboard/cars',
    '/carOwner/home',

    

    '/admin/dashboard/bookings',
    '/admin/dashboard/carOwner',
    '/admin/dashboard/customer',
    '/admin/dashboard/usermanagement',
    '/admin/dashboard/carownermanagement',
    '/admin/dashboard/carOwnerVerification',
    
  ],
};
