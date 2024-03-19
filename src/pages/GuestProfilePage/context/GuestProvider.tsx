import { FC, useEffect, useState } from 'react'
import { GuestContext } from './hooks/useGuestContext'
import { enemyData, guestProfileApi } from '../components';
import { IGuestProviderProps } from './GuestProvider.type';
import { useParams } from 'react-router-dom';
import { EndpointsEnum, api } from '@/src/axios';

const GuestProvider: FC<IGuestProviderProps> = ({ children }) => {
  const { Id } = useParams()
  const [enemyData, setEnemyData] = useState<enemyData>();
  const [guestPostsList, setGuestPostsList] = useState([])
  const [BooksCheker, setbooksCheker] = useState(false)

  const fetchEnemyUserData = async () => {
    const response = await guestProfileApi(Id);
    setEnemyData(response.data)
    if (response.data.userBooks.length > 0) {
      setbooksCheker(true)
    }
  };

  const fetchGuestPosts = async () => {
    const response = await api.get(`${EndpointsEnum.POSTS_BY_USER}${Id}`)
    setGuestPostsList(response.data)
  }

  useEffect(() => {
    fetchEnemyUserData()
    fetchGuestPosts()
  }, [])

  return (
    <GuestContext.Provider
      value={{ fetchEnemyUserData, guestPostsList, enemyData, setEnemyData, BooksCheker }}>
      {children}
    </GuestContext.Provider>

  )
}

export default GuestProvider