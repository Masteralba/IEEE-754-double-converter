
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
        if (/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)$/.test(input)){return true}
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


window.expToDecimal = function(expNumStrinput) {

    expNumStr = expNumStrinput.toLowerCase()
    
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


window.decimalToExponential = function(decimalStr) {
    // Удаляем ведущие нули перед числом (если есть) и знак
    let [sign, num] = decimalStr.match(/^([+-]?)(.*)/).slice(1);
    num = num.replace(/^0+/, '');
    
    // Если число начинается с точки, добавляем ноль (".123" -> "0.123")
    if (num.startsWith('.')) {
        num = '0' + num;
    }
    
    // Находим позицию первой значащей цифры (не нуля и не точка)
    const firstDigitIndex = num.search(/[1-9]/);
    
    // Если все нули (включая случай "0.000...0")
    if (firstDigitIndex === -1) {
        return '0';
    }
    
    // Находим позицию точки
    const dotIndex = num.indexOf('.');
    
    let exponent;
    let mantissa;
    
    if (dotIndex === -1) {
        // Если точки нет (целое число), экспонента = длина числа - 1
        exponent = num.length - 1;
        mantissa = num[0] + (num.length > 1 ? '.' + num.slice(1) : '');
    } else {
        if (firstDigitIndex < dotIndex) {
            // Случай типа "123.456" -> "1.23456e2"
            exponent = dotIndex - 1;
            mantissa = num[firstDigitIndex] + '.' + 
                      num.slice(firstDigitIndex + 1).replace('.', '');
        } else {
            // Случай типа "0.000123" -> "1.23e-4"
            exponent = firstDigitIndex - dotIndex - 1;
            mantissa = num[firstDigitIndex] + '.' + 
                      num.slice(firstDigitIndex + 1).replace('.', '');
            exponent = -exponent;
        }
    }
    
    // Удаляем лишние нули в конце мантиссы
    mantissa = mantissa.replace(/\.?0+$/, '');
    if (mantissa.endsWith('.')) {
        mantissa = mantissa.slice(0, -1);
    }
    
    // Формируем результат
    return sign + mantissa + (exponent !== 0 ? 'e' + exponent : '');
}