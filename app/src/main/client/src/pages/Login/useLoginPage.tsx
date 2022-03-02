import { LoginRequest, User, USER_LOGIN, USER_REGISTER, USER_SESSION } from "../../types/User";
import { Subject, useSubject, useUnstableSubject } from "../../utils/Subject";
import { Invalid, Valid } from "../../utils/Validated";
import { LoginPageProps } from "./LoginPage";

export function useLoginPage(): LoginPageProps {
	const serverValidation = useSubject(Valid);
	const userSubject = USER_SESSION.useSpec();

	async function doLogin(request: LoginRequest) {
		try {
			const user = await USER_LOGIN.call(request);
			userSubject.set(user);
		} catch(e) {
			serverValidation.set(Invalid.because("" + e));
		}
	}

	async function doRegister(request: LoginRequest) {
		try {
			const user = await USER_REGISTER.call(request);
			userSubject.set(user);
		} catch(e) {
			serverValidation.set(Invalid.because("" + e));
		}
	}

	return {
		doLogin,
		doRegister,
		totalValidation: serverValidation
	};
}

export function useTestLoginPage(): LoginPageProps {
	const totalValidation = useSubject(Valid);

	function doLogin() {
		totalValidation.set(Invalid.because("Login failed, this is a test environment, you stupid lil cunt."));
	}

	return {
		doLogin,
		doRegister() {},
		totalValidation
	};
}