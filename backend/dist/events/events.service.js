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
exports.EventsService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const event_schema_1 = require("./schema/event.schema");
const follower_schema_1 = require("./schema/follower.schema");
let EventsService = class EventsService {
    constructor(eventModel, followerModel) {
        this.eventModel = eventModel;
        this.followerModel = followerModel;
    }
    async createEvent(createEventDto) {
        const createEvent = new this.eventModel(createEventDto);
        return await createEvent.save();
    }
    async updateEvent(_id, createEventDto) {
        const temp = JSON.stringify(createEventDto);
        const updated = JSON.parse(temp);
        return await this.eventModel.updateOne({ _id: new mongoose_1.Types.ObjectId(_id) }, { '$set': updated });
    }
    async followEvent(followDto) {
        const record = {
            event_id: new mongoose_1.Types.ObjectId(followDto.event_id),
            student_id: new mongoose_1.Types.ObjectId(followDto.student_id)
        };
        const follower = new this.followerModel(record);
        return await follower.save();
    }
    async unFollow(followDto) {
        const record = {
            event_id: new mongoose_1.Types.ObjectId(followDto.event_id),
            student_id: new mongoose_1.Types.ObjectId(followDto.student_id)
        };
        return await this.followerModel.deleteOne(record).exec();
    }
    async getDetailedEvent(_id) {
        return await this.eventModel.findById(new mongoose_1.Types.ObjectId(_id)).exec();
    }
    async searchEvent(queryDto) {
        const res = await this.eventModel.aggregate([
            { $match: { event_name: queryDto.event_name } },
            { $match: {
                    $gte: { event_start_time: queryDto.evet_start_time },
                    $lt: { event_end_time: queryDto.event_end_time }
                }
            },
            { $match: { event_type: queryDto.event_type } }
        ]);
        return res;
    }
};
EventsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel(event_schema_1.Event.name)),
    __param(1, mongoose_2.InjectModel(follower_schema_1.Follower.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map