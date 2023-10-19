import { Resolver, Query, Mutation, Arg, Ctx, Args, UseMiddleware } from "type-graphql";
import { addEmployee, createUser, getUser, login, updateRole, updateUserProfile } from "../services/user";
import { UserType } from "../schemas/user";
import { AddUserResType, EmployeesResType, FilesResType, LoginResType, ResType, SignUpResType, UpdateUserResType } from "../schemas/common";
import { CreateUserInput, LoginInput, UpdateRoleInput, UpdateUserInput } from "../inputs/user";
import { CreateInvitationToken, CreateJwtToken } from "../services/common";
import graphqlAuth, { MyContext } from "../middleware/graphqlAuth";
import { verify } from "jsonwebtoken";
import isAuth from "../middleware/graphqlAuth";
import { USERROLE } from "../services/user/typeDefs";
import { sendInvitation } from "../services/email";

@Resolver()
export class UserResolver {
  @Query(() => UserType)
  async user(@Arg("id") id: string): Promise<UserType> {
    const user = await getUser(id);
    return new UserType(user);
  }

  @Query(() => UserType)
  async verifyToken(
    @Arg("token") token: string,
  ): Promise<UserType | null> {
    const payload: any = verify(token, process.env.AUTH_SECRET || 'identify');
    if (payload.id) {
      const user = await getUser(payload.id);
      return new UserType(user);
    }
    return null;
  }

  @Query(() => LoginResType)
  async login(
    @Arg("input", { validate: true }) input: LoginInput
  ): Promise<LoginResType> {
    const user = await login(input);
    console.log("uselogin-->>", user)
    if (user) {
      return {
        result: true,
        token: CreateJwtToken(user),
        user
      };
    }
    return {
      result: false,
      token: ''
    }
  }

  @Query(() => FilesResType)
  @UseMiddleware(isAuth)
  async getFiles(
    @Ctx() ctx: MyContext
  ): Promise<FilesResType> {
    const {id} = ctx.payload;
    const user = await getUser(id, ["files"]);
    if (user) {
      return {
        result: true,
        files: user.files
      }
    }
    return {
      result: false,
      error: 'User not found',
      files: []
    }
  }

  @Query(() => EmployeesResType)
  @UseMiddleware(isAuth)
  async getEmployees(
    @Ctx() ctx: MyContext
  ): Promise<EmployeesResType> {
    const {id} = ctx.payload;
    const user = await getUser(id, ["employees"]);
    if (user && user.role === USERROLE.ADMIN) {
      return {
        result: true,
        employees: user.employees || []
      }
    }
    return {
      result: false,
      error: "User not found",
      employees: []
    }
  }

  @Mutation(() => SignUpResType)
  async createUser(
    @Arg("input", { validate: true }) input: CreateUserInput,
  ): Promise<SignUpResType> {
    const user = await createUser({...input, role: USERROLE.ADMIN});
    if (!user) {
      return {
        result: false,
        message: 'Duplicate Email or something is wrong!'
      };
    }
    return {
      result: true,
      message: ''
    }
  }

  @Mutation(() => UpdateUserResType)
  @UseMiddleware(isAuth)
  async updateUser(
    @Ctx() ctx: MyContext,
    @Arg("input", { validate: true }) input: UpdateUserInput
  ): Promise<UpdateUserResType> {
    const {id} = ctx.payload;
    const {user, error} = await updateUserProfile(id, input);
    if (!error) {
      return {
        result: true,
        user   
      };
    }
    return {
      result: false,
      error
    }
  }

  @Mutation(() => AddUserResType)
  @UseMiddleware(isAuth)
  async addEmployee(
    @Ctx() ctx: MyContext,
    @Arg("input", {validate: true}) input: UpdateUserInput
  ): Promise<AddUserResType> {
    const {id} = ctx.payload;
    const { employee, error, password, invited_by } = await addEmployee(id, input);
    if (employee) {
      try {
        const token = CreateInvitationToken(`${employee.id}`, employee.email);
        await sendInvitation(input.email, input.firstName, invited_by!, password!, token);
      } catch (error) {
        console.log(error);
      }
    }
    return {
      result: !error,
      employee,
      error
    }
  }

  @Mutation(() => ResType)
  @UseMiddleware(isAuth)
  async updateRole(
    @Arg("input", {validate: true}) input: UpdateRoleInput
  ): Promise<ResType> {
    const { employeeId, role } = input;
    return await updateRole(employeeId, role);
  }
}
