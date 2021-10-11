import { useToast } from '@chakra-ui/toast'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import getAuthService from '../../../../services/getAuthService'

const schema = yup.object({
  firstName: yup.string()
    .min(3, 'Demasiado corto')
    .max(30, 'Demsiado largo')
    .required('Campo requerido'),
  lastName: yup.string()
    .min(3, 'Demasiado corto')
    .max(30, 'Demasiado largo')
    .required('Campo requerido'),
  email: yup.string()
    .email('Debe ser un email')
    .required('Campo requerido'),
  password: yup.string()
    .min(6, 'Debe tener mínimo')
    .max(16, 'Demasiado corto')
    .required('Campo requerido'),
  rePassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
}).required()

const useRegisterForm = () => {
  const authService = getAuthService()
  const toast = useToast()
  const { push } = useHistory()
  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rePassword: ''
    },
    resolver: yupResolver(schema)
  })

  const { mutateAsync, isLoading } = useMutation(data => authService.register(data), {
    mutationKey: 'register',
    onError: e => {
      toast({
        title: 'Error al registrarte',
        description: e?.response?.status === 409 ? 'El usuario ya existe' : 'Error desconocido, intente más tarde',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
    onSuccess: data => {
      toast({
        title: 'Cuenta creada con éxito',
        description: `La cuenta ${data.email} ha sido creada`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      push('/login')
    }
  })

  const onSubmit = data => {
    mutateAsync(data)
  }

  return {
    register,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    isLoading
  }
}

export default useRegisterForm
