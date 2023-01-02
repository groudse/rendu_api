import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from "./users/user.module";
import {User} from "./users/user.entity";
import {AuthModule} from "./auth/auth.module";
import {Project} from "./projects/project.entity";
import {ProjectModule} from "./projects/project.module";
import {ProjectUserModule} from "./project-users/project-users.module";
import {ProjectUser} from "./project-users/project-user.entity";


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Project, ProjectUser],      //mettre les entites cree à chaque fois
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
      UserModule,
      AuthModule,
      ProjectModule,
      ProjectUserModule
      //mettre les modules cree à chaque fois
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}