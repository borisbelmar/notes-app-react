import {
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton
} from '@chakra-ui/react'
import { SliderPicker } from 'react-color'
import HookInput from '../../../common/HookInput'
import useCreateNoteModal from '../hooks/useCreateNoteModal'

const CreateNoteModalButton = () => {
  const {
    isOpen,
    onOpen,
    onClose,
    register,
    handleSubmit,
    errors,
    isLoading,
    colorWatch,
    setColor
  } = useCreateNoteModal()

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Nueva nota
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nueva nota</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              as="form"
              spacing={4}
              pb="4"
              rounded="md"
              onSubmit={handleSubmit}
            >
              <HookInput
                register={register}
                name="title"
                label="Título"
                placeholder="Mi nota"
                error={errors.title}
              />
              <HookInput
                register={register}
                name="body"
                label="Cuerpo"
                isTextArea
                placeholder="El contenido de la nota..."
                error={errors.body}
              />
              <SliderPicker color={colorWatch} onChangeComplete={color => setColor(color.hex)} />
              <Button
                type="submit"
                variant="solid"
                rounded="md"
                colorScheme="teal"
                width="full"
                disabled={isLoading || Object.keys(errors).length}
              >
                Crear nota
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateNoteModalButton
