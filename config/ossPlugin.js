const Oss = require('ali-oss')
const fs = require('fs')

class OssPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('done', (compilation, callback) => {
      fs.readdir('build/images', (err, files) => {
        if (err) {
          console.error(err)
        } else {
          uploadImg(files)
        }
      })
    })
  }
}

module.exports = OssPlugin

// 'http://fangyuantupian.oss-cn-shenzhen.aliyuncs.com/common/agent_home_logo.png'

async function uploadImg(files) {
  let OSS = require('ali-oss')

  let client = new OSS({
    region: 'oss-cn-shenzhen', // cdn节点位置
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '', // oss bucket目录
  });

  for (let i = 0, len = files.length; i < len; i++) {
    await client.put(`common/${files[i]}`, `build/images/${files[i]}`);
  }

  for (let i = 0, len = files.length; i < len; i++) {
    fs.unlinkSync(`dist/common/${files[i]}`)
  }

  console.log('\x1B[44m%s\x1B[49m', 'upload img fished>>>>>>>>>>>>>>>')
}
