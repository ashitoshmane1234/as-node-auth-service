import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenUtil } from './token.util';
import { AuthenticationBuilderService } from './authentication-builder.service';
import { IdentityPermissionResolverService } from './identity-permission-resolver.service';
import { Provider } from '../enums/provider.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenUtil: TokenUtil,
    private readonly permissionResolver: IdentityPermissionResolverService,
    private readonly authBuilder: AuthenticationBuilderService,
  ) {}

  async validateToken(token: string) {
    const issuer = this.tokenUtil.getIssuer(token);
    const providerId = this.tokenUtil.getProviderId(token);

    const provider = this.mapIssuerToProvider(issuer);

    if (!provider)
      throw new UnauthorizedException(`Unsupported issuer: ${issuer}`);

    const userContext = await this.permissionResolver.resolvePermissions(
      providerId,
      provider,
    );

    return this.authBuilder.buildAuthentication(userContext, token, provider);
  }

  private mapIssuerToProvider(issuer: string): Provider | null {
    if (issuer.includes('auth0.com')) return Provider.AUTH0;
    return null;
  }
}
