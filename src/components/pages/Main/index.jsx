import {
  Flex,
  Text,
  Button,
  Box
} from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useAuth } from '../../context/AuthContext'
import useNotesService from '../../../hooks/useNotesService'
import Note from './components/Note'
import CreateNoteModalButton from './components/CreateNoteModalButton'

function Main() {
  const { logout } = useAuth()

  const notesService = useNotesService()

  const { data } = useQuery('notes', notesService.getAll)

  return (
    <Flex minHeight="100vh" as="section" backgroundColor="gray.200" flexDirection="column">
      <Flex py="4" px="8" bgColor="teal.500" justifyContent="space-between" alignItems="center">
        <Text fontSize="xl" fontWeight="bold" color="white">
          Notes App
        </Text>
        <Button onClick={logout} colorScheme="teal" invert>
          Cerrar sesión
        </Button>
      </Flex>
      <Box p="8">
        <Flex justifyContent="space-between" alignItems="center" mb="8">
          <Text fontSize="3xl" fontWeight="bold">Mis notas</Text>
          <CreateNoteModalButton />
        </Flex>
        {data && (
          <Box
            mx="auto"
            sx={{ columnCount: [1, 2, 3], columnGap: '4' }}
          >
            {data.map(note => (
              <Note key={note._id} note={note} />
            ))}
          </Box>
        )}
      </Box>
    </Flex>
  )
}

export default Main
