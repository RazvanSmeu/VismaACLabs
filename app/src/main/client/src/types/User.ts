import { CrudMethod, Endpoint } from "../utils/Http";
import { Persistance, StorageSpec } from "../utils/storage/Storage";

type UserToken = string;
type UserName = string;
type Password = string;

export type User = {
	id: number;
	userName: UserName;
	password: Password;
	lastToken: UserToken;
	isTokenFrozen: boolean;
}

export type LoginRequest = {
	userName: UserName;
	password: Password;
}

export type ResumeRequest = {
	userToken: UserToken
}

export const USER_LOGIN  = new Endpoint<LoginRequest, User>(CrudMethod.GET, '/api/user/login');
export const USER_RESUME = new Endpoint<ResumeRequest, User>(CrudMethod.PUT, '/api/user/resume');
export const USER_REGISTER = new Endpoint<LoginRequest, User>(CrudMethod.PUT, '/api/user/register');

export const USER_SESSION = StorageSpec<User | undefined>(
	Persistance.Session,
	"doubletex-app-user",
	undefined
);