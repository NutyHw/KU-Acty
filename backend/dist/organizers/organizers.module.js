"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const organizers_service_1 = require("./organizers.service");
const organizer_schema_1 = require("./schema/organizer.schema");
const organizers_controller_1 = require("./organizers.controller");
const platform_express_1 = require("@nestjs/platform-express");
let OrganizersModule = class OrganizersModule {
};
OrganizersModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: organizer_schema_1.Organizer.name, schema: organizer_schema_1.OrganizerSchema }]),
            platform_express_1.MulterModule.register({
                dest: '/data'
            })
        ],
        providers: [organizers_service_1.OrganizersService],
        controllers: [organizers_controller_1.OrganizersController]
    })
], OrganizersModule);
exports.OrganizersModule = OrganizersModule;
//# sourceMappingURL=organizers.module.js.map