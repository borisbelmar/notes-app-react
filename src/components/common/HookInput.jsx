/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { Button } from '@chakra-ui/button'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control'
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/input'
import { Textarea } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { memo, useState } from 'react'

const HookInput = ({
  name,
  register,
  label,
  type,
  placeholder,
  Icon,
  isTextArea,
  error
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleShowClick = () => setShowPassword(prev => !prev)

  return (
    <FormControl isInvalid={error}>
      {label && (
        <FormLabel fontSize="sm">
          {label}
        </FormLabel>
      )}
      <InputGroup>
        {Icon && (
          <InputLeftElement pointerEvents="none">
            <Icon color="gray.300" />
          </InputLeftElement>
        )}
        {isTextArea ? (
          <Textarea
            focusBorderColor="teal.500"
            type={type}
            placeholder={placeholder}
            maxH="32"
            {...register(name)}
          />
        ) : (
          <Input
            focusBorderColor="teal.500"
            type={type}
            placeholder={placeholder}
            {...register(name)}
          />
        )}
        {type === 'password' && (
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}

HookInput.defaultProps = {
  label: '',
  type: 'text',
  placeholder: '',
  Icon: undefined,
  error: undefined,
  isTextArea: false
}

HookInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  Icon: PropTypes.object,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  isTextArea: PropTypes.bool,
  error: PropTypes.object
}

export default memo(HookInput)
