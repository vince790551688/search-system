import { NextResponse } from 'next/server';

const ALLOWED_IPS = [
  '82.26.153.21',
  '52.192.113.75',
  '60.249.253.188',
  '60.249.249.188',
  '220.130.89.59',
  '220.130.89.158',
  '220.130.89.132',
  '211.72.190.242',
  '59.120.107.239',
  '125.227.96.134',
  '211.22.233.215',
];

export function middleware(request) {
  const ip =
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();

  if (!ip || !ALLOWED_IPS.includes(ip)) {
    return new NextResponse('403 Forbidden', { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
