import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Project} from "../projects/project.entity";

@Entity()
export class ProjectUser {
  @PrimaryGeneratedColumn('uuid')
  public id!: string; //au format uuidv4
  @Column('uuid')
  public startDate!: Date;
  @Column('uuid')
  public endDate!: Date;
  @Column('uuid')
  public projectId!: string; //au format uuidv4
  @OneToOne(() => Project)
  @JoinColumn()
  @Column('uuid')
  public userId!: string; //au format uuidv4
}


