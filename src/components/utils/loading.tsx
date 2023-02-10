import { SvgLoading } from '@assets/svg'
import React, { FC } from 'react'
import css from '@styles/utils/loading.module.css'

type settingsType = {
  size?: number
}

const Loading: FC<settingsType> = ({ size }) => {
  return (
    <div className={`${css.lds_ellipsis}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Loading
