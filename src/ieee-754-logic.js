
window.convert_decimal_to_ieee754 = function(decimal_value){
    let bits = new Array(64).fill(0);
    if(decimal_value == 0) {
        return bits;
    }
    bits[0] = decimal_value > 0 ? 0 : 1; //начальный бит
    
    let abs = Math.abs(decimal_value);
    let a = Math.floor(abs); //целая часть
    let b = abs - a;         //дробь
    let m = 12;
    let l = 0;
    let f = false;
    if (a > 0) {
        f = true;
        let tmp = a.toString(2);
        l = tmp.length;
        for (let i = 1; i < l; i++) {
            bits[m] = tmp[i];
            m += 1;
        }
    }
    let skip = 0;
    while(m < 64) {
        b *= 2;
        let t = Math.floor(b);
        b -= t;
        if (!f && t == 0) {
            skip += 1;
            continue;
        }
        if (!f && t == 1) {
            f = 1;
            continue;
        }
        bits[m] = t;
        m += 1;
    }
    let shift = 0;
    if (l > 0) {
        shift = l - 1;
    }
    else {
        shift = - (skip + 1);
    }
    shift += 1023;
    let bi = shift.toString(2);
    let e = 11;
    for (let i = bi.length-1; i >= 0; i--) {
        
        bits[e] = bi[i];
        e -= 1;
    }
    return bits;
}

window.convert_ieee754_to_decimal = function(ieee754){
    let m = 1;
    for (let i = 0; i < 52; i++){
        m += ieee754[12+i]*2**(-i-1);
    }
    let e = 0;
    for (let i = 11; i > 0; i--) {
        e += ieee754[i]*2**(11-i);
    }
    e -= 1023;
    return numberToString(ieee754[0] == 0 ? m*2**e : (-1)*m*2**e);
}

window.convert_ieee754_to_stored = function(bitsStr) {
    if (bitsStr.length !== 64) {
        throw new Error("Должно быть ровно 64 бита");
    }

    // Парсинг компонентов
    const sign = bitsStr[0] === '1' ? -1 : 1;
    const exponent = parseInt(bitsStr.slice(1, 12), 2) - 1023;
    const mantissa = parseInt(bitsStr.slice(12), 2);

    // Обработка специальных случаев
    if (exponent === 1024) {
        return mantissa === 0 ? (sign === 1 ? "Infinity" : "-Infinity") : "NaN";
    }

    // Вычисление мантиссы с учетом неявного бита
    const significand = exponent === -1023 
        ? mantissa / Math.pow(2, 52)  // Денормализованные числа
        : 1 + mantissa / Math.pow(2, 52);  // Нормализованные числа

    // Вычисление итогового значения
    const value = sign * significand * Math.pow(2, exponent);

    // Форматирование с 17 знаками после запятой
    const formatted = value.toFixed(50);
    
    // Удаление незначащих нулей
    return formatted.replace(/(\.\d*?[1-9])0+$|\.0+$/, '$1');
}

window.convert_ieee754_to_hex = function(bin_value){
    let bits = new Array(16).fill(0);
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 4; j++) {
            bits[i] += bin_value[4*i+j] * 2**(3-j)
        }
    }
    return bits;
}

window.convert_hex_to_ieee754 = function(hex_value){

    let bits = new Array(64).fill(0);
    for (let i = 0; i < 16; i++) {
        let val = hex_value[i];
        for (let j = 3; j >= 0; j--) {
            let t = Math.floor(val / 2);
            let r = val - t * 2;
            bits[4*i+j] = r;
            val = t;
        }
    }
    
    return bits;
}

window.count_difference_stored_decimal = function(stored_value, decimal_value){
    //let num = numberToString(convert_ieee754_to_decimal(bin_value))
    return str_sub(decimal_value, stored_value);
}

function str_sub_core(a, b) {
    let c = '';
    let overflow = 0;
    for (let i = a.length - 1; i >= 0 ; i--) {
        let n = 0;
        if (a[i] == '.') {
            c = '.' + c; 
            continue;
        }
        let num_a = parseInt(a[i]);
        let num_b = parseInt(b[i]) + overflow;
        if (num_a < num_b) {
            overflow = 1;
            n = 10 + num_a - num_b;
        }
        else {
            overflow = 0;
            n = num_a - num_b;
        }
        c = n.toString() + c; 
        
    }
    return c;
}

function split_num(num) {
    let [front, back = ''] = num.split('.');
    return { front, back };
}

function str_normalizer(a, b) {

    const numA = split_num(a);
    const numB = split_num(b);

    const maxFrontLen = Math.max(numA.front.length, numB.front.length);
    const maxBackLen = Math.max(numA.back.length, numB.back.length);

    const normalize = (num) => {
        const front = num.front.padStart(maxFrontLen, '0');
        const back = num.back.padEnd(maxBackLen, '0');
        return back ? `${front}.${back}` : front;
    };

    return [normalize(numA), normalize(numB)];
}

function split_number(num) {
    const [front, back = ''] = num.split('.');
    return { front, back };
}

function normalize(num, maxFrontLen, maxBackLen) {
    const paddedFront = num.front.padStart(maxFrontLen, '0');
    const paddedBack = num.back.padEnd(maxBackLen, '0');
    return paddedBack ? `${paddedFront}.${paddedBack}` : paddedFront;
}

function str_normalizer(a, b) {
    a = a.replace('-', '');
    b = b.replace('-', '');
    const numA = split_number(a);
    const numB = split_number(b);

    const maxFrontLen = Math.max(numA.front.length, numB.front.length);
    const maxBackLen = Math.max(numA.back.length, numB.back.length);

    return [
        normalize(numA, maxFrontLen, maxBackLen),
        normalize(numB, maxFrontLen, maxBackLen)
    ];
}

function formatResult(resultStr) {
    let [front, back = ''] = resultStr.split('.');
    
    front = front.replace(/^0+/, '') || '0';
    
    if (back) {
        back = back.replace(/0+$/, '');
        if (back === '') return front;
    }
    
    return back ? `${front}.${back}` : front;
}

function str_sub(a, b) {
    let [an, bn] = str_normalizer(a, b);
    
    return is_greater(an, bn) ? formatResult(str_sub_core(an, bn)) : formatResult(str_sub_core(bn, an));
}

function is_greater(a, b){
    for(let i = 0; i < a.length; i++) {
        if (a[i] > b[i]) {
            return true;
        }
    }
    return false;
}

function numberToString(num) {
    // Проверка на NaN, Infinity и другие нечисловые значения
    if (!isFinite(num)) return String(num);

    // Преобразуем число в строку и проверяем наличие экспоненты
    let str = String(num);
    if (str.indexOf('e') === -1 && str.indexOf('E') === -1) return str;

    // Разбиваем на знак, мантиссу и экспоненту
    const sign = num < 0 ? '-' : '';
    const [mantissa, exponent] = str.replace(/^-/, '').split(/[eE]/);
    let [integer, fraction = ''] = mantissa.split('.');

    // Вычисляем сдвиг десятичной точки
    const exp = parseInt(exponent, 10);
    const digits = integer.length + fraction.length;
    integer = integer + fraction;

    // Обработка положительной экспоненты (число >= 1)
    if (exp > 0) {
        const newLength = integer.length + exp;
        if (newLength > digits) {
            integer += '0'.repeat(newLength - digits);
        }
        return sign + integer.slice(0, exp + 1) + '.' + integer.slice(exp + 1).replace(/0+$/, '') || '';
    }

    // Обработка отрицательной экспоненты (число < 1)
    if (exp < 0) {
        const padding = -exp - integer.length;
        if (padding > 0) {
            integer = '0'.repeat(padding) + integer;
        }
        return sign + '0.' + integer.slice(0, exp) + integer.slice(exp).replace(/0+$/, '');
    }

    return sign + mantissa;
}