import { CreateFileInput } from "./typeDefs";
import { UserModel } from "../../models/user.model";
import { FileModel } from "../../models/file";
import { getUser } from "../user";

export const getFile = async (id: string): Promise<FileModel> => {
  return await FileModel.findOneOrFail(id);
}

export const createFile = async (input: CreateFileInput) => {
  try {
    const file = new FileModel();
    const {filename, size, format, userId} = input;
    file.filename = filename;
    file.size = size;
    file.format = format;
    const user = await getUser(userId);
    file.user = user;
    await file.save();
    return file;
  } catch (error) {
    console.log(error);
    return false;
  }
};