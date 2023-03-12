type EnvConfig = {
  ENV_TYPE: 'test' | 'staging' | 'production'
  BASE_URL: string
}
// 正式环境配置
export default {
  ENV_TYPE: 'production',
  BASE_URL: '//api.xxx.com' // api请求地址
} as EnvConfig
