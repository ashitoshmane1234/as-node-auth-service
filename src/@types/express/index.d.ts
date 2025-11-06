import { AuthenticatedUser } from '../../auth/services/authentication-builder.service';

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}
