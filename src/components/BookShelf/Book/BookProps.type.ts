export type BooksProps = {
    id: number,
    className?: string,
    imageClassName?: string,
    titleClassName?: string,
    favoriteButton?: boolean,
    deleteButton?: boolean,
    nameOfBook?: string,
    isFavorite: boolean,
    annotation: string,
    author: string,
    bookNameLength: number,
    bookStatus: number,
    bookImageUrl: string,
}

export interface IBook {
    id: number;
    nameOfBook: string;
    author: string;
    annotation: string;
    book_statusId: number;
    favorite_book_status: boolean;
    imagePath: string;

}