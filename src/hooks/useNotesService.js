import { useMemo } from 'react'
import { useAuth } from '../components/context/AuthContext'
import getNotesService from '../services/getNotesService'

export default () => {
  const { session } = useAuth()
  return useMemo(() => getNotesService(session?.token), [session?.token])
}
