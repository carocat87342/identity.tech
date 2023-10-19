import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { UserModel } from "./user.model";

@Entity({ name: "files" })
export class FileModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "filename", nullable: true })
  filename!: string;

  @Column({ name: "size", nullable: true })
  size!: number;

  @Column({ name: "format", nullable: true })
  format: string;
  
  @ManyToOne(() => UserModel, user => user.files, {
    onDelete: 'CASCADE',
  })
  user: UserModel;

  @CreateDateColumn({ name: "uploaded_on" })
  uploadedOn!: Date;
}
