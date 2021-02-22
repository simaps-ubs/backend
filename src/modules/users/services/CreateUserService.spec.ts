import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/provider/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let createUserService: CreateUserService;
let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to create a new common user', async () => {
    const user = await createUserService.execute({
      name: 'paulo',
      email: 'paulo@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.user_type).toEqual('common');
  });

  it('Should be able to create a new health user', async () => {
    const user = await createUserService.execute({
      name: 'paulo',
      email: 'paulo@gmail.com',
      password: '123456',
      user_type: 'health',
    });

    expect(user).toHaveProperty('id');
    expect(user.user_type).toEqual('health');
  });

  it('Should not be able to create a new user with email already exists', async () => {
    await createUserService.execute({
      name: 'paulo',
      email: 'paulo@gmail.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'paulo',
        email: 'paulo@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
