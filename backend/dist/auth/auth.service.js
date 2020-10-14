"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.saltRound = 10;
    }
    ;
    async hashPassword(password) {
        return await bcrypt.hash(password, this.saltRound);
    }
    async register(userDto) {
        userDto.password = await this.hashPassword(userDto.password);
        console.log(userDto);
        const user = await this.userService.findOne(userDto.username);
        if (user) {
            throw new common_1.HttpException('username already in userd', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.userService.create(userDto);
    }
    async login(userDto) {
        const user = await this.userService.findOne(userDto.username);
        if (!user) {
            return null;
        }
        const match = await bcrypt.compare(userDto.password, user.password);
        if (!match) {
            return null;
        }
        const payload = await this.createPayload(user.username, user._id);
        return payload;
    }
    async createPayload(username, userId) {
        const payload = { username: username, userId: userId };
        console.log(payload);
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map