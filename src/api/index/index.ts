import request from '../request'

interface InfoListItem {
  name: string
  desc: string
}

class IndexApi {
  static getList = (params: { type: number }): Promise<InfoListItem[]> =>
    request('/api/getInfo', 'GET', params, true)

  static updateInfo = (params: {
    name: string
    phone: string
    password: string
  }): Promise<boolean> => request('/api/updateInfo', 'POST', params, true)

  static saveLogin = (params:any): Promise<any[]> => request('/api/v1/login', 'POST', params, true)
  static saveRegister = (params:any): Promise<any[]> => request('/api/v1/register', 'POST', params, true)
  static getDeptList = (): Promise<any[]> => request('/api/v1/user_dept/list', 'GET', {}, true)
  static getYearlyStatus = (): Promise<any[]> => request('/api/v1/yearly_report/status', 'GET', {}, true)
  static getDailyStatus = (): Promise<any[]> => request('/api/v1/daily_report/status', 'GET', {}, true)
  static getYearlyList = (): Promise<any[]> => request('/api/v1/mobile/yearly_report/list', 'GET', {}, true)
  static getDailyList = (): Promise<any[]> => request('/api/v1/mobile/daily_report/list', 'GET', {}, true)
  static saveYearlyReport = (params:any): Promise<any[]> => request('/api/v1/yearly_report/save', 'POST', params, true)
  static saveDailyReport = (params:any): Promise<any[]> => request('/api/v1/daily_report/save', 'POST', params, true)
  
}

export default IndexApi
