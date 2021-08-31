import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {Assignment12DataSource} from '../datasources';
import {User, UserRelations, Customer, Role} from '../models';
import {CustomerRepository} from './customer.repository';
import {RoleRepository} from './role.repository';

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly customer: BelongsToAccessor<
    Customer,
    typeof User.prototype.id
  >;

  public readonly roles: BelongsToAccessor<Role, typeof User.prototype.id>;

  constructor(
    @inject('datasources.assignment12') dataSource: Assignment12DataSource,
    @repository.getter('CustomerRepository')
    protected customerRepositoryGetter: Getter<CustomerRepository>,
    @repository.getter('RoleRepository')
    protected roleRepositoryGetter: Getter<RoleRepository>,
  ) {
    super(User, dataSource);
    this.roles = this.createBelongsToAccessorFor('roles', roleRepositoryGetter);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
    this.customer = this.createBelongsToAccessorFor(
      'customer',
      customerRepositoryGetter,
    );
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
