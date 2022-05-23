import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Company as CompanyPrisma, Prisma } from '@prisma/client';

import { PaginationArgs } from 'src/modules/prisma/resolvers/pagination/pagination.args';
import { Roles } from 'src/modules/auth/decorators/role.decorator';
import { Role } from 'src/modules/auth/enum/role.enum';
import {
  Company,
  CompanyPaginated,
  GeneralCompany,
} from '../entities/company.entity';
import { CompanyService } from '../services/company.service';
import { OrderListCompanies } from '../dto/order-companies.input';
import { FilterListCompanies } from '../dto/filter-company.input';
import {
  CreateCompanyGeneralInput,
  CreateCompanyInput,
  CreateCompanyAddressInput,
} from '../dto/company-input';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Roles(Role.Admin)
  @Query(() => CompanyPaginated)
  async companies(
    @Args('paginate', { nullable: true, defaultValue: { skip: 0, take: 50 } })
    paginate: PaginationArgs,
    @Args('order', {
      nullable: true,
      defaultValue: { orderBy: 'name', direction: 'desc' },
    })
    order: OrderListCompanies,
    @Args('filter', { nullable: true })
    filter: FilterListCompanies,
  ) {
    return await this.companyService.list(paginate, order, filter);
  }

  @Roles(Role.Owner)
  @Mutation(() => Company)
  async createCompany(
    @Args('data')
    company: CreateCompanyInput,
  ): Promise<CompanyPrisma> {
    return this.companyService.createCompany(company);
  }

  @Roles(Role.Owner)
  @Mutation(() => GeneralCompany)
  async createCompanyGeneralInfo(
    @Args('data')
    generalCompany: CreateCompanyGeneralInput,
  ): Promise<CompanyPrisma> {
    return this.companyService.createCompanyGeneralInfo(generalCompany);
  }

  @Roles(Role.Owner)
  @Mutation(() => GeneralCompany)
  async createCompanyAddress(
    @Args('data') companyAddress: CreateCompanyAddressInput,
  ): Promise<CompanyPrisma> {
    return this.companyService.createCompanyAddress(companyAddress);
  }
}