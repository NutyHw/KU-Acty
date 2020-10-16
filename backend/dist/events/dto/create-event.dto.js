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
exports.CreateEventDto = void 0;
const class_validator_1 = require("class-validator");
class CreateEventDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "event_name", void 0);
__decorate([
    class_validator_1.IsMongoId(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "organizer_id", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateEventDto.prototype, "benefit_hour", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "place", void 0);
__decorate([
    class_validator_1.IsDateString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "event_start_time", void 0);
__decorate([
    class_validator_1.IsDateString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "event_end_time", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "contact", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsEnum(['active', 'past', 'cancled']),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "status", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateEventDto.prototype, "event_type", void 0);
exports.CreateEventDto = CreateEventDto;
//# sourceMappingURL=create-event.dto.js.map