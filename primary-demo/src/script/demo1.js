import {counts} from './counts'
import tpl from 'tpl/a'
import 'css/common.css'
import 'css/common2.css'
import 'css/a.less'

function getElP() {
  const num1 = 66;
  const num2 = 38;
  let elP = document.createElement('p');
  let elTxt = document.createTextNode(
    num1 + '+' + num2 + '=' + counts(num1, num2)
  );
  elP.appendChild(elTxt)
  return elP
}

let app = document.getElementById('app');
app.innerHTML = tpl
app.appendChild(getElP())
console.log('compiled');