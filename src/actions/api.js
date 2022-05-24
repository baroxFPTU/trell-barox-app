import axios from 'axios'

export const getBoardFromDB = async (boardId) => {
  try {
    const response = await axios.get(`http://localhost:8080/v1/boards/${boardId}`)
    console.log(response)

    return response.data
  } catch (error) {
    console.log(error)
  }
}