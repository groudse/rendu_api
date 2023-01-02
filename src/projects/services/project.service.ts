import {Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Project} from "../project.entity";
import {Repository} from "typeorm";
import {UserService} from "../../users/services/user.service";
import {User} from "../../users/user.entity";
import {use} from "passport";

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        private userService: UserService
    ) {
    }

    async postProjects(req: any) {

        if (req.user.role == "Admin") {

            const user = await this.userService.findId(req.body.referringEmployeeId)

            if (user.role == "ProjectManager" || user.role == "Admin") {
                return this.projectRepository.save(this.projectRepository.create({
                    name: req.body.name,
                    referringEmployeeId: req.body.referringEmployeeId
                }))
            } else {
                throw new UnauthorizedException();
            }
        } else {
            throw new UnauthorizedException();
        }

    }

    async findId(idProjet: string): Promise<Project | null> {
        const user = await this.projectRepository.findOneBy({
            id: idProjet
        })
        console.log("ici",user)
        if(user === null){
            throw new NotFoundException();
        }else {
            return user;
        }
    }


}
