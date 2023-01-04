import {Column, JoinColumn, OneToOne} from "typeorm";

export class ProjetInfo {
    @Column()
    startDate!: Date;
    @Column()
    endDate!: Date;
    @Column('uuid')
    userId!: string; //au format uuidv4
    @Column('uuid')
    projectId!: string; //au format uuidv4
}