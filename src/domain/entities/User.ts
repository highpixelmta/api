import { randomUUID } from "crypto";

export class User {
  public readonly id: string;
  public readonly username: string;
  public readonly roles: string[];
  public readonly password: string;
  public readonly fullName: string;
  public readonly email: string;
  public readonly isVerified: boolean;
  public readonly createdAt: string;

  constructor(props: IUserProps) {
    this.id = randomUUID();
    this.username = props.username;
    this.roles = ["user"]
    this.password = props.password;
    this.fullName = props.fullName;
    this.email = props.email;
    this.isVerified = false;
    this.createdAt = new Date().toISOString();
  }
}

export interface IUserProps {
  username: string;
  password: string;
  fullName: string;
  email: string;
}