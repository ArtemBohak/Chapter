import {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
} from "react";

type bookShelfState = {
  books?: any;
  setBooks?: Dispatch<React.SetStateAction<any>> | undefined;
  onEdit: boolean;
  setOnEdit?: Dispatch<React.SetStateAction<boolean>>;
};
type bookShelfContext = {
  children?: ReactNode;
} & Partial<bookShelfState>;

export const initialbookShelfState: bookShelfState = {
  books: [],
  onEdit: false,
};

export const bookShelfContext = createContext<bookShelfContext>(
  initialbookShelfState
);

export function BookShelfProvider({ children, ...props }: bookShelfContext) {
  const [books, setBooks] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  return (
    <bookShelfContext.Provider value={{ ...props, books, setBooks }}>
      {children}
    </bookShelfContext.Provider>
  );
}

export function useBookShelfContext() {
  const context = useContext(bookShelfContext);
  if (!context) {
    throw new Error(
      "useNavigationToggler must be used within a NavigationTogglerProvider"
    );
  }
  return context;
}
