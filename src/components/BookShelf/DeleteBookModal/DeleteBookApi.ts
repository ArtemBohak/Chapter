import { api } from "@/src/axios"


export const deleteBookApi = async ( bookId: number) => {
    const response = await api.delete(`/users/${bookId}`)
    return response;
}

export const deleteMultipleBooksApi = async (bookIds: number[]) => {
    const deletionResponses = [];
  
    for (const bookId of bookIds) {
      const response = await deleteBookApi(bookId); 
      deletionResponses.push(response);
    }
  
    return deletionResponses;
  };