import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

export class RoleGuard implements CanActivate {
  constructor(private requiredRole: string) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new ForbiddenException('No user in request');
    }

    if (user.role !== this.requiredRole) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
