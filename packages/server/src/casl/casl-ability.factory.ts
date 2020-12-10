import { AbilityClass, Ability, AbilityBuilder } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Action } from './action.enum';
import { Resource } from './resources.enum';

type Subjects = Resource | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }

    // === PERMISSIONS RULES ===
    can(Action.Create, Resource.Review);
    // === END PERMISSIONS RULES ===

    return build();
  }
}
