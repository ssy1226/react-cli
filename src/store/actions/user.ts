import { SET_USER_INFO } from '@/constants'

/* 用户数据 */
type AppUserInfo = {
  userId: string
  nickName: string
  sex: 0 | 1 | 2
}

export const setAppUserInfo = (userInfo: AppUserInfo) => {
  return {
    type: SET_USER_INFO,
    value: userInfo
  }
}