import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(userDto: UserDto): Promise<import("../users/schemas/users.schema").User>;
    login(userDto: UserDto): Promise<any>;
}
