import { Field, ObjectType } from '@nestjs/graphql';
import JSON from 'graphql-type-json';
import { Float } from 'type-graphql';
import { IsOptional } from 'class-validator';

import { Paginated } from 'src/modules/prisma/resolvers/pagination/pagination';
import { BaseEntity } from '../../prisma/entities/base.entity';
import { Branch } from './branch.entity';
import relayTypes from 'src/modules/prisma/resolvers/pagination/relay.types';

// @ObjectType()
// export class CompanyAddress {
//   @Field()
//   country: string;

//   @Field()
//   city: string;

//   @Field()
//   zipCode: string;

//   @Field()
//   state: string;

//   @Field()
//   street: string;
// }

@ObjectType()
export class Company extends BaseEntity {
  @Field({ nullable: true })
  name?: string;

  @Field()
  legalName: string;

  @Field({ nullable: true })
  registrationNumber: string;

  @Field({ nullable: true })
  establishedDate: Date;

  @Field({ nullable: true })
  companyStage: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  ownership: string;

  @Field({ nullable: true })
  mission: string;

  @Field({ nullable: true })
  vision: string;

  @Field(() => JSON, { nullable: true })
  addresses: any;

  @Field({ nullable: true })
  numberOfemployees: number;

  @Field({ nullable: true })
  contactEmail: string;

  @Field(() => Float, { nullable: true })
  transactions: number;

  @Field({ nullable: true })
  isActive: boolean;

  @Field({ nullable: true })
  isVerified: boolean;

  @Field({ nullable: true })
  ownerId: string;

  @Field({ nullable: true })
  website: string;

  @Field({ nullable: true })
  contactNumber: string;

  @Field({ nullable: true })
  followers?: number;

  @Field({ nullable: true })
  slogan: string;

  @Field(() => [Branch], { nullable: true })
  @IsOptional()
  branches?: Branch[];
}

@ObjectType()
export class CompanyPaginated extends relayTypes<Company>(Company) {}
