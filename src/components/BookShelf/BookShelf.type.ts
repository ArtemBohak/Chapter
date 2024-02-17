import { IBook } from "./Book/BookProps.type"

export type BookShelfProps = {
    enemyData?: {
        userBooks: Array<IBook> | []
    }
    Id?: string | undefined;
} 