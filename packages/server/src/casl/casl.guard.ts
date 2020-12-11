import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UsersService } from 'src/users/users.service';
import { Action } from './action.enum';
import { CaslAbilityFactory } from './casl-ability.factory';
import { PERMISSIONS_KEY } from './casl.decorator';
import { Resource } from './resources.enum';

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.getAllAndOverride<{
      action: Action;
      resource: Resource;
    }>(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredPermission) {
      return true;
    }

    const gqlContext = GqlExecutionContext.create(context);
    const { user } = gqlContext.getContext().req;
    const fullUser = await this.usersService.findOneByEmail(user.email);
    const ability = this.caslAbilityFactory.createForUser(fullUser);

    return ability.can(requiredPermission.action, requiredPermission.resource);
  }
}
