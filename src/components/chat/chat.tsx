// import { Profile } from "@components/perfil";
import type { FC } from 'react'
import { Wrapper } from './navbar/wrapper'
// import { FeedWrapper } from './feed/feedWrapper'
import { useAuthorization } from '@hooks/index'
import { Navigate, Outlet } from 'react-router-dom'
import Loading from '@components/utils/loading'
// import ModalProvider from "@context/ModalContext";

export const Chat: FC = () => {
  const { check } = useAuthorization()
  console.log('🚀 ~ file: chat.tsx:12 ~ check', check)
  return (
    <>
      {check === false ? (
        <Navigate to={'/login'} />
      ) : check === undefined ? (
        <Loading />
      ) : (
        <div className='flex w-full h-screen  overflow-hidden'>
          {/* <ModalProvider> */}
          <Wrapper />
          {/* <FeedWrapper/> */}
          {/* <Profile /> */}
          {/* </ModalProvider> */}
          <Outlet />
        </div>
      )}
    </>
  )
}
