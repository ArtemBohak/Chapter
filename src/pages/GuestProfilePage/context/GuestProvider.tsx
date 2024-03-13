import { FC, useEffect, useState } from "react";
import { GuestContext } from "./hooks/useGuestContext";
import { enemyData, guestProfileApi } from "../components";
import { IGuestProviderProps } from "./GuestProvider.type";
import { useNavigate, useParams } from "react-router-dom";
import { EndpointsEnum, api } from "@/src/axios";
import { links } from "@/src/types";

const GuestProvider: FC<IGuestProviderProps> = ({ children }) => {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [enemyData, setEnemyData] = useState<enemyData>();
  const [guestPostsList, setGuestPostsList] = useState([]);

  const fetchEnemyUserData = async () => {
    const response = await guestProfileApi(Id);
    if (response.statusCode === 404) return navigate(links.HOME);

    setEnemyData(response.data);
  };

  const fetchGuestPosts = async () => {
    const response = await api.get(`${EndpointsEnum.POSTS_BY_USER}${Id}`);
    setGuestPostsList(response.data);
  };

  useEffect(() => {
    fetchEnemyUserData();
    fetchGuestPosts();
  }, []);

  return (
    <GuestContext.Provider
      value={{ fetchEnemyUserData, guestPostsList, enemyData }}
    >
      {children}
    </GuestContext.Provider>
  );
};

export default GuestProvider;
