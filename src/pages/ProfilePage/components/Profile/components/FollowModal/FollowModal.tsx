import { Modal, UIbutton } from '@/src/components'
import { FC, useEffect, useRef, useState } from 'react'
import followModalProps, { followData } from './FolowModal.type'
import styles from './FollowModal.module.scss'
import followModalApi from './FollowModalApi'
import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";
import { CloseButton } from '@/src/components/BookShelf/Book/IconButtons'
import { EndpointsEnum, api, followApi } from '@/src/axios'
import { updateUser } from '@/src/redux'
import { useDispatch } from 'react-redux'
import FollowingItem from './FollowingItem/FollowingItem'



const FollowModal: FC<followModalProps> = ({isFollowModalOpen, setIsFollowModalOpen}) => {
  // const { user } = useAppSelector((state) => state.userSlice);
  const [followList, setFollowList] = useState<followData[] | []>([])
  const [loadingStates, setLoadingStates] = useState([{}]);
  const [fetching, setFetching] = useState(false);
  const [currentPage, setCurrentPaget] = useState(1)
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch()
 
  const followListViewport = useRef<HTMLUListElement | null>(null)

  const scrollHandler = () => {
    const scrollContainer = followListViewport.current;
    const nextPage = currentPage + 1;

    if (scrollContainer && !fetching && followList.length < total) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

    if (scrollHeight - (scrollTop + clientHeight) <= 20) {

      setFetching(true)
      setCurrentPaget(nextPage)
    
      getFollowList(nextPage).catch((error) => {
        console.log(error)
      }).finally(() => {
        setFetching(false);
      })
    }
    }
  };

  const getFollowList = async (page: number) => {
    const {data } = await followModalApi(page)
    setTotal(data.total)
      if (followList.length < data.total) {
        setFollowList([...followList,...data.myFollow])
      }
      
      return data.myFollow;
  }

 const unsubscribe = async (id: number) => {
    try {
      setLoadingStates((prevStates) => ({ ...prevStates, [id]: true }));
      await followApi(id);
      const { data } = await followModalApi(1);
      setFollowList(data.myFollow);
      const response = await api.get(EndpointsEnum.PROFILE);
      dispatch(updateUser(response.data))
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingStates((prevStates) => ({ ...prevStates, [id]: false }));
    }
  };

    useEffect(() => {
      if (isFollowModalOpen && total === 0) {
        getFollowList(1);
      }
    }, [isFollowModalOpen]);

  return (
    <Modal
      isOpen={isFollowModalOpen}
      setIsOpen={setIsFollowModalOpen}
      bodyClassName={styles["follow-modal__body"]}
      backdropClassName={styles["follow-modal__backdrop"]}
      transitionTimeOut={200}
      disableScroll
      portal
    >
      <div className={styles["follow-modal__wrapper"]}>
        <div className={styles["follow-modal__header"]}>
          <p className='font-bold'>Following</p>
          <CloseButton className={styles["follow-modal__close-button"]} setIsOpen={setIsFollowModalOpen}/>
        </div>
      <ul ref={followListViewport} onScroll={scrollHandler} className={styles["follow-list"]}>
      {followList.length > 0 ? followList.map((follow) => (
     <FollowingItem follow={follow} loadingStates={loadingStates} unsubscribe={unsubscribe}/>
      )) : [...Array(3)].map((_, i) =>  <li className={styles["follow-list__person"]} key={i}>
      <div className={styles["follow-list__info"]}>
         <img className={styles["follow-list__avatar"]} src={defaultAvatar} alt="" />
         <p>User Name</p>
      </div>
       <UIbutton  size='small' dataAutomation={'Unfollow-button'} >Unfollow</UIbutton>
     </li>)}
    </ul>
      </div>
    </Modal>
   
  )
}

export default FollowModal