import axios from 'axios'
import { API_URL } from 'utils/constants'

export const BoardAPIs = {
  getAll: async (boardId) => {
    const response = await axios.get(`${API_URL}/v1/boards/${boardId}`)
    console.log(response);
    return response.data
  },
  update: async (boardId, newBoard) => {
    const response = await axios.put(`${API_URL}/v1/boards/${boardId}`, newBoard)
    return response.data
  }
}

export const ColumnAPIs = {
  createNew: async (newColumn) => {
    const response = await axios.post(`${API_URL}/v1/columns`, newColumn)
    return response.data
  },
  update: async (columnId, newColumn) => {
    try {
      const response = await axios.put(`${API_URL}/v1/columns/${columnId}`, newColumn)
      return response.data
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export const CardAPIs = {
  createNew: async (newCard) => {
    const response = await axios.post(`${API_URL}/v1/cards`, newCard)
    return response.data
  },
  update: async (cardId, newCard) => {
    try {
      const response = await axios.put(`${API_URL}/v1/cards/${cardId}`, newCard)
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }
}