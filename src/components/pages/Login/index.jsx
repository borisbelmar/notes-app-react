import {
  Button,
  Stack,
  chakra
} from '@chakra-ui/react'
import { FaLock, FaEnvelope } from 'react-icons/fa'
import useLoginForm from './hooks/useLoginForm'
import AuthLayout from '../../layout/AuthLayout'
import HookInput from '../../common/HookInput'

const CFaEnvelope = chakra(FaEnvelope)
const CFaLock = chakra(FaLock)

function Login() {
  const { register, handleSubmit, isLoading } = useLoginForm()

  return (
    <AuthLayout isLogin>
      <Stack
        as="form"
        spacing={4}
        p="1rem"
        rounded="md"
        backgroundColor="whiteAlpha.900"
        boxShadow="md"
        onSubmit={handleSubmit}
      >
        <HookInput
          register={register}
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
          Icon={CFaEnvelope}
        />
        <HookInput
          register={register}
          name="password"
          label="Contraseña"
          placeholder="Contraseña"
          type="password"
          Icon={CFaLock}
        />
        <Button
          type="submit"
          variant="solid"
          rounded="md"
          colorScheme="teal"
          width="full"
          disabled={isLoading}
        >
          Ingresar
        </Button>
      </Stack>
    </AuthLayout>
  )
}

export default Login
