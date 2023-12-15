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
    bookStatus: number
}

export interface IBook {
    // map(arg0: (book: any, i: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    id: number;
    nameOfBook: string;
    author: string;
    annotation: string;
    book_statusId: number;
    favorite_book_status: boolean;
    imagePath: string;

}