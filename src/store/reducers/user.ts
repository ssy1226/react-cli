import { SET_USER_INFO } from '@/constants/index'

/* 用户数据 */
type AppUserInfo = {
  userId: string
  nickName: string
  sex: 0 | 1 | 2
}
export const INITIAL_STATE: AppUserInfo = {
  userId: '',
  nickName: '',
  sex: 0
}

export default function user(state = INITIAL_STATE, action: { type: string; value: any }) {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        ...action.value
      }
    default:
      return state
  }
}
