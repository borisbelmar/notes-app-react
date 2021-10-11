import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const getAuthService = () => {
  const client = axios.create({ baseURL: API_URL })

  const login = async loginPayload => {
    const response = await client.post('/v1/auth/login', loginPayload)
    return response.data
  }

  const register = async registerPayload => {
    const response = await client.post('/v1/auth/register', registerPayload)
    return response.data
  }

  return {
    login,
    register
  }
}

export default getAuthService
