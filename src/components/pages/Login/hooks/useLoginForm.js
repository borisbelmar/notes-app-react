import { useToast } from '@chakra-ui/toast'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import getAuthService from '../../../../services/getAuthService'
import { useAuth } from '../../../context/AuthContext'

const useLoginForm = () => {
  const { setToken } = useAuth()
  const authService = getAuthService()
  const toast = useToast()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { mutateAsync, isLoading } = useMutation(data => authService.login(data), {
    mutationKey: 'login',
    onError: e => {
      toast({
        title: 'Error al iniciar sesión',
        description: e?.response?.status === 401
          ? 'Credenciales inválidas'
          : 'Error desconocido, intente más tarde',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
    onSuccess: data => {
      setToken(data.accessToken)
    }
  })

  const onSubmit = data => {
    mutateAsync(data)
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    isLoading
  }
}

export default useLoginForm
