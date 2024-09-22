// src/types/express.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        roles: string[];
        // Add any other properties you attach to req.user
      };
    }
  }
}
