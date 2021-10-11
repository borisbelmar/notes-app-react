import { lazy, Suspense } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Loading from './pages/Loading'

const Main = lazy(() => import('./pages/Main'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Forbidden = lazy(() => import('./pages/Forbidden'))

function Router() {
  const { isAuth } = useAuth()
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        {isAuth ? (
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/403" component={Forbidden} />
            <Redirect exact path={['/login', '/register']} to="/" />
            <Route path="*" component={NotFound} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Redirect path="*" to="/login" />
          </Switch>
        )}
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
