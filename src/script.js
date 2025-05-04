

class DoubleValue{

    constructor(){

        this.bin_value = new Array(52).fill(0)  // Бинарное представление числа
        this.bin_output = document.getElementById('Bin_Input_Output')

        this.decimal_value = 0  // Введенное пользователем значение
        this.decimal_output = document.getElementById('Decimal_Input_Output')

        this.stored_value = 0 // Представление числа в памяти
        this.stored_output = document.getElementById('Stored_Output')

        this.error_value = 0 // Ошибка представления числа
        this.error_output = document.getElementById('Error_Output')

        this.hex_value = new Array(8).fill(0)   // Восьмеричное представление числа
        this.hex_output = document.getElementById('Hex_Input_Output')

        this.output()

    }

    output(){ // Вывод значений в соответствующие поля

        this.bin_output.value = this.bin_value.join("")
        this.decimal_output.value = this.decimal_value.toString()
        this.stored_output.value = this.stored_value.toString()
        this.error_output.value = this.error_value.toString()
        this.hex_output.value = this.hex_value.join("")

    }


    bin_input(){  // Введено новое бинарное значение

        this.bin_value = this.bin_output.value;

        // Пересчет других значений

        this.output()
        
    }

    decimal_input(){ // Введено новое десятичное значение

        this.decimal_value = this.decimal_output.value;

        // Пересчет других значений

        this.output()        
    }

    hex_input(){  // Введено новое восьмеричное значение

        this.hex_value = this.hex_output.value;

        // Пересчет других значений

        this.output()
    }


    decimal_to_bin(){ // Перевод десятичного представления в двоичное
        // НУЖНО РЕАЛИЗОВАТЬ
    }


    bin_to_decimal(){  // Перевод двоичного представления в десятичное
        // НУЖНО РЕАЛИЗОВАТЬ
    }

    bin_to_hex(){  // Перевод двоичного представления в восьмеричное
        // НУЖНО РЕАЛИЗОВАТЬ
    }

    hex_to_bin(){ // Перевод восьмеричного представления в двоичное
        // НУЖНО РЕАЛИЗОВАТЬ
    }

    count_error(){ // Вычисление ошибки
        // НУЖНО РЕАЛИЗОВАТЬ
    }


}

document.addEventListener('DOMContentLoaded', main )

function main(){
    const double = new DoubleValue();
    
    // Назначаем обработчик поля ввода бинарного представления
    document.getElementById('Bin_Input_Output').addEventListener('keydown', () => {
            double.bin_input();  // Вызываем функцию - обработчик
    });
    
    // Назначаем обработчик поля ввода десятичного представления
    document.getElementById('Decimal_Input_Output').addEventListener('input', () => {
        double.decimal_input();  // Вызываем функцию - обработчик
    });
    
    // Назначаем обработчик поля ввода восьмеричного представления
    document.getElementById('Hex_Input_Output').addEventListener('input', () => {
        double.hex_input();     // Вызываем функцию - обработчик
    });
}

