import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/users.schema';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    saltRound: number;
    hashPassword(password: string): Promise<string>;
    register(userDto: UserDto): Promise<User>;
    login(userDto: UserDto): Promise<any>;
    createPayload(username: string, userId: string): Promise<any>;
}
