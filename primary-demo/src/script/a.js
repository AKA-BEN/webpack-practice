import {counts} from './counts'
import tpl from '../tpl/a.html'
import '../style/common.css'
import '../style/a.less'

function a() {
  const num1 = 10;
  const num2 = 8;
  let elP = document.createElement('p');
  let elTxt = document.createTextNode(
    num1 + '+' + num2 + '=' + counts(num1, num2)
  );
  elP.appendChild(elTxt)
  return elP
}

let app = document.getElementById('app');
app.innerHTML = tpl
app.appendChild(a())