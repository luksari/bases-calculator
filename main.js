const Big = require("big.js");

const baseOutSelect = document.getElementById('baseOut');
const numInput = document.getElementById('number');
const output = document.getElementById('output');
const converter = document.getElementById('converter');
const range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');
const errBox = document.getElementsByClassName('error-box');

createBases();
showLegend();


numInput.addEventListener('input', (e) => {
  if(e.target.value.length >= 20){
    e.target.value = e.target.value.substring(0, 20);
    showError("Maksymalna długość ciągu znakowego to 20");
  }
  const isnum = /^\d+$/.test(e.target.value);
  if(!isnum){
    e.target.value = e.target.value.replace(/\D/g, '')
    showError(`Ciąg liczbowy nie może zawierać innych znaków niż 0,1...9`);
  }
  if(e.target.value.length === 0){
    e.target.value = 0;
    showError(`Wpisz ciąg liczbowy`);
  }
});

converter.addEventListener('click', () => {
  const inBase = 10;
  const outBase = baseOutSelect.value;
  const inValue = new Big(numInput.value);
  const outValue = convertToBase(inValue, 10, outBase);
  

  output.innerHTML = `Wynik: ${outValue}`;
});

function convertToBase(value, inBase, outBase) {
  const inRange = range.slice(0, inBase);
  let outRange = range.slice(0, outBase);
  let newValue = [];
  let remainder;
  while (!(Big(value).eq(-0))) {
    if (outBase == -2) {
      remainder = Big(value).mod(Big(outBase));
      value = Math.ceil(Big(value).div(outBase));
      newValue.push(remainder.gte(0)
        ? remainder
        : remainder.times(-1));
    } else {
      remainder = Big(value).mod(outBase);
      newValue.push(outRange[remainder]);
      value = (Big(value).minus(remainder)).div(outBase)
    }

  }
  return newValue
    .reverse()
    .join('') || '0';
}

function createBases() {
  for (let i = 1; i <= 64; i++) {
    // let inBase = new Option(i, i)
    let outBase = new Option(i, i)
    if (i === 1) {
      // inBase.value = -2;
      // inBase.text = -2;
      outBase.value = -2;
      outBase.text = -2;
    }
    // if (i === 10) {
    //   inBase.selected = true;
    // }
    // baseInSelect.add(inBase, null);
    baseOutSelect.add(outBase, null);
  }
}

function showLegend() {
  const wrapper = document.getElementsByClassName('wrapper');
  const legend = document.createElement('div');
  legend.className = "legend";
  for (let i = 0; i < range.length; i++) {
    let legendElem = document.createElement('p');
    legendElem.innerHTML = `${range[i]} = ${i}`;
    legendElem.dataset.value = i;
    legend.appendChild(legendElem);
  }
  wrapper[0].appendChild(legend);
}
function showError(err){

  errBox[0].style.opacity = 1;
  errBox[0].innerHTML = `${err}`;
  throw new Error(err);
}
