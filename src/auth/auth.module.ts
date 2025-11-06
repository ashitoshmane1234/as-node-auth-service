import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { TokenUtil } from './service/token.util';
import { AuthenticationBuilderService } from './service/authentication-builder.service';
import { IdentityPermissionResolverService } from './service/identity-permission-resolver.service';
import { SecurityContextUtil } from './service/security-context.util';
import { UserModule } from '../user/user.module'; // 👈 import here

@Module({
  imports: [forwardRef(() => UserModule)], // 👈 this must exist
  providers: [
    AuthService,
    TokenUtil,
    AuthenticationBuilderService,
    IdentityPermissionResolverService,
    SecurityContextUtil,
  ],
  exports: [AuthService, SecurityContextUtil],
})
export class AuthModule {}
