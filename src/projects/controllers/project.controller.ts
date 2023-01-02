import {Body, Controller, Post, Request, UseGuards, UsePipes, ValidationPipe} from "@nestjs/common";
import {ProjectService} from "../services/project.service";
import {InfoProjetDto} from "../dto/projet.dtos";
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";

@Controller('projects')
export class ProjectController {
    constructor(
        private projectService : ProjectService
    ) {
    }



    @UseGuards(JwtAuthGuard)
    @Post('')
    @UsePipes(ValidationPipe)
    async projects(@Body() infoProjetDto: InfoProjetDto,@Request() req) {
        // req.user => infos du user qui fait la requete
        return this.projectService.postProjects(req);
    }

    // @UseGuards(LocalAuthGuard)
    // @Get('')
    // @UsePipes(ValidationPipe)
    // getAllProjects( ){
    //     return this.projectService.findProjectsByRole();
    // }
}