class DoubleValue{

    constructor(
        bin_html_elem,
        decimal_html_elem,
        stored_html_elem,
        error_html_elem,
        hex_html_elem,
        exeption_output, 
        bits_container,
        actual_sign,
        actual_exponent,
        actual_mantissa,
        sign_value,
        exponent_value,
        mantissa_value
    ){

        this.bin_value = new Array(64).fill('0')  // Бинарное представление числа
        this.bin_input_output = document.getElementById(bin_html_elem)

        this.decimal_value = '0'  // Введенное пользователем значение
        this.decimal_input_output = document.getElementById(decimal_html_elem)

        this.stored_value = '0' // Представление числа в памяти
        this.stored_output = document.getElementById(stored_html_elem)

        this.error_value = '0' // Ошибка представления числа
        this.error_output = document.getElementById(error_html_elem)

        this.hex_value = new Array(16).fill('0')   // Шестнадцатеричное представление числа
        this.hex_input_output = document.getElementById(hex_html_elem)
    
        this.bits_container = bits_container // Массив бит в виде кнопок

        this.exeption_output = document.getElementById(exeption_output) // Вывод исключений

        this.set_addEventListener()  // Установка обработчиков ввода

        this.sign_value = document.getElementById(sign_value)
        this.sign_value.textContent = '+1'

        this.exponent_value = document.getElementById(exponent_value)
        this.exponent_value.textContent = '-1023'
        
        this.mantissa_value = document.getElementById(mantissa_value)
        this.mantissa_value.value = '0'

        this.actual_sign = document.getElementById(actual_sign)
        this.actual_sign.value = '0'

        this.actual_exponent = document.getElementById(actual_exponent)
        this.actual_exponent.value = '0'

        this.actual_mantissa = document.getElementById(actual_mantissa)
        this.actual_mantissa.value = '0'

        

        this.output() // Первичный вывод

    }

    set_addEventListener(){

        // Назначаем обработчик поля ввода бинарного представления
        this.bin_input_output.addEventListener('keydown', (event) => { 
            if (event.key === 'Enter') {
                this.input_bin(); // Вызываем функцию - обработчик
            }
        });

        // Назначаем обработчик поля ввода десятичного представления
        this.decimal_input_output.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.input_decimal(); // Вызываем функцию - обработчик
            }
        });

        // Назначаем обработчик поля ввода шестнадцатеричного представления
        this.hex_input_output.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.input_hex(); // Вызываем функцию - обработчик
            }
        });

        // Назначаем обработчик чекбокса битов
        this.bits_container.addEventListener('change', (event) => {
            this.input_bit(event)
        });

    }

    output(){ // Вывод значений в соответствующие поля

        this.bin_input_output.value = this.bin_value.join("")


        for(let i=0; i<64; i++)
        {
            this.bits_container.querySelectorAll('.bit-checkbox')[i].checked = Boolean(parseFloat(this.bin_value[i]))
        }

        if (String(this.decimal_value).length >= 60 ) this.decimal_input_output.value = decimalToExponential(String(this.decimal_value))
        else this.decimal_input_output.value = this.decimal_value.replace(/(\.\d*?[1-9])0+$|\.0+$/, '$1')

        if (String(this.stored_value).length >= 60 ) this.stored_output.value = decimalToExponential(String(this.stored_value))
            else this.stored_output.value = this.stored_value.replace(/(\.\d*?[1-9])0+$|\.0+$/, '$1')

        if (String(this.error_value).length >= 60 ) this.error_output.value = decimalToExponential(String(this.error_value))
            else this.error_output.value = this.error_value.replace(/(\.\d*?[1-9])0+$|\.0+$/, '$1')
        

        let hex_string = this.hex_value.slice(0, 16)

        for (let i =0; i< 16; i++)
            {
                if (hex_string[i] == 10) hex_string[i] = 'a'
                if (hex_string[i] == 11) hex_string[i] = 'b' 
                if (hex_string[i] == 12) hex_string[i] = 'c' 
                if (hex_string[i] == 13) hex_string[i] = 'd' 
                if (hex_string[i] == 14) hex_string[i] = 'e' 
                if (hex_string[i] == 15) hex_string[i] = 'f' 
        
            }
        this.hex_input_output.value =  hex_string.join("")

        this.exeption_output.value = ""

        this.count_visual()

    }

    count_visual(){

        this.sign_value.textContent = Boolean(parseFloat(this.bin_value[0])) ? "-1" : "+1"
        this.actual_sign.value = this.bin_value[0]

        let power_counter = 0

        for(let i=11; i >0; i--)
        {
            if (this.bin_value[i] != '0')  power_counter += Math.pow(2, 11-i)
        }

        
        this.exponent_value.textContent = (power_counter == 2047) ? "?" : `${power_counter-1023}`
        this.actual_exponent.value = `${power_counter}`

        let matissa_counter = 0
        let mantissa_counter_value = 0

        for (let i=63; i>11; i--)
        {
            if (this.bin_value[i] != '0')  {
                matissa_counter += Math.pow(2, 63-i)
                mantissa_counter_value += Math.pow(2, -(i-11))
            }
        }

        if (power_counter == 0  && matissa_counter != 0)
        {
            this.exponent_value.textContent = "-1022"
        }

    const mantissa = this.bin_value.slice(12)

	



    let res = '0'

    for (let i =0; i< 52; i++)
    {
        if (Boolean(parseInt(mantissa[i])))
        {
		res = addStringNumbers(res, two_pows[1023+i+1])
        }
    }
	


        if (power_counter != 0) res = '1 + ' + res
        if (power_counter == 2047) res = "?"
        this.mantissa_value.textContent =  res
        this.actual_mantissa.value = `${matissa_counter}`
    
        
    }


    input_bin(){  // Введено новое бинарное значение

        const inputValue = this.bin_input_output.value
        
        try {  // парсим
            parse_bin(inputValue)
        } catch (error) {
            this.exeption_output.value = error.message
            return // выход
        }

        // Все хорошо

        this.bin_value = Array.from(inputValue); // Обновляем значение

        // Пересчет остальных значений
        this.bin_to_stored()
	this.decimal_value = this.stored_value
        this.bin_to_hex()
        this.error_value = '0'
	if (this.stored_value == "NaN" || this.stored_value == 'inf' || this.stored_value == '-inf' ) this.error_value = "unknown"
        this.output()

        
    }

    input_bit(event){  // Установлен новый бит

        if (event.target.classList.contains('bit-checkbox')) {
            const bitIndex = event.target.id.split('-')[1]; // Получаем номер бита из id


            this.bin_value[bitIndex] = `${Number(event.target.checked)}`;
            this.bin_to_stored()
	    this.decimal_value = this.stored_value
            this.bin_to_hex()
            this.error_value = '0'
	    if (this.stored_value == "NaN" || this.stored_value == 'inf' || this.stored_value == '-inf' ) this.error_value = "unknown"
            this.output()

        }
    };

    
    input_decimal(){ // Введено новое десятичное значение

        let inputValue = this.decimal_input_output.value

        
        try { // парсим
            parse_decimal(inputValue)
        } catch (error) {
            this.exeption_output.value = error.message
            return // выход
        }

        if (inputValue.toLowerCase().indexOf('e') != -1)
        {
            inputValue = expToDecimal(inputValue)
        }

        this.decimal_value = inputValue.toLowerCase()  // Обновляем значение

        // Пересчет остальных значений

        this.decimal_to_bin()
        this.bin_to_stored()
        this.bin_to_hex()
        this.count_error()

        this.output()

    }

    input_hex(){  // Введено новое восьмеричное значение

        const inputValue = this.hex_input_output.value
        
        try {   // парсим
            parse_hex(inputValue)
        } catch (error) {
            this.exeption_output.value = error.message
            return // выход
        }

        this.hex_value = Array.from(inputValue.toLowerCase());  // Обновляем значение

        for (let i=0; i < 16; i++)
        {
            if (this.hex_value[i] == 'a') this.hex_value[i] = 10
            if (this.hex_value[i] == 'b') this.hex_value[i] = 11
            if (this.hex_value[i] == 'c') this.hex_value[i] = 12
            if (this.hex_value[i] == 'd') this.hex_value[i] = 13
            if (this.hex_value[i] == 'e') this.hex_value[i] = 14
            if (this.hex_value[i] == 'f') this.hex_value[i] = 15
            
        }

        // Пересчет остальных значений

        this.hex_to_bin()
        this.bin_to_stored()
	this.decimal_value = this.stored_value
        this.error_value = '0'
        this.output()

    }

    bin_to_stored(){  // Перевод двоичного представлениия в представление в памяти
        if (this.bin_value.slice(1, 12).every(element => element === '1'))
            {
                if (this.bin_value.slice(12, 65).every(element => element == '0'))
                    this.stored_value = "inf"
                else
                    this.stored_value = "NaN"
                if (this.bin_value[0] == 1 && this.stored_value != "NaN")
                    this.stored_value = "-" + this.stored_value
             
            }
        else
	    {
		if (this.bin_value.slice(1, 65).every(element => element =='0'))
		{
			if (this.bin_value[0] == '0') this.stored_value = '+0'
			else this.stored_value = '-0'
		}
            	else this.stored_value = convert_ieee754_to_stored(this.bin_value.join(""))
	    }
    }


    bin_to_hex(){  // Перевод двоичного представления в шестнадцатеричное
        this.hex_value = convert_ieee754_to_hex(this.bin_value)
    }


    decimal_to_bin(){ // Перевод десятичного представления в двоичное
        
        if ( (this.decimal_value == '+nan') || (this.decimal_value == 'nan') || (this.decimal_value == '-nan') )
        {
            this.bin_value.fill('0')
            this.bin_value[12] = '1'
	    this.bin_value.fill('1', 1, 12)
        }
        else
        {
            if ( (this.decimal_value == '+inf') || (this.decimal_value == 'inf') || (this.decimal_value == '-inf'))
            {
                this.bin_value.fill('0')
                if (this.decimal_value == '-inf')
                    this.bin_value.fill('1', 0, 12)
                else
                    this.bin_value.fill('1', 1, 12)
            }
            else
                this.bin_value = convert_decimal_to_ieee754(this.decimal_value)
        }
            
    }

    

    hex_to_bin(){ // Перевод шестнадцатеричного представления в двоичное
        this.bin_value = convert_hex_to_ieee754(this.hex_value)
    }

    count_error(){ // Вычисление ошибки
        let dec_val = this.stored_value.toLocaleLowerCase()
        if (dec_val == "nan" || dec_val == "inf" || dec_val == "-nan" || dec_val == "-inf" || dec_val == "+nan" || this.stored_value == 'Infinity' || dec_val == '+inf')
            this.error_value = "unknown"
        else
	{
		if (this.stored_value == '+0' || this.stored_value == '-0') this.error_value = '0'
		else this.error_value = count_difference_stored_decimal(this.stored_value, this.decimal_value)
	}
            
    }


}

document.addEventListener('DOMContentLoaded', main )


function main(){

    const double = new DoubleValue(
        'Bin_Input_Output',
        'Decimal_Input_Output',
        'Stored_Output',
        'Error_Output',
        'Hex_Input_Output',
        'Exeption_Output',
        container,
        'actual_sign',
        'actual_exponent',
        'actual_mantissa',
        'sign_value',
        'exponent_value',
        'mantissa_value');
    
}
