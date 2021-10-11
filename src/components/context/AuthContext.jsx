import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import PropTypes from 'prop-types'
import jwtDecode from 'jwt-decode'

const AuthContext = createContext({
  isAuth: false,
  session: undefined,
  setToken: () => { throw new Error('Out of auth context') },
  logout: () => { throw new Error('Out of auth context') },
  token: undefined
})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState()

  useEffect(() => {
    const token = window.localStorage.getItem('notesApp:token')
    if (token) {
      try {
        setSession({ ...jwtDecode(token), token })
      } catch (e) {
        window.localStorage.removeItem('notesApp:token')
        console.error('Error decoding jwt')
      }
    }
  }, [])

  const setToken = useCallback(token => {
    try {
      window.localStorage.setItem('notesApp:token', token)
      setSession({ ...jwtDecode(token), token })
    } catch (e) {
      console.error('Error decoding jwt')
    }
  }, [])

  const logout = useCallback(() => {
    setSession(undefined)
    window.localStorage.removeItem('notesApp:token')
  }, [])

  const value = useMemo(() => ({
    session,
    setToken,
    logout,
    isAuth: !!session
  }), [session, setToken, logout])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}
