import { FC, useEffect, useState } from "react";
import { GuestContext } from "./hooks/useGuestContext";
import { enemyData, guestProfileApi } from "../components";
import { IGuestProviderProps } from "./GuestProvider.type";
import { useNavigate, useParams } from "react-router-dom";
import { EndpointsEnum } from "@/src/axios";

import { useErrorBoundary } from "@/src/hooks";
import { PostRefType } from "@/src/types";
import { useProfileContext } from "@/src/context";


const GuestProvider: FC<IGuestProviderProps> = ({ children }) => {
  const { Id } = useParams();
  const [enemyData, setEnemyData] = useState<enemyData | undefined>();
  const [guestPostsList, setGuestPostsList] = useState<PostRefType[] | []>([])
  const [page, setPage] = useState(1)
  const [isGuestPostsLoaded, setIsGuestPostsLoaded] = useState(false)
  const [BooksCheker, setbooksCheker] = useState(false)
  const setErrorBoundary = useErrorBoundary();
  const navigate = useNavigate();
  const { userPostsApi } = useProfileContext()

  const fetchEnemyUserData = async () => {
    const response = await guestProfileApi(Id, navigate, setErrorBoundary);
    setEnemyData(response.data)
    if (response.data.userBooks.length > 0) {
      setbooksCheker(true)
    }
  };

  // const fetchGuestPosts = async (currentPage: number) => {
  //   const response = await api.get(`${EndpointsEnum.POSTS_BY_USER}${Id}?&page=${currentPage}&limit=50`);
  //   setGuestPostsList(response.data);
  // };

  useEffect(() => {
    userPostsApi(`${EndpointsEnum.POSTS_BY_USER}${Id}`, setGuestPostsList, page, setIsGuestPostsLoaded)
  }, [page]);

  useEffect(() => {
    fetchEnemyUserData();
  }, []);

  return (
    <GuestContext.Provider
      value={{ fetchEnemyUserData, guestPostsList, setGuestPostsList, enemyData, setEnemyData, BooksCheker, setPage, isGuestPostsLoaded }}>
      {children}
    </GuestContext.Provider>
  );
};

export default GuestProvider;