import {Body, Controller, Post, UseGuards, UsePipes, ValidationPipe, Request} from "@nestjs/common";
import {ProjectUserService} from "../services/project-users.service";
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";
import {ProjetInfo} from "../dto/project-users.dto";

@Controller('project-users')
export class ProjectUserController {
    constructor(
        private projectUserService: ProjectUserService
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    @UsePipes(ValidationPipe)
    async addUserToProject(@Body() projetInfo : ProjetInfo, @Request() req){
        // console.log(req.body)
            return this.projectUserService.addToProjects(req);
    }
}


