export class UserAccessContext {
  constructor(
    public userId: number,
    public uuid: string,
    public permissions: string[],
    public roles: string[],
  ) {}
}
