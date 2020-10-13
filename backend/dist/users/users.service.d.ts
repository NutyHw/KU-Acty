import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { UserDto } from './dto/user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(userDto: UserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(username: string): Promise<User>;
}
