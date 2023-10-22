import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean | any> {
    try {
      const request = context.switchToHttp().getRequest();

      const permissions = this.reflector.getAllAndOverride<string[]>(
        'permissions',
        [context.getHandler(), context.getClass()],
      );

      let isPermitGranted = false;

      if (!permissions.length) return true;
      if (!request.permissions || !request.permissions.length) return true;

      permissions.map((permission: string) => {
        if (request.permissions.includes(permission)) {
          isPermitGranted = true;
        }
      });

      return isPermitGranted;
    } catch (error) {
      return error;
    }
  }
}
