import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector : Reflector) {}
  canActivate( context : ExecutionContext ) : boolean {
    const roles = this.reflector.get<string[]>('role', context.getHandler());
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const hasRole = () => {
      let res = false;
      roles.forEach( ( role : string ) => {
        if ( role === user.role  ){
          res = true;
        }
      } )
      return res;
    }
    return hasRole();
  }
}
