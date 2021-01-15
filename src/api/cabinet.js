import request from '@/utils/request'

export function getCabinets() {
  return request({
    url: 'api/cabinets/',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'api/cabinets/',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api/cabinets/' + id + '/',
    method: 'delete'
  })
}

export function retrieve(id) {
  return request({
    url: 'api/cabinets/' + id + '/',
    method: 'get'
  })
}

export function edit(id, data) {
  return request({
    url: 'api/cabinets/' + id + '/',
    method: 'put',
    data
  })
}

export function save(id, data) {
  return request({
    url: 'api/cabinets/' + id + '/',
    method: 'patch',
    data
  })
}

