export class UserAccessContext {
  userId: number;
  userUuid: string;
  permissions: Set<string>;
  userRoles: Set<string>;

  constructor(
    userId: number,
    userUuid: string,
    permissions: Set<string>,
    userRoles: Set<string>,
  ) {
    this.userId = userId;
    this.userUuid = userUuid;
    this.permissions = permissions;
    this.userRoles = userRoles;
  }
}
