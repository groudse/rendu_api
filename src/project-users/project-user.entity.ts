import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
  @Column('uuid')
  public userId!: string; //au format uuidv4
}


