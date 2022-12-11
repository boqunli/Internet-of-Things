import request from '../utils/request'

export function getAllDevicesPageable(p, s) {
  return request({
    url: '/device/all',
    method: 'get',
    params: { p:p, s:s }
  })
}

export function getAllDevices() {
  return request({
    url: '/device/all',
    method: 'get'
  })
}

export function getProtocols() {
  return request({
    url: '/device/protocols',
    method: 'get',
  })
}

export function newDevice(body) {
  return request({
    url: '/device/register',
    method: 'post',
    data: body
  })
}

export function deleteDevice(id) {
  return request({
    url: '/device/delete',
    method: 'post',
    data: id
  })
}

export function getAllDeviceData(id) {
  return request({
    url: '/device/allData',
    method: 'get',
    params: {
      deviceId: id
    }
  })
}
