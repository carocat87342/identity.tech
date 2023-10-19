import {UserType} from 'types/user'

export type FileType = {
  id: number;
  filename: string;
  size: number;
  format: string;
  uploadedOn: Date;
}

export type UserStateType = {
  id: string | null
  email: string | null
  password: string
  token: string | null
  firstName: string | null
  lastName: string | null
  role: string | null
  files: FileType[] | [],
  emailVerified: boolean,
  activePeople: boolean,
  weeklyReport: string | null,
  utilizationNotifications: boolean,
  employees: UserType[],
  parent: UserType | null,
  loading: boolean
}

export type UpdateUserInputType = {
  id?: string;
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  emailVerified?: boolean,
  activePeople?: boolean,
  weeklyReport?: string
  utilizationNotifications?: boolean
}

export type UpdateRoleInputType = {
  employeeId: string;
  role: string;
}

export type SetActionType = {
  type: 'USER:SET';
  data: UserStateType
}

export type RemoveActionType = {
  type: string;
}

export type GetFilesActionType = {
  type: string;
}

export type GetEmployeesActionType = {
  type: string;
}

export type UserUpdateActionType = {
  type: string;
  data: UpdateUserInputType
};

export type SendInvitationActionType = {
  type: string;
  data: UpdateUserInputType
}

export type UpdateRoleActionType = {
  type: string;
  data: UpdateRoleInputType;
}