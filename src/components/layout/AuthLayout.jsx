import {
  Box,
  Flex,
  Heading,
  Link,
  Stack
} from '@chakra-ui/layout'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'

const AuthLayout = ({ children, isLogin }) => (
  <Flex
    flexDirection="column"
    width="100wh"
    minHeight="100vh"
    backgroundColor="gray.200"
    justifyContent="center"
    alignItems="center"
  >
    <Stack
      flexDir="column"
      mb="2"
      justifyContent="center"
      alignItems="center"
    >
      <Heading color="teal.400" pb="4">
        App de Notas
      </Heading>
      <Box minW={{ base: '90%', md: '64' }}>
        {children}
      </Box>
    </Stack>
    <Box>
      {isLogin ? '¿Eres nuevo? ' : '¿Ya tienes una cuenta? '}
      <Link as={RouterLink} color="teal.500" to={isLogin ? '/register' : '/login'}>
        {isLogin ? 'Registrarme' : 'Ingresar'}
      </Link>
    </Box>
  </Flex>
)

AuthLayout.defaultProps = {
  isLogin: false
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  isLogin: PropTypes.bool
}

export default AuthLayout
