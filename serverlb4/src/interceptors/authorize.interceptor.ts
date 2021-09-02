import {
  AuthenticationBindings,
  AuthenticationMetadata,
} from '@loopback/authentication';
import {
  Getter,
  /* inject, */
  globalInterceptor,
  inject,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/core';
import {MyUserProfile, RequiredPermissions} from './types';
import {intersection} from 'lodash';
import {HttpErrors} from '@loopback/rest';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@globalInterceptor('', {tags: {name: 'authorize'}})
export class AuthorizeInterceptor implements Provider<Interceptor> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    public metadata: AuthenticationMetadata[],
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    public getCurrentUser: Getter<MyUserProfile>,
  ) {}

  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    // eslint-disable-next-line no-useless-catch
    try {
      // Add pre-invocation logic here

      console.log('Log from authorize glbal interceptor');
      let options;
      console.log(this.metadata);

      if (this.metadata) {
        options = this.metadata.find(
          _metadata => _metadata.strategy === 'jwt',
        )?.options;
      }
      // if options is not provided in jwt strategy this line will be executed
      if (!options) {
        console.log(options);

        return await next();
      }

      const result = await next();
      const requiredPermissions = options as RequiredPermissions;
      console.log(requiredPermissions);
      const user = await this.getCurrentUser();
      console.log(user as MyUserProfile);

      console.log('user from interceptor ', user.permissions);

      const results = intersection(
        requiredPermissions.required,
        user.permissions,
      ).length;

      if (results === 0) {
        throw new HttpErrors.Forbidden('Invalid Access Permissions');
      }

      // console.log('user permissions', user.permissions);

      // Add post-invocation logic here
      return result;
    } catch (err) {
      // Add error handling logic here
      throw err;
    }
  }
}
