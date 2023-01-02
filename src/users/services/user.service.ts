import {BadRequestException, Injectable, NotFoundException, UseGuards} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {runInThisContext} from 'vm';
import {CreateUserDto, LoginUserDto} from '../dto/user.dtos';
import {User} from '../user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
    }


    createUser(body: CreateUserDto): Promise<User> {
        const newUser = this.usersRepository.create(body);
        return this.usersRepository.save(newUser);
    }


    async findOne(email: string): Promise<User | null> {
        const user = await this.usersRepository.findOneBy({
            email: email
        })
        if(user === null){
            throw new NotFoundException();
        }else {
            return user;
        }
    }

    async findId(id: string): Promise<User | null> {
        const user = await this.usersRepository.findOneBy({
            id: id
        })
        if(user === null){
            throw new NotFoundException();
        }else {
            return user;
        }
    }

    findAllUsers(): Promise<User[]> {
        return this.usersRepository.find()
    }
}
