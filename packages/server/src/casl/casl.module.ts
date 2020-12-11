import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from 'src/users/users.module';
import { CaslAbilityFactory } from './casl-ability.factory';
import { CaslGuard } from './casl.guard';

@Module({
  imports: [UsersModule],
  providers: [
    CaslAbilityFactory,
    {
      provide: APP_GUARD,
      useClass: CaslGuard,
    },
  ],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
