import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Customer, CustomerWithRelations} from './customer.model';
import {Role, RoleWithRelations} from './role.model';

@model({
  settings: {
    foreignKeys: {
      fk_users_customer: {
        name: 'fk_users_customer',
        entity: 'Customer',
        entityKey: 'id',
        foreignKey: 'customerid',
      },
      fk_users_role: {
        name: 'fk_users_role',
        entity: 'Role',
        entityKey: 'key',
        foreignKey: 'rolekey',
      },
    },
  },
})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
  })
  middleName?: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @belongsTo(() => Customer)
  customerId: number;

  @belongsTo(() => Role, {name: 'roles'})
  roleKey: string;
  @property({
    type: 'date',
    default: 'now',
  })
  createdOn?: string;
  @property({
    type: 'date',
    default: 'now',
  })
  modifiedOn?: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
  customerId: CustomerWithRelations;
  roleKey: RoleWithRelations;
}

export type UserWithRelations = User & UserRelations;
