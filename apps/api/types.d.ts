declare namespace Express {
  interface Request {
    userId?: string; // Optional user ID for authenticated requests
  }
}
