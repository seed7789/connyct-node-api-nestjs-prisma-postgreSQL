import { CanActivate, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { PrismaService } from 'src/modules/prisma/prisma.service';

import { ROLES_KEY } from '../decorators/role.decorator';
import { Role } from '../enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  private permissonRoles: Role[];
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context): Promise<boolean> {
    this.permissonRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('###########################', this.permissonRoles);

    if (!this.permissonRoles) return true;
    console.log(context.contextType);
    if (context.contextType === 'http') {
      const contextHTTP = context.switchToHttp().getRequest();
      return await this.checkPermission(contextHTTP.user);
    }

    if (context.contextType === 'graphql') {
      const ctx = GqlExecutionContext.create(context);

      if (ctx.getContext().req.headers['authorization']) {
        console.log('inside auth check');
        const user = ctx.getContext().req?.user;
        console.log('context user', user);
        return await this.checkPermission(user);
      }
    }

    return false;
  }

  async checkPermission(user): Promise<boolean> {
    const _user = await this.prisma.user.findFirst({
      where: { id: user.id },
      include: { userRoles: { include: { role: true } } },
    });
    return _user.userRoles.some((role) => {
      if (this.permissonRoles.includes(role.role.name as any)) {
        return true;
      }
    });
  }
}