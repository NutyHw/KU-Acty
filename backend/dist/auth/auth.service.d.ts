import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from '../users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/users.schema';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    saltRound: number;
    hashPassword(password: string): Promise<string>;
    register(userDto: RegisterDto): Promise<User>;
    login(userDto: LoginDto): Promise<any>;
    createPayload(username: string, userId: string, role: string): Promise<any>;
}
