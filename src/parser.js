
//  Логика работы функций парсеров пока непонятна



window.parse_bin = function(input){
    // На вход подается строка. Проверить, что состоит только из 0 и 1
    // Проверить, что длинна ровно 64

    if (input.length != 64){
        throw new Error("Invalid lenght");
    }

    if ( !/^[01]+$/.test(input) ){
        throw new Error("Invalid character");
    }

    return true
}


window.parse_decimal = function(input){
    // На вход подается строка. Проверить, что состоит только из 0..9 и . (опционально)

    if (/^[+-]?nan$/i.test(input))
    {
        return true;
    }

    if (/^[+-]?inf$/i.test(input))
    {
        return true;
    }
    

    if ( !/^[-+]?(\d+\.?\d*|\.\d+)$/.test(input))
    {
        if (/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)$/.test(input)){}
        else throw new Error("Invalid character");
    }

    return true
}


window.parse_hex = function(input){
    // На вход подается строка. Проверить, что состоит только из 0..f
    // Проверить, что длинна ровно 8 

    if (input.length != 16){
        throw new Error("Invalid lenght");
    }

    if ( !/^[0123456789abcdef]+$/i.test(input) ){
        throw new Error("Invalid character");
    }

    return true
}


window.expToDecimal = function(expNumStr) {
    
    const [mantissaStr, exponentStr] = expNumStr.toLowerCase().split('e');

    let exponent = parseInt(exponentStr);
    let [integerPart, fractionalPart = ''] = mantissaStr.split('.');
    
    
    let digits = integerPart + fractionalPart;
    let pointPos = integerPart.length; 

    
    if (exponent > 0) {
        pointPos += exponent;
        
        if (digits.length < pointPos) {
            digits += '0'.repeat(pointPos - digits.length);
        }
    } 
    
    else if (exponent < 0) {
        pointPos += exponent; 
        
        if (pointPos < 0) {
            digits = '0'.repeat(-pointPos) + digits;
            pointPos = 0;
        }
    }

    
    let result = '';
    for (let i = 0; i < digits.length; i++) {
        if (i === pointPos && i !== digits.length) {
            result += '.';
        }
        result += digits[i];
    }

    
    if (result.endsWith('.')) {
        result = result.slice(0, -1);
    }
    
    if (result.startsWith('.')) {
        result = '0' + result;
    }

    return result;
}


