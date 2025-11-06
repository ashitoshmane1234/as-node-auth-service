import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string | string[];
}

@Injectable()
export class TokenUtil {
  decode(token?: string): JwtPayload {
    if (!token || token.trim() === '') {
      throw new UnauthorizedException('Authorization token is missing');
    }

    const decoded = jwt.decode(token);

    if (!decoded || typeof decoded !== 'object') {
      throw new UnauthorizedException('Invalid token');
    }

    return decoded as JwtPayload;
  }

  getIssuer(token?: string): string {
    const decoded = this.decode(token);
    if (!decoded.iss) {
      throw new UnauthorizedException('Token missing issuer');
    }
    return decoded.iss;
  }

  getProviderId(token?: string): string {
    const decoded = this.decode(token);
    if (!decoded.sub) {
      throw new UnauthorizedException('Token missing subject');
    }
    return decoded.sub;
  }
}
