import request from '../utils/request'

export function login(body) {
  return request({
    url: '/authenticate',
    method: 'post',
    data: body
  })
}

export function getInfo(token) {
  return request({
    url: '/userInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getAllUser() {
  return request({
    url: '/user/all',
    method: 'get'
  })
}

export function deleteUser(name) {
  return request({
    url: '/user/delete',
    method: 'post',
    data: name
  })
}

export function addUser(body) {
  return request({
    url: '/user/register',
    method: 'post',
    data: body
  })
}
