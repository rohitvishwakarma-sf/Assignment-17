import {BindingKey} from '@loopback/core';
import {TokenService} from '@loopback/authentication';
import {PasswordHasher} from './hash.password.bcrypt';
import {UserService} from '@loopback/authentication';
import {Credentials} from '../repositories/user.repository';
import {User} from '../models';
export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = '123asdf5';
  export const TOKEN_EXPIRES_IN_VALUE = '15s';
}

export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expiresIn',
  );
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.jwt.service',
  );
}

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER =
    BindingKey.create<PasswordHasher>('services.hasher');
  export const ROUNDS = BindingKey.create<number>('services.hasher.rounds');
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<Credentials, User>>(
    'services.user.service',
  );
}
