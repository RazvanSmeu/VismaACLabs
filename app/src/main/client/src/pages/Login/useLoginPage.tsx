import { LoginRequest, USER_LOGIN, USER_REGISTER, USER_SESSION } from "../../types/User";
import { useSubject } from "../../utils/Subject";
import { Invalid, Valid } from "../../utils/Validated";
import { LoginPageProps } from "./LoginPage";

export function useLoginPage(): LoginPageProps {
	const userName = useSubject("");
	const password = useSubject("");
	const responseValidation = useSubject(Valid);
	const userSubject = USER_SESSION.useSpec();

	function makeRequest(): LoginRequest {
		return {
			userName: userName.value,
			password: password.value
		}
	}

	async function doLogin() {
		try {
			const user = await USER_LOGIN.call(makeRequest());
			userSubject.set(user);
		} catch(e) {
			responseValidation.set(Invalid.because("" + e));
		}
	}

	async function doRegister() {
		try {
			const user = await USER_REGISTER.call(makeRequest());
			userSubject.set(user);
		} catch(e) {
			responseValidation.set(Invalid.because("" + e));
		}
	}

	return {
		userName,
		password,
		doLogin,
		doRegister,
		responseValidation
	};
}

export function useTestLoginPage(): LoginPageProps {
	const userName = useSubject("");
	const password = useSubject("");
	const responseValidation = useSubject(Valid);

	function doLogin() {
		responseValidation.set(Invalid.because("Login failed, this is a test environment, you stupid lil cunt."));
	}

	return {
		userName,
		password,
		doLogin,
		doRegister() {},
		responseValidation
	};
}