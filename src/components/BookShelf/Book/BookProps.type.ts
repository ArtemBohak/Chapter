export type BooksProps = {
    id: number,
    className?: string,
    favoriteButton?: boolean,
    deleteButton?: boolean,
    nameOfBook?: string,
    isFavorite: boolean,
}

export interface IBook {
    id: number,
    nameOfBook: string,
    author: string, 
    annotation: string,
    book_statusId: number,
    favorite_book_status: boolean

}