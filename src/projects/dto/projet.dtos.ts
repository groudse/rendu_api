import {IsNotEmpty} from "class-validator";

export class InfoProjetDto {
    @IsNotEmpty()
    name!: string;
    @IsNotEmpty()
    referringEmployeeId!: string;
}