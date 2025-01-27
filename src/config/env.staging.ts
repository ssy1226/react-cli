type EnvConfig = {
  ENV_TYPE: 'test' | 'staging' | 'production'
  BASE_URL: string
}
// 预发布环境配置
export default {
  ENV_TYPE: 'staging',
  BASE_URL: '//stage.xxx.com' // api请求地址
} as EnvConfig
