import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Request,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {UserService} from '../services/user.service'
import {CreateUserDto, LoginUserDto} from "../dto/user.dtos";
import {User} from '../user.entity';
import {AuthService} from "../../auth/services/auth.service";
import {LocalAuthGuard} from "../../auth/local-auth.guard";
import {JwtAuthGuard} from "../../auth/jwt-auth.guard";


@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {
    }

    @Post('auth/sign-up')
    @UsePipes(ValidationPipe)
    signup(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    @UsePipes(ValidationPipe)
    async login(@Body() loginUserDto: LoginUserDto, @Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    @UsePipes(ValidationPipe)
    getMe(@Request() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    @UsePipes(ValidationPipe)
    getAllUsers() {
        return this.userService.findAllUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @UsePipes(ValidationPipe)
    findOne(@Param('id', new ParseUUIDPipe()) id) {
        return this.userService.findId(id);
    }


}



/*
// -----------------------------------------


// -----------------------------------------


GET /users/:id/meal-vouchers/:month
// Speech client : En tant qu'enployé, je dois pouvoir voir le montant accordé en titres restaurant par l'entreprise pour un mois donné afin d'éviter des erreurs comptables dans le calculs des titres restaurants.

// Criteres d'acceptation : Étant donné que je suis un employé et que je travaille du Lundi au Vendredi sans interruption, et ce, même les jours féries, lorsque je demande mon montant de titres restaurant pour un mois donné alors le système me donne ce montant selon le calcul suivant : l'entreprise accorde 8 euros de titres restaurants par jour travaillé par employé et les employés n'ont pas le droit aux titres restaurants les jours de télétravail ou de congés payés

Parametres (query) :

id!: string; //au format uuidv4
month!: number; //nombres de 1 (Janvier) à 12 (Decembre)*/