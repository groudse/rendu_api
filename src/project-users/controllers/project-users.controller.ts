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
/*POST /project-users
Speech client :  je dois pouvoir assigner
un employé à un projet pour une durée determinée si ce dernier n'est pas déja affecté à
un autre projet en même temps.

Notes du lead-developper : Dans le cas où l'employé est déjà affecté à un projet pour
la période demandé tu dois me renvoyer une ConflictException. Tout comme dans les autres
 routes, si un utilisateur n'a pas les droits pour effectuer cette action, il faut que tu
 me renvoies une UnauthorizedException. Pour que le portail puisse afficher une modale de
 succès, il faudrait que tu m'inclues les relations user et project dans le retour de la
 route.



*/

