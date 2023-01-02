import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserController} from './controllers/user.controller';
import {UserService} from './services/user.service'
import {User} from './user.entity'
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}