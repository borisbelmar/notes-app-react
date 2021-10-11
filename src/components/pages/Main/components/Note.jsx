import PropTypes from 'prop-types'
import { Box, Text, chakra } from '@chakra-ui/react'
import { useMutation, useQueryClient } from 'react-query'
import { es } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'
import chroma from 'chroma-js'
import { FaTrash } from 'react-icons/fa'
import useNotesService from '../../../../hooks/useNotesService'

const CFaTrash = chakra(FaTrash)

const Note = ({ note }) => {
  const { deleteById } = useNotesService()

  const queryClient = useQueryClient()

  const { mutateAsync: deleteNote, isLoading } = useMutation(() => deleteById(note._id), {
    mutationKey: note._id,
    onSuccess: () => {
      queryClient.refetchQueries(['notes'])
    }
  })

  return (
    <Box
      rounded="md"
      px="3"
      py="4"
      backgroundColor={note.color}
      opacity={isLoading ? 0.5 : 1}
      boxShadow="md"
      mb="4"
      d="inline-block"
      w="100%"
      position="relative"
      color={chroma.contrast(note.color, '#333333') > 4.5 ? 'gray.800' : 'white'}
    >
      <Text
        fontSize="xs"
        fontStyle="italic"
      >
        Hace {formatDistanceToNow(new Date(note.createdAt), { locale: es })}
      </Text>
      <Text fontWeight="bold">
        {note.title}
      </Text>
      <Text fontSize="sm">
        {note.body}
      </Text>
      <Box
        top="4"
        right="4"
        position="absolute"
      >
        <CFaTrash
          fontSize="sm"
          _hover={{ opacity: 1 }}
          _active={{ scale: 1.1 }}
          scale={1}
          onClick={deleteNote}
          cursor="pointer"
          transition="150ms"
          opacity="0.5"
        />
      </Box>
    </Box>
  )
}

Note.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string,
    color: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    createdAt: PropTypes.string
  }).isRequired
}

export default Note
