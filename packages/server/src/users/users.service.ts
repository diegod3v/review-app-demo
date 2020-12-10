import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    const user = new User();
    user.name = createUserInput.name;
    user.email = createUserInput.email;
    user.password = createUserInput.password;

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  findOneByEmail(email: string, options?: { withPass: boolean }) {
    let userQuery = this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email });

    if (options?.withPass) {
      userQuery = userQuery.addSelect('user.password');
    }

    return userQuery.getOne();
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    const user = new User();
    user.name = updateUserInput.name;

    return this.userRepository.update({ id }, user);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
