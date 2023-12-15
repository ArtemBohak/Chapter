import { api } from "@/src/axios"


export const favoriteBooksApi = async ( bookId: number) => {
    const response = await api.patch(`/users/toggle-favorite-status/${bookId}`)
    return response;
}