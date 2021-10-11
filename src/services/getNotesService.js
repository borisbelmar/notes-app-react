import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const getNotesService = token => {
  const client = axios.create({ baseURL: API_URL, headers: { Authorization: `Bearer ${token}` } })

  const getAll = async () => {
    const response = await client.get('/v1/notes/?limit=100')
    return response.data
  }

  const create = async note => {
    const response = await client.post('/v1/notes/', note)
    return response.data
  }

  const deleteById = async id => {
    const response = await client.delete(`/v1/notes/${id}`)
    return response.data
  }

  return {
    getAll,
    create,
    deleteById
  }
}

export default getNotesService
