
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class LoginInput {
    email?: Nullable<string>;
    username?: Nullable<string>;
    password: string;
}

export class SignupInput {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    isCompanyAccount?: Nullable<boolean>;
}

export class CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    isCompanyAccount?: Nullable<boolean>;
}

export class UpdateUserInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
}

export class Login {
    errors?: Nullable<Nullable<UserError>[]>;
    jwtToken?: Nullable<string>;
    isLoginSuccessful?: Nullable<boolean>;
}

export class SignupPayload {
    errors?: Nullable<Nullable<UserError>[]>;
    user?: Nullable<User>;
}

export abstract class IMutation {
    abstract login(input?: Nullable<LoginInput>): Nullable<Login> | Promise<Nullable<Login>>;

    abstract signup(input?: Nullable<SignupInput>): Nullable<SignupPayload> | Promise<Nullable<SignupPayload>>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(id: string, updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export class UserError {
    message: string;
    field?: Nullable<string>;
}

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    isActive?: Nullable<boolean>;
    isSuperuser?: Nullable<boolean>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export abstract class IQuery {
    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export type DateTime = any;
type Nullable<T> = T | null;