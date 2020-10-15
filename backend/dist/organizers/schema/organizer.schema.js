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
exports.OrganizerSchema = exports.Organizer = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Organizer = class Organizer {
};
__decorate([
    mongoose_1.Prop({
        required: true
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Organizer.prototype, "user", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Organizer.prototype, "organizer_name", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", String)
], Organizer.prototype, "document_path", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Organizer.prototype, "email", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Organizer.prototype, "contact", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Organizer.prototype, "location", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Organizer.prototype, "description", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", Date)
], Organizer.prototype, "approve_date", void 0);
Organizer = __decorate([
    mongoose_1.Schema({
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    })
], Organizer);
exports.Organizer = Organizer;
exports.OrganizerSchema = mongoose_1.SchemaFactory.createForClass(Organizer);
//# sourceMappingURL=organizer.schema.js.map