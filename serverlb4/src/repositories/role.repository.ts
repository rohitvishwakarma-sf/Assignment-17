import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Assignment12DataSource} from '../datasources';
import {Role, RoleRelations} from '../models';

export class RoleRepository extends DefaultCrudRepository<
  Role,
  typeof Role.prototype.key,
  RoleRelations
> {
  constructor(
    @inject('datasources.assignment12') dataSource: Assignment12DataSource,
  ) {
    super(Role, dataSource);
  }
}
