import { Modal, UIbutton } from '@/src/components'
import { FC, useEffect, useRef, useState } from 'react'
import styles from './FollowersModal.module.scss'
import { followersData, followersModalProps } from './FollowersModal.type'
import { CloseButton } from '@/src/components/BookShelf/Book/IconButtons'
import followersModalApi from './FollowersModalApi'
import { useDispatch } from 'react-redux'
import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";
import { EndpointsEnum, api, followApi } from '@/src/axios'
import { updateUser, useAppSelector } from '@/src/redux'
import FollowerItem from './FollowerItem/FollowerItem'

const FollowersModal: FC<followersModalProps> = ({ isFollowersModalOpen, setIsFollowersModalOpen }) => {
  const { user } = useAppSelector((state) => state.userSlice);
  const [followersList, setFollowersList] = useState<followersData[] | []>([])
  const [loadingStates, setLoadingStates] = useState([{}]);
  const [fetching, setFetching] = useState(false);
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch()

  console.log(user.myFollowersCount)

  const followListViewport = useRef<HTMLUListElement | null>(null)

  const scrollHandler = () => {
    const scrollContainer = followListViewport.current;
    const currentPage = 1;
    const nextPage = currentPage + 1;

    if (scrollContainer && !fetching && followersList.length < total) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

      if (scrollHeight - (scrollTop + clientHeight) <= 20) {

        setFetching(true)

        getFollowList(nextPage).catch((error) => {
          console.log(error)
        }).finally(() => {
          setFetching(false);
        })
      }
    }
  };



  // const followingList = async () => {
  //   const { data } = await followModalApi(1);
  //   console.log("data",data)
  //   setEnemyDatafollowersIncludeId(
  //     data.myFollow.some((item: {id: {toString: () => string | undefined}}) => item.id.toString() === Id)
  //   );
  // };

  const getFollowList = async (page: number) => {
    const { data } = await followersModalApi(page)
    console.log(data.myFollowers)
    setTotal(data.total)
    setFollowersList([...followersList, ...data.myFollowers])
    return data.myFollowers;
  }

  const unsubscribe = async (id: number) => {
    try {
      setLoadingStates((prevStates) => ({ ...prevStates, [id]: true }));
      await followApi(id);
      const { data } = await followersModalApi(1);
      setFollowersList(data.myFollowers);
      const response = await api.get(EndpointsEnum.PROFILE);
      dispatch(updateUser(response.data))
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingStates((prevStates) => ({ ...prevStates, [id]: false }));
    }
  };

  useEffect(() => {
    if (isFollowersModalOpen && total === 0) {
      getFollowList(1);
      // followingList()
    }
  }, [isFollowersModalOpen]);
  return (
    <Modal
      isOpen={isFollowersModalOpen}
      setIsOpen={setIsFollowersModalOpen}
      bodyClassName={styles["follow-modal__body"]}
      backdropClassName={styles["follow-modal__backdrop"]}
      transitionTimeOut={200}
      disableScroll
      portal  >
      <div className={styles["follow-modal__wrapper"]}>
        <div className={styles["follow-modal__header"]}>
          <p className='font-bold'>Followers</p>
          <CloseButton className={styles["follow-modal__close-button"]} setIsOpen={setIsFollowersModalOpen} />
        </div>
        <ul ref={followListViewport} onScroll={scrollHandler} className={styles["follow-list"]}>

          {followersList.length > 0 ? followersList.map((follower) => (
            <FollowerItem follower={follower} loadingStates={loadingStates} unsubscribe={unsubscribe} />
          ))
            :
            [...Array(user.myFollowersCount)].map((_, i) => (
              <li className={styles["follow-list__person"]} key={i}>
                <div className={styles["follow-list__info"]}>
                  <img className={styles["follow-list__avatar"]} src={defaultAvatar} alt="" />
                  <p>User Name</p>
                </div>
                <UIbutton size='small' dataAutomation={'Unfollow-button'} >Unfollow</UIbutton>
              </li>))
          }
        </ul>
      </div>
    </Modal>
  )
}

export default FollowersModal