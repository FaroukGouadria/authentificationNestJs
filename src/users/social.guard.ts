/* eslint-disable prettier/prettier */
import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { GqlAuthGuard } from './uers.guard';

@Injectable()
export class SocialAuthGuard extends GqlAuthGuard {
  getRequest(context: GqlExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const { input } = ctx.getArgs();

    req.body = {
      ...req.body,
      access_token: input.accessToken,
      provider: input.provider,
    };
    return req;
  }
}
