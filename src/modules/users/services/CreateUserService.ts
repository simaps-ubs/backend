import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IhashProvider from '@modules/users/provider/HashProvider/model/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
  user_type?: 'health' | 'common';
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IhashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    user_type,
  }: IRequest): Promise<User> {
    const checkEmailExistent = await this.usersRepository.findByEmail(email);

    if (checkEmailExistent) {
      throw new AppError('Email already exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      user_type,
    });

    return user;
  }
}

export default CreateUserService;
