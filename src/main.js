

class DoubleValue{

    constructor(
        bin_html_elem,
        decimal_html_elem,
        stored_html_elem,
        error_html_elem,
        hex_html_elem,
        exeption_output, 
        bits_container,
    ){

        this.bin_value = new Array(64).fill('0')  // Бинарное представление числа
        this.bin_input_output = document.getElementById(bin_html_elem)

        this.decimal_value = '0'  // Введенное пользователем значение
        this.decimal_input_output = document.getElementById(decimal_html_elem)

        this.stored_value = '0' // Представление числа в памяти
        this.stored_output = document.getElementById(stored_html_elem)

        this.error_value = '0' // Ошибка представления числа
        this.error_output = document.getElementById(error_html_elem)

        this.hex_value = new Array(8).fill('0')   // Шестнадцатеричное представление числа
        this.hex_input_output = document.getElementById(hex_html_elem)
    
        this.bits_container = bits_container // Массив бит в виде кнопок

        this.exeption_output = document.getElementById(exeption_output) // Вывод исключений

        this.set_addEventListener()  // Установка обработчиков ввода

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

        this.decimal_input_output.value = this.decimal_value.toString()
        this.stored_output.value = this.stored_value.toString()
        this.error_output.value = this.error_value.toString()
        this.hex_input_output.value = this.hex_value.join("")

        this.exeption_output.value = ""

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
        this.bin_to_decimal()
        this.bin_to_stored()
        this.bin_to_hex()
        this.count_error()

        this.output()

        
    }

    input_bit(event){  // Установлен новый бит

        if (event.target.classList.contains('bit-checkbox')) {
            const bitIndex = event.target.id.split('-')[1]; // Получаем номер бита из id

            //bits_copy = this.bin_value.slice()  // Создаем копию текущего массива бит

            this.bin_value[bitIndex] = `${Number(event.target.checked)}`;

            this.bin_to_decimal()
            this.bin_to_stored()
            this.bin_to_hex()
            this.count_error()
            this.output()

        }
    };

    
    input_decimal(){ // Введено новое десятичное значение

        const inputValue = this.decimal_input_output.value

        
        try { // парсим
            parse_decimal(inputValue)
        } catch (error) {
            this.exeption_output.value = error.message
            return // выход
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

        this.hex_value = Array.from(inputValue);  // Обновляем значение

        // Пересчет остальных значений

        this.hex_to_bin()
        this.bin_to_decimal()
        this.bin_to_stored()
        this.count_error()

        this.output()

    }

    bin_to_stored(){  // Перевод двоичного представлениия в представление в памяти
        if (this.bin_value.slice(1, 12).every(element => element === '1'))
            this.stored_value = "not represented"
            //this.stored_value = ...
    }

    bin_to_decimal(){  // Перевод двоичного представления в десятичное

        if (this.bin_value.slice(1, 12).every(element => element === '1'))
        {
            if (this.bin_value.slice(12, 65).every(element => element == '0'))
                this.decimal_value = "inf"
            else
                this.decimal_value = "NaN"
            if (this.bin_value[0] == 1)
                this.decimal_value = "-" + this.decimal_value
        }
        else
            this.decimal_value = convert_ieee754_to_decimal(this.bin_value)
    }

    bin_to_hex(){  // Перевод двоичного представления в шестнадцатеричное
        this.hex_value = convert_ieee754_to_hex(this.bin_value)
    }


    decimal_to_bin(){ // Перевод десятичного представления в двоичное
        
        if ( (this.decimal_value == '+nan') || (this.decimal_value == 'nan') || (this.decimal_value == '-nan') )
        {
            this.bin_value.fill('0')
            if (this.decimal_value == '-nan')
                this.bin_value.fill('1', 0, 12)
            else
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
        if (this.decimal_value == "NaN" || this.decimal_value == "inf" || this.decimal_value == "-NaN" || this.decimal_value == "-inf")
            this.error_value = "unknown"
        else
            this.error_value = count_difference_ieee754_decimal(this.bin_value, this.decimal_value)
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
        container);
    
}

