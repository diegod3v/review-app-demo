import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-gql.guard';
import { User } from './models/user.model';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Resource } from 'src/casl/resources.enum';
import { Action } from 'src/casl/action.enum';
import { RequirePermissions } from 'src/casl/casl.decorator';
import { Public } from 'src/auth/is-public.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, { name: 'createUser' })
  @Public()
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  @Public()
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @Public()
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => User, { name: 'me' })
  whoAmI(@CurrentUser() user: User) {
    return this.usersService.findOne(user.id);
  }

  @Mutation(() => User, { name: 'updateUser' })
  @RequirePermissions(Action.Update, Resource.User)
  update(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User, { name: 'removeUser' })
  @RequirePermissions(Action.Delete, Resource.User)
  remove(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.remove(id);
  }
}
