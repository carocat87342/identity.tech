import { Field, ObjectType } from "type-graphql";
import { FileModel } from "../models/file";

@ObjectType()
export class FileType {
  @Field()
  id!: number;

  @Field()
  filename!: string;

  @Field()
  size!: number;

  @Field()
  format: string;

  @Field()
  uploadedOn!: Date;

  constructor(initializer: FileModel) {
    this.id = initializer.id;
    this.filename = initializer.filename;
    this.size = initializer.size;
    this.format = initializer.format;
    this.uploadedOn = initializer.uploadedOn;
  }
}