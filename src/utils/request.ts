import axios from 'axios'
import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: '/',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      //   config.headers.token = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    return response.data
  },
  async error => {
    console.error('err' + error) // for debug
    if (error.response && error.response.status === 401) {
      console.log('request Err 401.')
      //   if (window.loginExpiredTip) {
      //     window.loginExpiredTip.close()
      //     window.loginExpiredTip = null
      //   }
      //   window.loginExpiredTip = Notification({
      //     type: 'warning',
      //     title: '提示',
      //     message: '身份令牌已失效，请重新登录'
      //   })
      //   store.dispatch('user/resetToken').then(() => {
      //     location.reload()
      //   })
    } else {
      console.log('request Err.')
      //   Notification({
      //     type: 'error',
      //     title: '请求出错',
      //     message: error.response.data && error.response.data.message ? error.response.data.message : error.message
      //   })
    }
    return Promise.reject(error)
  }
)

export default service
