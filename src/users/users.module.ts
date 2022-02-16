/* eslint-disable prettier/prettier */
import {Module} from "@nestjs/common";
import {UserService} from "./users.service";
import {UsersResolver} from "./users.resolver";
import {MongooseModule} from "@nestjs/mongoose";

import {AuthService} from "../auth/auth.service";
import {JwtModule} from "@nestjs/jwt";
import {User, UserSchema} from "./users.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";


@Module({
  imports: [
     PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: "24h"
      }
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ],
  providers: [UserService, UsersResolver, AuthService,JwtStrategy]
})  
export class UsersModule {}
