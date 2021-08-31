import {AuthenticationStrategy} from '@loopback/authentication';
import {HttpErrors, Request} from '@loopback/rest';
import {inject} from '@loopback/core';
import {JWTService} from '../services/jwt-service';
import {TokenServiceBindings} from '../services/keys';
import {UserProfile} from '@loopback/security';

export class JWTStrategy implements AuthenticationStrategy {
  name: string = 'jwt';
  @inject(TokenServiceBindings.TOKEN_SERVICE)
  jwtService: JWTService;
  async authenticate(request: Request): Promise<UserProfile> {
    const token: string = this.extractCredentials(request);
    const userProfile = await this.jwtService.verifyToken(token);
    return Promise.resolve(userProfile);
  }
  extractCredentials(request: Request): string {
    if (!request.headers.authorization) {
      throw new HttpErrors.Unauthorized('Authorizaion header is missing');
    }
    const authHeaderValue = request.headers.authorization;
    if (!authHeaderValue.startsWith('Bearer')) {
      throw new HttpErrors.Unauthorized(
        `Authorization header is not type of 'Bearer'.`,
      );
    }
    const parts = authHeaderValue.split(' ');
    if (parts.length !== 2) {
      throw new HttpErrors.Unauthorized(
        `Authorization header has too many parts it must follow this patter 'Bearer xx.yy.zz'`,
      );
    }
    const token = parts[1];
    return token;
  }
}
