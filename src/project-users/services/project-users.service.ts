import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ProjectUser} from "../project-user.entity";
import {ProjectService} from "../../projects/services/project.service";
import {UserService} from "../../users/services/user.service";

@Injectable()
export class ProjectUserService {
    constructor(
        @InjectRepository(ProjectUser)
        private projectUserRepository: Repository<ProjectUser>,
        private projectService: ProjectService,
        private userService: UserService,
    ) {
    }

    async addToProjects(req: any) {

        const test = await this.projectService.findId(req.body.projectId)

        if (test.referringEmployeeId === req.body.userId) {

            if (req.user != undefined) {
                if (req.user.role == "Admin" || req.user.role == "ProjectManager") {
                    const projet = await this.projectService.findId(req.body.projectId);

                    if (projet.referringEmployeeId != req.body.userId) {
                        return this.projectUserRepository.save(this.projectUserRepository.create({
                            startDate: req.body.startDate,
                            endDate: req.body.endDate,
                            projectId: req.body.projectId,
                            userId: req.body.userId
                        }))
                    } else {
                        throw new ConflictException();
                    }
                } else {
                    throw new UnauthorizedException();
                }
            } else {
                throw new NotFoundException();
            }
        }
    }

    async findId(id: string): Promise<ProjectUser | null> {
        const user = await this.projectUserRepository.findOneBy({
            userId: id
        })
        if (user === null) {
            throw new NotFoundException();
        } else {
            return user;
        }
    }

}