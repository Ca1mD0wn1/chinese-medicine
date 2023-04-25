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

export function deleteUser(params: { username: string }) {
  return request({
    url: 'deleteUser',
    method: 'POST',
    data: params
  })
}

export function register(params: { username: string, password: string, nickname: string, level: string }) {
  return request({
    url: 'register',
    method: 'POST',
    data: params
  })
}
export function updateUser(params: { username: string, password: string, nickname: string, level: string }){
  return request({
    url: 'updateUser',
    method: 'POST',
    data: params
  })
}