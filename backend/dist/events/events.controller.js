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
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const events_service_1 = require("./events.service");
const create_event_dto_1 = require("./dto/create-event.dto");
const follow_dto_1 = require("./dto/follow.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let EventsController = class EventsController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    async createEvent(createEventDto, req) {
        console.log(req.user);
        createEventDto.organizer_id = req.user.userId;
        return await this.eventService.createEvent(createEventDto);
    }
    async updateEvent(createEventDto, param) {
        return await this.eventService.updateEvent(param.id, createEventDto);
    }
    async getDetailedEvent(param) {
        return await this.eventService.getDetailedEvent(param.id);
    }
    async followEvent(followDto) {
        return await this.eventService.followEvent(followDto);
    }
    async unFollowEvent(followDto) {
        return await this.eventService.unFollow(followDto);
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "createEvent", null);
__decorate([
    common_1.Put(':id'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "updateEvent", null);
__decorate([
    common_1.Get(':id/detail'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getDetailedEvent", null);
__decorate([
    common_1.Post('follow'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [follow_dto_1.FollowDto]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "followEvent", null);
__decorate([
    common_1.Post('unfollow'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [follow_dto_1.FollowDto]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "unFollowEvent", null);
EventsController = __decorate([
    common_1.Controller('events'),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsController);
exports.EventsController = EventsController;
//# sourceMappingURL=events.controller.js.map