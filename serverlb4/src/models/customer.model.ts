import { Entity, model, property, hasMany } from '@loopback/repository';
import { User, UserWithRelations } from './user.model';

@model()
export class Customer extends Entity {
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
  name: string;

  @property({
    type: 'string',
  })
  website?: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

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

  @hasMany(() => User)
  users: User[];

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
  users?: UserWithRelations[];
}

export type CustomerWithRelations = Customer & CustomerRelations;
