import { CreateUserInput, LoginInput, USERROLE } from "./typeDefs";
import { UserModel } from "../../models/user.model";
import { UpdateUserInput } from "../../inputs/user";
import generator from "generate-password";

export const getUser = async (id: string, relations: string[] = []): Promise<UserModel> => {
  return await UserModel.findOneOrFail(id, {relations});
}

export const getUserByEmail = async (email: string): Promise<UserModel | undefined> => {
  try {
    const user = await UserModel.findOneOrFail({ where: {email} });
    return user;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export const login = async(input: LoginInput): Promise<UserModel | undefined> => {
  const {email, password} = input;
  try {
    const user = await UserModel.findOneOrFail({ where: {email, password}, relations: ["files"]});
    return user;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export const createUser = async (input: CreateUserInput) => {
  try {
    return await UserModel.insert(input);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addEmployee = async (adminID: string, input: UpdateUserInput) => {
  try {
    const admin = await getUser(adminID);
    const password = generator.generate({
      length: 10,
      uppercase: true,
      numbers: true
    });
    const {email, firstName, lastName} = input;
    const insert = await createUser({
      email, firstName, lastName, password, role: USERROLE.EMPLOYEE
    });
    const employee = await getUser(insert.raw[0].id);
    employee.parent = admin;
    await employee.save();

    return {employee, password, invited_by: admin.firstName};
  } catch (error) {
    console.log(error);
    return {error: JSON.stringify(error)};
  }
};

export const updateRole = async (userID: string, role: string) => {
  try {
    const user = await getUser(userID);
    user.role = role;
    await user.save();
    return { result: true };
  } catch (error) {
    console.log(error);
    return { result: false, error: JSON.stringify(error) };
  }
};

export const updateUserProfile = async (id: string, input: UpdateUserInput) => {
  try {
    const user = await getUser(id);
    if (input.hasOwnProperty('firstName')) {
      user.firstName = input['firstName']
    }
    if (input.hasOwnProperty('lastName')) {
      user.lastName = input['lastName']
    }
    if (input.hasOwnProperty('email')) {
      user.email = input['email']
      user.emailVerified = input['emailVerified']
    }
    if (input.hasOwnProperty('emailVerified')) {
      user.emailVerified = input['emailVerified']
    }
    if (input.hasOwnProperty('password')) {
      user.password = input['password']
    }
    if (input.hasOwnProperty('activePeople')) {
      user.activePeople = input['activePeople']
    }
    if (input.hasOwnProperty('weeklyReport')) {
      user.weeklyReport = input['weeklyReport']
    }
    if (input.hasOwnProperty('utilizationNotifications')) {
      user.utilizationNotifications = input['utilizationNotifications']
    }
    await user.save();
    return {user, error: null};
  } catch (error) {
    console.log(error);
    return {error: JSON.stringify(error)};
  }
}

export const deleteEmployee = async (id: string) => {
  try {
    const user = await getUser(id, ['parent', 'employees']);
    if (user.role === 'admin') {
      for (const employee of user.employees || []) {
        employee.parent = user.parent;
        await employee.save();
      }
    }
    await UserModel.delete(id);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}