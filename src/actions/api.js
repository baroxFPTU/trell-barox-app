import axios from 'axios'
import { API_URL } from 'utils/constants'

export const BoardAPIs = {
  getAll: async (boardId) => {
    const response = await axios.get(`${API_URL}/v1/boards/${boardId}`)
    return response.data
  }
}

export const ColumnAPIs = {
  createNew: async (newColumn) => {
    const response = await axios.post(`${API_URL}/v1/columns`, newColumn)
    return response.data
  },
  update: async (columnId, newColumn) => {
    const response = await axios.put(`${API_URL}/v1/columns/${columnId}`, newColumn)
    return response.data
  }
}

export const CardAPIs = {
  createNew: async (newCard) => {
    const response = await axios.post(`${API_URL}/v1/cards`, newCard)
    return response.data
  }
}