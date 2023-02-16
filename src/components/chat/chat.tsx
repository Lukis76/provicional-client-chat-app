// import { Profile } from "@components/perfil";
import type { FC } from 'react'
import { LeftBar } from './navbar/leftBar'
import { FeedWrapper } from './conversation/feedWrapper'
import { useAuthorization } from '@hooks/index'
import { Navigate, Outlet } from 'react-router-dom'
import Loading from '@components/utils/loading'
// import ModalProvider from "@context/ModalContext";
import css from '@styles/chat/chat.module.css'



export const Chat: FC = () => {
  const { check } = useAuthorization()
  console.log('🚀 ~ file: chat.tsx:12 ~ check', check)
  return (
    <>
      {check === false ? (
        <Navigate to={'/login'} />
      ) : check === undefined ? (
        <div className={`${css.center_loading}`}>

        <Loading />
        </div>
      ) : (
        <main
          className={`${css.main}`}
        // className='flex w-full h-screen  overflow-hidden'
        >
          {/* <ModalProvider> */}
          <LeftBar />
          {/* <FeedWrapper/> */}
          <Outlet />
          {/* <Profile /> */}
          {/* </ModalProvider> */}
        </main>
      )}
    </>
  )
}
