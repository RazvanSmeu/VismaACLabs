import { useSubject } from "../../utils/Subject";
import { Invalid, Valid } from "../../utils/Validated";
import { LoginPageProps } from "./LoginPage";

export function useLoginPage(): LoginPageProps {
	return null as any;
}

export function useTestLoginPage(): LoginPageProps {
	const totalValidation = useSubject(Valid);

	function doLogin() {
		totalValidation.set(Invalid.because("Login failed, this is a test environment, you stupid lil cunt."));
	}

	return {
		doLogin,
		goToRegister() {},
		totalValidation
	};
}