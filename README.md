# cdFe
潮点视频前端银行卡信息查询


## Main files
关键文件目录
```text
dist/
├── cd-fe-bankcard.js         (UMD, default)
├── cd-fe-bankcard.min.js     (UMD, compressed)
├── cd-fe-bankcard.esm.js     (ECMAScript Module)
├── cd-fe-bankcard.esm.min.js (ECMAScript Module, compressed)
└── cd-fe-bankcard.d.ts       (TypeScript Declaration File)
```

## Getting started
开始使用

### Installation
安装方式

```shell
npm install cd-fe-bankcard
```

In browser:

```html
<script src="/path/to/cd-fe-bankcard.min.js"></script>
```

### Usage
使用方法 待完善
#### Syntax

```js
cdFeBankcard.getBankBin(/*此处替换您的测试银行卡号*/).then(res => {
  console.log(res) // { bankCode: "CEB" bankName: "中国光大银行" cardType: "CC" cardTypeName: "信用卡" }
}).catch(e => {
  console.log(e)
})
```

## Browser support
浏览器兼容

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Edge (latest)
- Internet Explorer ie9+

代码使用了 *Promise* / *Arrow Function* ,请确保您的环境兼容

数据 依赖 `src/bankcardList.ts`, 如有需要可以在 issues 一起补充

## License

[MIT](https://opensource.org/licenses/MIT) © [Apple Sun](http://awebman.com/)
