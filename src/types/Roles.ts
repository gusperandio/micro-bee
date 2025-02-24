export enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
  MODERATOR = "MODERATOR",
  EDITOR = "EDITOR",
}

export type RoleType = {
  id?: number;
  name: Roles;
  description?: string;
};
