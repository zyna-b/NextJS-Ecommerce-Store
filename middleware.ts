import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/api/reviews/:path*", // Protect review submission
    "/api/orders/:path*",  // Protect order placement
    "/account/:path*",     // Protect user account pages
    // Add more as needed
  ],
};