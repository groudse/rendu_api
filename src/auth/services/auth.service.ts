import {Injectable, UnauthorizedException} from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import {use} from "passport";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any)    {
        const payload = {
            email: user.email,
            sub: user.userId,
            role : user.role,
            username : user.username
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }



}