import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { FileModel } from "./file";

@Entity({ name: "users" })
export class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => UserModel, (employee) => employee.parent, { nullable: true, cascade: true })
  employees?: UserModel[];

  @ManyToOne(() => UserModel, (admin) => admin.employees, { nullable: true, createForeignKeyConstraints: false, onDelete: 'CASCADE' })
  parent?: UserModel;

  @Column({ name: "first_name", nullable: true })
  firstName!: string;

  @Column({ name: "last_name", nullable: true })
  lastName!: string;
  
  @Column({ name: "email", unique: true, nullable: false })
  email!: string;

  @Column({ name: "password", nullable: false })
  password!: string;

  @Column({ name: "role", nullable: false })
  role!: string;

  @Column({ name: 'email_verified', nullable: false, default: false })
  emailVerified: boolean;

  @Column({ name: 'active_people', nullable: true, default: false })
  activePeople: boolean;

  @Column({ name: 'weekly_report', nullable: true, default: null })
  weeklyReport: string;

  @Column({ name: 'over-utilization-notifications', nullable: true, default: false})
  utilizationNotifications: boolean;

  @OneToMany(() => FileModel, file => file.user, {
    cascade: true,
  })
  files: FileModel[];

  @CreateDateColumn({ name: "created_on" })
  createdOn!: Date;
}
