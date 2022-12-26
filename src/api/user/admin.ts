import request from '@/utils/request'
export interface IAdminParams {
  adminname: string
  password: string
}

export function adminLoginFn(params: IAdminParams) {
  return request({
    url: 'login',
    method: 'POST',
    data: params
  })
}

export function getUserList() {
  return request({
    url: 'selectUserList',
    method: 'POST',
  })
}
export function getAdminList() {
  return request({
    url: 'selectAdminList',
    method: 'POST',
  })
}
