import { container } from 'tsyringe';

import '@modules/users/provider';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Usersrepository from '@modules/users/infra/typeorm/repositories/UserRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  Usersrepository,
);
