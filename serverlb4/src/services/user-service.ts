import {AuthenticationBindings, UserService} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {UserProfile, securityId} from '@loopback/security';
import {inject, Setter} from '@loopback/core';
import {User} from '../models';
import {Credentials, RoleRepository, UserRepository} from '../repositories';
import {BcryptHasher} from './hash.password.bcrypt';
import {PasswordHasherBindings} from './keys';
import {MyUserProfile} from '../interceptors/types';
import {pick} from 'lodash';
import {PermissionKeys} from '../authorization/permission-keys';

export class MyUserService implements UserService<User, Credentials> {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @repository(RoleRepository)
    public roleRepository: RoleRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,
  ) {}
  async verifyCredentials(credentials: Credentials): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: {
        email: credentials.email,
      },
      include: [{relation: 'roles'}],
    });
    if (!foundUser) {
      throw new HttpErrors.NotFound(
        `User with email ${credentials.email} does not exist`,
      );
    }

    const passwordMatched = await this.hasher.comparePassword(
      credentials.password,
      foundUser.password,
    );
    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized('password is not valid');
    }

    return foundUser;
  }
  convertToUserProfile(user: User): MyUserProfile {
    let userName = user.firstName;
    if (user.lastname) {
      userName += ' ' + user.lastname;
    }

    const userPermissions = (user as any).roles.permissions;
    console.log(user);

    const myuserprofile = {
      email: user.email,
      name: userName,
      [securityId]: `${user.id!}`,
      permissions: userPermissions,
    };

    return myuserprofile;
  }
}
