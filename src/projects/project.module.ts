import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Project} from "./project.entity";
import {ProjectController} from "./controllers/project.controller";
import {ProjectService} from "./services/project.service";
import {UserModule} from "../users/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Project]),
        UserModule
    ],
    controllers: [ProjectController],
    providers: [ProjectService],
    exports: [ProjectService]
})
export class ProjectModule {}