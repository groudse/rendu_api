import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProjectUserService} from "./services/project-users.service";
import {ProjectUserController} from "./controllers/project-users.controller";
import {ProjectUser} from "./project-user.entity";
import {ProjectModule} from "../projects/project.module";
import {UserModule} from "../users/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProjectUser]),
        ProjectModule,
        UserModule
    ],
    controllers: [ProjectUserController],
    providers: [ProjectUserService],
    exports: [ProjectUserService]
})
export class ProjectUserModule {}