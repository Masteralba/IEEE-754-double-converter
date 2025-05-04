

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

    output(){

        this.bin_output.value = this.bin_value.join("")
        this.decimal_output.value = this.decimal_value.toString()
        this.stored_output.value = this.stored_value.toString()
        this.error_output.value = this.error_value.toString()
        this.hex_output.value = this.hex_value.join("")

    }

    bin_input(){

        this.bin_value = this.bin_output.value;

        // Пересчет других значений

        this.output()
        
    }

    decimal_input(){

        this.decimal_value = this.decimal_output.value;

        // Пересчет других значений

        this.output()        
    }

    hex_input(){

        this.hex_value = this.hex_output.value;

        // Пересчет других значений

        this.output()
    }



}

document.addEventListener('DOMContentLoaded', main )

function main(){
    const double = new DoubleValue();
    
    // Назначаем обработчики полей ввода
    document.getElementById('Bin_Input_Output').addEventListener('keydown', () => {
        if (event.key === 'Enter') {
            double.bin_input();
        }
    });
    
    document.getElementById('Decimal_Input_Output').addEventListener('input', () => {
        double.decimal_input();
    });
    
    document.getElementById('Hex_Input_Output').addEventListener('input', () => {
        double.hex_input();
    });
}

