import { FC, useEffect, useState } from "react";
import BooksPageHeader from "../Components/BooksPageHeader/BooksPageHeader";
import BooksList from "../Components/BooksList/BooksList";
import { useNavigate, useParams } from "react-router-dom";
import guestProfileApi from "../../GuestProfilePage/components/GuestProfileApi/guestProfileApi";
import styles from "../BookPage.module.scss";
import { links } from "@/src/types";

const GuestBooksPage: FC = () => {
  const [guestBooks, setGuestBooks] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchUserBooks = async () => {
    try {
      const response = await guestProfileApi(id);
      if (response.statusCode === 404) return navigate(links.HOME);

      setGuestBooks(response.data.userBooks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserBooks();
  }, []);

  return (
    <div className={styles["book-page__wrapper"]}>
      <BooksPageHeader userType="guest" id={id} />
      <BooksList guestBooks={guestBooks} />
    </div>
  );
};

export default GuestBooksPage;
