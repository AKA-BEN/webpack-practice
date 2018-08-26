import tpl from '../tpl/b.ejs'

let app = document.getElementById('app');
let count = 3
let interval = setInterval(() => {
  if (count === 0) {
    app.innerHTML = tpl({
      title: 'ejs 模板列表',
      arr: ['aape', 'nike', 'vans', 'converse']
    })
    clearInterval(interval)
  } else {
    app.innerHTML = '还有' + count + '秒加载完成.'
    count--
  }
}, 1000)