export class UserSecurityContext {
  attributes: Record<string, any>;
  permissions: Set<string>;
  roles: Set<string>;

  constructor(
    attributes: Record<string, any>,
    permissions: Set<string>,
    roles: Set<string>,
  ) {
    this.attributes = attributes;
    this.permissions = permissions;
    this.roles = roles;
  }
}
