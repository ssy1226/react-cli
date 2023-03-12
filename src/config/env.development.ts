type EnvConfig = {
  ENV_TYPE: 'test' | 'staging' | 'production'
  BASE_URL: string
}
// 测试环境配置
export default {
  ENV_TYPE: 'test',
  // BASE_URL: window.location.origin // api请求地址
  BASE_URL: window.location.origin // api请求地址
} as EnvConfig
