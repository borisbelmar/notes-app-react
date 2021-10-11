import {
  Button,
  Stack,
  chakra
} from '@chakra-ui/react'
import { FaUserAlt, FaLock, FaEnvelope } from 'react-icons/fa'
import useRegisterForm from './hooks/useRegisterForm'
import AuthLayout from '../../layout/AuthLayout'
import HookInput from '../../common/HookInput'

const CFaUserAlt = chakra(FaUserAlt)
const CFaEnvelope = chakra(FaEnvelope)
const CFaLock = chakra(FaLock)

function Register() {
  const {
    register,
    handleSubmit,
    errors,
    isLoading
  } = useRegisterForm()

  return (
    <AuthLayout>
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
          name="firstName"
          label="Nombre"
          placeholder="Cosme"
          Icon={CFaUserAlt}
          error={errors.firstName}
        />
        <HookInput
          register={register}
          name="lastName"
          label="Apellido"
          placeholder="Fulanito"
          Icon={CFaUserAlt}
          error={errors.lastName}
        />
        <HookInput
          register={register}
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
          Icon={CFaEnvelope}
          error={errors.email}
        />
        <HookInput
          register={register}
          name="password"
          label="Contraseña"
          placeholder="Contraseña"
          type="password"
          Icon={CFaLock}
          error={errors.password}
        />
        <HookInput
          register={register}
          name="rePassword"
          label="Repetir Contraseña"
          placeholder="Contraseña"
          type="password"
          Icon={CFaLock}
          error={errors.rePassword}
        />
        <Button
          type="submit"
          variant="solid"
          rounded="md"
          colorScheme="teal"
          width="full"
          disabled={isLoading || !!Object.keys(errors)?.length}
        >
          Registrarme
        </Button>
      </Stack>
    </AuthLayout>
  )
}

export default Register
