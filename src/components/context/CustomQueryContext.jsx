import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useAuth } from './AuthContext'

const queryClient = new QueryClient()

const CustomQueryContextProvider = ({ children }) => {
  const { logout, isAuth } = useAuth()

  useEffect(() => {
    queryClient.setDefaultOptions({
      queries: {
        refetchOnWindowFocus: false,
        onError: e => {
          if (isAuth) {
            logout()
          }
          console.error(e)
        }
      }
    })
  }, [logout, isAuth])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

CustomQueryContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default CustomQueryContextProvider
