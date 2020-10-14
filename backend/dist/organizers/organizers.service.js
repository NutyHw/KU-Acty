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
exports.OrganizersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const organizer_schema_1 = require("./schema/organizer.schema");
let OrganizersService = class OrganizersService {
    constructor(organizerModel) {
        this.organizerModel = organizerModel;
    }
    async create(organizerDto) {
        const organizer = new this.organizerModel(organizerDto);
        return organizer.save();
    }
    async approve(_id) {
        return await this.organizerModel.updateOne({ _id: _id }, { $set: { approve_date: new Date() } });
    }
    async uploadFile(_id, filePath) {
        return await this.organizerModel.updateOne({ _id: new mongoose_1.Types.ObjectId(_id) }, { $set: { document_path: filePath } });
    }
};
OrganizersService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel(organizer_schema_1.Organizer.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], OrganizersService);
exports.OrganizersService = OrganizersService;
//# sourceMappingURL=organizers.service.js.map