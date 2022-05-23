import { Field, HideField, ObjectType } from '@nestjs/graphql';

import { Role } from 'src/modules/auth/entities/role.entity';
import { Paginated } from 'src/modules/prisma/resolvers/pagination/pagination';

import { BaseEntity } from '../../prisma/entities/base.entity';

@ObjectType()
export class User extends BaseEntity {
  @Field()
  @Field()
  firstName: string;

  @Field()
  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  isValid: boolean;

  @HideField()
  password: string;

  roles: Role[];

  @Field({ nullable: true })
  isSuperuser?: boolean;

  @Field()
  confirm: boolean;
}

@ObjectType()
export class UserPaginated extends Paginated(User) {}