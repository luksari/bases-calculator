const baseOutSelect =  document.getElementById('baseOut');
const baseInSelect =  document.getElementById('baseIn');
const numInput =  document.getElementById('number');
const output =  document.getElementById('output');
const converter = document.getElementById('converter');

createBases();

converter.addEventListener('click', ()=> {
  let inBase = baseInSelect.value;
  let outBase = baseOutSelect.value;
  let inValue = numInput.value;
  let outValue = convertBase(inValue, inBase, outBase);

  output.innerHTML = `Wynik: ${outValue}`;    
})


function convertBase(value, inBase, outBase) {
  const range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');
  const inRange = range.slice(0, inBase);
  let outRange = range.slice(0, outBase);
  let decimalValue = value
    .split('')
    .reverse()
    .reduce(function (power, digit, index) {
      if (inRange.indexOf(digit) === -1) 
        throw new Error(`Nieprawidłowy znak ${digit} dla bazy ${inBase}`);
      return power += inRange.indexOf(digit) * (Math.pow(inBase, index));
    }, 0);

  let newValue = [];
  let remainder;
  while (decimalValue != 0) {
    if(outBase == -2){
      remainder = decimalValue % outBase;
      decimalValue = Math.ceil(decimalValue / outBase);
      newValue.push(remainder >= 0 ? remainder : -remainder);
    }
    else{
      remainder = decimalValue % outBase;
      newValue.push(outRange[remainder]);
      decimalValue = (decimalValue - (remainder)) / outBase;
    }

  }
  return newValue.reverse().join('') || '0';
}


function createBases() {
  for (let i = 1; i <= 64; i++) {
    let inBase = new Option(i, i)
    let outBase = new Option(i, i)
    if (i === 1) {
      inBase.hidden = true;
      outBase.value = -2;
      outBase.text = -2;
    }
    if(i === 10){
      inBase.selected = true;
    }
    baseInSelect.add(inBase, null);
    baseOutSelect.add(outBase, null);
  }
}


