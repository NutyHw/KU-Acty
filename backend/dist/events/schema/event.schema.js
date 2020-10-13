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
exports.EventSchema = exports.Event = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Event = class Event {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Event.prototype, "event_name", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Array)
], Event.prototype, "organizer_id", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Number)
], Event.prototype, "benefit_hour", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Event.prototype, "place", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Date)
], Event.prototype, "event_start_time", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Date)
], Event.prototype, "event_end_time", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Event.prototype, "contact", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Array)
], Event.prototype, "attachment_path", void 0);
__decorate([
    mongoose_1.Prop({ default: 0 }),
    __metadata("design:type", Number)
], Event.prototype, "view_counts", void 0);
__decorate([
    mongoose_1.Prop({ default: 0 }),
    __metadata("design:type", Number)
], Event.prototype, "interest_count", void 0);
__decorate([
    mongoose_1.Prop({ default: 'active' }),
    __metadata("design:type", String)
], Event.prototype, "status", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Event.prototype, "event_type", void 0);
Event = __decorate([
    mongoose_1.Schema({
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })
], Event);
exports.Event = Event;
exports.EventSchema = mongoose_1.SchemaFactory.createForClass(Event);
//# sourceMappingURL=event.schema.js.map