import {CrudMethod, Endpoint, ParamLocation} from "../utils/Http";
import {Persistance, StorageSpec} from "../utils/storage/Storage";

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

export const USER_LOGIN  = Endpoint<LoginRequest, User>(
	CrudMethod.GET,
	'/api/user/login',
	ParamLocation.InQuery
);
export const USER_RESUME = Endpoint<ResumeRequest, User>(
	CrudMethod.PUT,
	'/api/user/resume',
	ParamLocation.InQuery
);
export const USER_REGISTER = Endpoint<LoginRequest, User>(
	CrudMethod.PUT,
	'/api/user/register',
	ParamLocation.InQuery
);

export const USER_SESSION = StorageSpec<User | undefined>(
	Persistance.Session,
	"doubletex-app-user",
	undefined
);