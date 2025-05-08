
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
        throw new Error("Invalid character");
    }

    return true
}


window.parse_hex = function(input){
    // На вход подается строка. Проверить, что состоит только из 0..f
    // Проверить, что длинна ровно 8 

    if (input.length != 8){
        throw new Error("Invalid lenght");
    }

    if ( !/^[0123456789abcdef]+$/i.test(input) ){
        throw new Error("Invalid character");
    }

    return true
}