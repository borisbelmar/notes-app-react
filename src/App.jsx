import { ChakraProvider } from '@chakra-ui/react'
import { AuthContextProvider } from './components/context/AuthContext'
import CustomQueryContextProvider from './components/context/CustomQueryContext'
import Router from './components/Router'

function App() {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <CustomQueryContextProvider>
          <Router />
        </CustomQueryContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  )
}

export default App
