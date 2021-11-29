const https = require('https')
//http和https调用方式一致
// 这里是利用https模块请求猫眼数据
https.get('https://m.maoyan.com/ajax/moreClassicList?sortId=1&showType=3&limit=10&offset=30&optimus_uuid=A5518FF0AFEC11EAAB158D7AB0D05BBBD74C9789D9F649898982E6542C7DD479&optimus_risk_level=71&optimus_code=10', res => {
  console.log(res)
})