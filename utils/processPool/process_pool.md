### process_pool 使用指南
```javascript
const ProcessPool = require('./process_pool'); //导入
// arr 是对象数组，每个对象
const Pool = new ProcessPool(arr, 6);
```

### arr格式
```javascript
arr = [{
    rule:'',  // 在rules目录下的脚本位置(必传)
    url:'',   // 爬取地址(必传)
    ...       // 额外参数，自定义在脚本中需要用到的参数      
}]
```
