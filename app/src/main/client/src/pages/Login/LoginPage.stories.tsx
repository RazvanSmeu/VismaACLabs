import { LoginPage } from "./LoginPage"
import { useTestLoginPage } from "./useLoginPage"

export default {
    title: 'DoubleTex/Login',
}
 
export function Normal() {
    return <LoginPage { ...useTestLoginPage() } />
}