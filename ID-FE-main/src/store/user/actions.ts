import { GetEmployeesActionType, GetFilesActionType, RemoveActionType, SendInvitationActionType, UpdateRoleActionType, UpdateRoleInputType, UpdateUserInputType, UserUpdateActionType } from "./types";

export const USER_SET = 'USER:SET';
export const USER_REMOVE = 'USER:REMOVE';
export const USER_FILES_REQUEST = 'USER:GET_FILES:REQUEST';
export const USER_FILES_RESPONSE = 'USER:GET_FILES:RESPONSE';
export const USER_UPDATE_RUQUEST = 'USER:UPDATE:REQUEST';
export const USER_UPDATE_RESPONSE = 'USER:UPDATE:RESPONSE';
export const USER_ADD_EMPLOYEE_REQUEST = 'USER:ADD_EMPLOYEE:REQUEST';
export const USER_ADD_EMPLOYEE_RESPONSE = 'USER:ADD_EMPLOYEE:RESPONSE';
export const USER_GET_EMPLOYEES_REQUEST = 'USER:GET_EMPLOYEES:REQUEST';
export const USER_GET_EMPLOYEES_RESPONSE = 'USER:GET_EMPLOYEES:RESPONSE';

export const USER_START_LOADING = 'USER:START_LOADING';
export const USER_FINISH_LOADING = 'USER:FINISH_LOADING';

export const USER_SEND_INVITATION = 'USER:SEND_INVITATION:REQUEST';
export const USER_DELETE_EMPLOYEE = 'USER:DELETE_EMPLOYEE';

export const USER_ROLE_UPDATE = 'USER:ROLE_UPDATE';

export function remove(): RemoveActionType {
  return {
    type: USER_REMOVE
  }
}

export function getFiles(): GetFilesActionType {
  return {
    type: USER_FILES_REQUEST
  }
}

export function updateUser(data: UpdateUserInputType): UserUpdateActionType {
  return {
    type: USER_UPDATE_RUQUEST,
    data
  }
}

export function addEmployee(data: UpdateUserInputType): UserUpdateActionType {
  return {
    type: USER_ADD_EMPLOYEE_REQUEST,
    data
  }
}

export function getEmployees(): GetEmployeesActionType {
  return {
    type: USER_GET_EMPLOYEES_REQUEST,
  }
}

export function sendInvitation(email: string): UserUpdateActionType {
  return {
    type: USER_SEND_INVITATION,
    data: {email}
  }
}

export function deleteEmployee(id: string): UserUpdateActionType {
  return {
    type: USER_DELETE_EMPLOYEE,
    data: {id}
  }
}

export function clearLoading(): GetEmployeesActionType {
  return {
    type: USER_FINISH_LOADING
  }
}

export function updateRole(data: UpdateRoleInputType): UpdateRoleActionType {
  return {
    type: USER_ROLE_UPDATE,
    data
  }
}