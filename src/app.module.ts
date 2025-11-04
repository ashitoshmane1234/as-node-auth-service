import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/user/entities/role.entity';
import { Permission } from 'src/user/entities/permission.entity';
import { UserIdentity } from 'src/user/entities/user-identity.entity';
import { UserRole } from 'src/user/entities/user-role.entity';
import { RolePermission } from 'src/user/entities/role-permission.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          User,
          Role,
          Permission,
          UserIdentity,
          UserRole,
          RolePermission,
        ],
        synchronize: true,
        logging: true,
      }),
    }),

    // Application modules
    UserModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
