import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(userDto: UserDto): Promise<any>;
}
export {};
