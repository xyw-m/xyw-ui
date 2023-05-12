import { request } from 'sinotruk-request'

export function getTreeData(params) {
  return request.$get({
    url: window.$env.VUE_APP_COMMON + '/sys/sysUsers/orgTree',
    data: params
  })
}

export function getComplexStaffData(params) {
  return request.$get({
    url: window.$env.VUE_APP_COMMON + '/sys/sysUsers/queryUserListByOrg',
    data: params
  })
}

export function getSingleStaffData(params) {
  return request.$get({
    url: window.$env.VUE_APP_COMMON + '/sys/sysUsers/simpleUserSelect',
    data: params
  })
}
