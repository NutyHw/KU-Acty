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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizersController = void 0;
const common_1 = require("@nestjs/common");
const organizers_dto_1 = require("./dto/organizers.dto");
const organizers_service_1 = require("./organizers.service");
const platform_express_1 = require("@nestjs/platform-express");
let OrganizersController = class OrganizersController {
    constructor(organizerService) {
        this.organizerService = organizerService;
    }
    async register(organizerDto) {
        return await this.organizerService.create(organizerDto);
    }
    async upload(file, param) {
        return await this.organizerService.uploadFile(param.id, file.path);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organizers_dto_1.OrganizerDto]),
    __metadata("design:returntype", Promise)
], OrganizersController.prototype, "register", null);
__decorate([
    common_1.Post('/upload/:id'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrganizersController.prototype, "upload", null);
OrganizersController = __decorate([
    common_1.Controller('organizers'),
    __metadata("design:paramtypes", [organizers_service_1.OrganizersService])
], OrganizersController);
exports.OrganizersController = OrganizersController;
//# sourceMappingURL=organizers.controller.js.map