import { api } from "@/src/axios"


export const favoriteBooksApiPost = async (userId: number, bookId: number) => {
    await api.post(`/users/${userId}/AddToFavoriteBook/${bookId}`)
  
}
export const favoriteBooksApiDelete = async ( bookId: number) => {
    await api.delete(`/users/${bookId}/FavoriteBook`);
}