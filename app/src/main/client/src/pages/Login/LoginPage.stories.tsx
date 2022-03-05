import { LoginPage } from './LoginPage'
import { LoginPanel } from './LoginPanel'
import { useTestLoginPage } from './useLoginPage'

export default {
  title: 'DoubleTex/Login'
}

export function Panel() {
  return <LoginPanel {...useTestLoginPage()} />
}
