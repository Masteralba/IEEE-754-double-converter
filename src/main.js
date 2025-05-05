
class DoubleValue{

    constructor(bits_container){

        this.bin_value = new Array(52).fill(0)  // Бинарное представление числа
        this.bin_input_output = document.getElementById('Bin_Input_Output')

        this.decimal_value = 0  // Введенное пользователем значение
        this.decimal_input_output = document.getElementById('Decimal_Input_Output')

        this.stored_value = 0 // Представление числа в памяти
        this.stored_output = document.getElementById('Stored_Output')

        this.error_value = 0 // Ошибка представления числа
        this.error_output = document.getElementById('Error_Output')

        this.hex_value = new Array(8).fill(0)   // Шестнадцатеричное представление числа
        this.hex_input_output = document.getElementById('Hex_Input_Output')
    
        this.bits_container = bits_container

        this.output()

    }

    output(){ // Вывод значений в соответствующие поля

        this.bin_input_output.value = this.bin_value.join("")

        this.bits_container

        for(let i=0; i<52; i++)

        this.decimal_input_output.value = this.decimal_value.toString()
        this.stored_output.value = this.stored_value.toString()
        this.error_output.value = this.error_value.toString()
        this.hex_input_output.value = this.hex_value.join("")

    }


    input_bin(){  // Введено новое бинарное значение

        const inputValue = this.bin_input_output.value

        // парсим

        if (!parse_bin(inputValue))
        {
            // Что-то не так
        }

        // Все хорошо

        this.bin_value = inputValue  // Обновляем значение

        // Пересчет остальных значений
        this.bin_to_decimal()
        this.bin_to_hex()
        this.count_error()

        this.output()
        
    }

    input_decimal(){ // Введено новое десятичное значение

        const inputValue = this.decimal_input_output.value

        // Парсим

        if (!parse_decimal(inputValue))
            {
                // Что-то не так
            }
        
        // Все хорошо

        this.decimal_value = inputValue  // Обновляем значение

        // Пересчет остальных значений

        this.decimal_to_bin()
        this.bin_to_hex()
        this.count_error()

        this.output()        
    }

    input_hex(){  // Введено новое восьмеричное значение

        const inputValue = this.hex_input_output.value

        // Парсим

        if (!parse_hex(inputValue))
            {
                // Что-то не так
            }
        
        // Все хорошо

        this.hex_value = inputValue  // Обновляем значение

        // Пересчет остальных значений

        this.hex_to_bin()
        this.bin_to_decimal()
        this.count_error()

        this.output()
    }


    decimal_to_bin(){ // Перевод десятичного представления в двоичное
        this.bin_value = convert_decimal_to_ieee754(this.decimal_value)
    }

    bin_to_decimal(){  // Перевод двоичного представления в десятичное
        this.decimal_value = convert_ieee754_to_decimal(this.bin_value)
    }

    bin_to_hex(){  // Перевод двоичного представления в шестнадцатеричное
        this.hex_value = convert_ieee754_to_hex(this.bin_value)
    }

    hex_to_bin(){ // Перевод шестнадцатеричного представления в двоичное
        this.bin_value = convert_hex_to_ieee754(this.hex_value)
    }

    count_error(){ // Вычисление ошибки
        this.error_value = count_difference_ieee754_decimal(this.bin_value, this.decimal_value)
    }


}

document.addEventListener('DOMContentLoaded', main )

function updateValue(bitIndex, isChecked) {
    // Ваш код для обработки изменения бита
    console.log(`Бит ${bitIndex} изменён на ${isChecked}`);
}

function main(){

    const double = new DoubleValue(container);
    
    // Назначаем обработчик поля ввода бинарного представления
    document.getElementById('Bin_Input_Output').addEventListener('keydown', (event) => { 
            if (event.key === 'Enter') {
                double.input_bin(); // Вызываем функцию - обработчик
            }
    });
    
    // Назначаем обработчик поля ввода десятичного представления
    document.getElementById('Decimal_Input_Output').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            double.input_decimal(); // Вызываем функцию - обработчик
        }
    });
    
    // Назначаем обработчик поля ввода шестнадцатеричного представления
    document.getElementById('Hex_Input_Output').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            double.input_hex(); // Вызываем функцию - обработчик
        }
    });

    // Назначаем обработчик чекбокса битов
    container.addEventListener('change', function(event) {
        if (event.target.classList.contains('bit-checkbox')) {
            const bitIndex = event.target.id.split('-')[1]; // Получаем номер бита из id

            double.bin_value[bitIndex] = Number(event.target.checked);

            double.bin_to_decimal()
            double.bin_to_hex()
            double.count_error()
            double.output()
            

        }
    });

    
}

