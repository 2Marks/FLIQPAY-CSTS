export interface CreateUserDTO {
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly roles: string[];
}

export interface UserProps {
  readonly _id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  roles: string[];
  isActive: boolean;
}

export interface GetAllUsersDTO {
  page: number;
  perPage: number;
  searchQuery?: string;
}

export interface GetOneUserDTO {
  id: number;
}

export interface ToggleUserStatusDTO {
  id: string;
  action: UserStatusActions;
}

export enum UserStatusActions {
  activate = 'activate',
  deactivate = 'deactivate',
}
