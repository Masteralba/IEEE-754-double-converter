window.to5 = function(numberStr) {

    const hasDecimal = numberStr.includes('.');
    

    let [integerPart, fractionalPart = ''] = numberStr.split('.');
    

    integerPart = integerPart.replace(/^0+/, '') || '0';
    
    fractionalPart = fractionalPart.replace(/0+$/, '');
    

    const fullNumberStr = integerPart + fractionalPart;
    const decimalPlaces = fractionalPart.length;
    
    
    let result = '';
    let carry = 0;

    for (let i = fullNumberStr.length - 1; i >= 0; i--) {
        const digit = parseInt(fullNumberStr[i], 10);
        const product = digit * 5 + carry;
        carry = Math.floor(product / 10);
        result = (product % 10).toString() + result;
    }
    

    if (carry > 0) {
        result = carry.toString() + result;
    }
    

    if (decimalPlaces > 0) {
        const integerDigits = result.length - decimalPlaces;
        if (integerDigits > 0) {

            result = result.slice(0, integerDigits) + '.' + result.slice(integerDigits);
        } else {

            result = '0.' + '0'.repeat(-integerDigits) + result;
        }
        

        result = result.replace(/(\.\d*?)0+$/, '$1');
        

        if (result.endsWith('.')) {
            result = result.slice(0, -1);
        }
    }
    
    return result;
}

function by10(numStr) {

    if (numStr === '0' || numStr === '') return '0';
    

    const pointIndex = numStr.indexOf('.');
    

    if (pointIndex === -1) {
        numStr += '.0';
    }
    

    let [integerPart, fractionalPart] = numStr.split('.');
    

    if (integerPart === '') {
        integerPart = '0';
    }
    

    if (fractionalPart === '') {
        fractionalPart = '0';
    }
    

    const newInteger = integerPart.slice(0, -1) || '0';
    const newFractional = (integerPart.slice(-1) || '0') + fractionalPart;
    

    let result = `${newInteger}.${newFractional}`;
    

    result = result
        .replace(/^0+([1-9])/, '$1')  
        .replace(/(\.\d*[1-9])0+$/, '$1')  
        .replace(/\.$/, '');  
    
    
    if (result.startsWith('.')) {
        result = '0' + result;
    }
    
    
    if (result === '0.0') {
        return '0';
    }
    
    return result;
}

function to2(numberStr) {
    
    const hasDecimal = numberStr.includes('.');
    
    
    let [integerPart, fractionalPart = ''] = numberStr.split('.');
    
    
    integerPart = integerPart.replace(/^0+/, '') || '0';
    
    
    fractionalPart = fractionalPart.replace(/0+$/, '');
    
    
    const fullNumberStr = integerPart + fractionalPart;
    const decimalPlaces = fractionalPart.length;
    
    
    let result = '';
    let carry = 0;
    
    
    for (let i = fullNumberStr.length - 1; i >= 0; i--) {
        const digit = parseInt(fullNumberStr[i], 10);
        const product = digit * 2 + carry;
        carry = Math.floor(product / 10);
        result = (product % 10).toString() + result;
    }
    
    
    if (carry > 0) {
        result = carry.toString() + result;
    }
    

    if (decimalPlaces > 0) {
        const integerDigits = result.length - decimalPlaces;
        if (integerDigits > 0) {
            
            result = result.slice(0, integerDigits) + '.' + result.slice(integerDigits);
        } else {
            
            result = '0.' + '0'.repeat(-integerDigits) + result;
        }
        
        
        result = result.replace(/(\.\d*?)0+$/, '$1');
        
        
        if (result.endsWith('.')) {
            result = result.slice(0, -1);
        }
    }
    
    return result;
}


window.two_pows = ['1']
function fill_array(array)
{
    for(let i = 1; i < 1075; i++)
    {
        array.push(by10(to5(array[i-1])))
    }
    for(let i = 0; i< 1023; i++)
    {
        array.unshift(to2(array[0]))    
    }
}
fill_array(window.two_pows)


window.addStringNumbers = function(a, b) {
    
    const splitNumber = (num) => {
        const parts = num.split('.');
        return {
            integer: parts[0] || '0',
            fractional: parts[1] || ''
        };
    };

    

    const num1 = splitNumber(a);
    const num2 = splitNumber(b);

    

    
    const maxFractionalLength = Math.max(num1.fractional.length, num2.fractional.length);

    let frac1 = num1.fractional
    let frac2 = num2.fractional



    for(let i=0; frac1.length < maxFractionalLength; i++)
    {
        frac1 = frac1 + '0'
    }
    for(let i=0; frac2.length < maxFractionalLength; i++)
    {
        frac2 = frac2 + '0'
    }

    
    const maxIntegerLength = Math.max(num1.integer.length, num2.integer.length);

    let int1 = num1.integer
    let int2 = num2.integer


    for(let i=0; int1.length < maxIntegerLength; i++)
    {
        int1 = '0' + int1
    }
    for(let i=0; int2.length < maxIntegerLength; i++)
    {
        int2 = '0' + int2 
    }

    
    const fullNum1 = int1 + frac1;
    const fullNum2 = int2 + frac2;

    
    let result = '';
    let carry = 0;
    const totalLength = maxIntegerLength + maxFractionalLength;

    for (let i = totalLength - 1; i >= 0; i--) {
        const digit1 = parseInt(fullNum1[i] || '0', 10);
        const digit2 = parseInt(fullNum2[i] || '0', 10);
        const sum = digit1 + digit2 + carry;
        
        result = (sum % 10) + result;
        carry = Math.floor(sum / 10);
    }

    if (carry > 0) {
        result = carry + result;
    }

    

    
    if (maxFractionalLength > 0) {
        const integerPart = result.slice(0, -maxFractionalLength) || '0';
        const fractionalPart = result.slice(-maxFractionalLength);
        result = integerPart + '.' + fractionalPart;
    }


    result = result
        .replace(/^0+([1-9])/, '$1')  
        .replace(/(\.\d*[1-9])0+$/, '$1')  
        .replace(/\.$/, '');  


    if (result.startsWith('.')) result = '0' + result;
    if (result === '') return '0';

    return result;
}
