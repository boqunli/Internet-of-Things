import request from '../utils/request'

export function getDayData(date) {
  return request({
    url: '/sleep/day',
    method: 'get',
    params: { date: date }
  })
}

export function getStatistic(s, e) {
  return request({
    url: '/sleep/stat',
    method: 'get',
    params: { s: s, e: e }
  })
}

export function getProtocols() {
  return request({
    url: '/sleep/protocols',
    method: 'get',
  })
}
