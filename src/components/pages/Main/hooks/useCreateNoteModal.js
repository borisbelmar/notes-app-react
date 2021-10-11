import { useDisclosure } from '@chakra-ui/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import * as yup from 'yup'
import useNotesService from '../../../../hooks/useNotesService'

const schema = yup.object({
  title: yup.string()
    .min(3, 'Demasiado corto')
    .max(30, 'Demsiado largo')
    .required('Campo requerido'),
  body: yup.string()
    .max(300, 'Demasiado largo'),
  color: yup.string()
    .matches(/^#([0-9A-F]{3}){1,2}$/i, 'Debe ser un color válido'),
})

export default () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    defaultValues: {
      title: '',
      body: '',
      color: '#FEF3C7'
    },
    resolver: yupResolver(schema)
  })
  const { create } = useNotesService()
  const { isLoading, mutateAsync } = useMutation(create, {
    onSuccess: () => {
      queryClient.refetchQueries(['notes'])
      onClose()
    }
  })

  const onSubmit = data => {
    mutateAsync(data)
  }

  const setColor = useCallback(color => setValue('color', color), [setValue])

  return {
    isOpen,
    onOpen,
    onClose,
    isLoading,
    register,
    errors,
    setColor,
    colorWatch: watch('color'),
    handleSubmit: handleSubmit(onSubmit)
  }
}
