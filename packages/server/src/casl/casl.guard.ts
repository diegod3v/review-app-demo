import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Action } from './action.enum';
import { CaslAbilityFactory } from './casl-ability.factory';
import { PERMISSIONS_KEY } from './casl.decorator';
import { Resource } from './resources.enum';

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission = this.reflector.getAllAndOverride<{
      action: Action;
      resource: Resource;
    }>(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredPermission) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.createForUser(user);

    ability.can(requiredPermission.action, requiredPermission.resource);
  }
}
