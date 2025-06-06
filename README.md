# IEEE-754 Floating Point Converter

Проект представляет собой веб-инструмент для конвертации чисел между различными форматами представления чисел с плавающей запятой стандарта IEEE-754.
![image](https://github.com/user-attachments/assets/7e81a204-fdad-47ea-92b8-647afa7f72e3)


## Основные возможности

- Конвертация между:
  - Десятичным представлением
  - Двоичным 64-битным форматом (IEEE-754)
  - Шестнадцатеричным представлением
- Визуализация структуры числа:
  - Знак (1 бит)
  - Порядок (11 бит)
  - Мантисса (52 бита)
- Отображение:
  - Точного значения в памяти
  - Ошибки представления
  - Специальных значений (NaN, Inf)

## Использование

1. Введите число в одном из полей:
   - "Бинарное представление" (64 бита)
   - "Значение в десятичной системе"
   - "Шестнадцатеричное представление" (16 символов)
2. Нажмите Enter для конвертации
3. Результат автоматически отобразится во всех полях

## Особенности реализации

- Поддержка очень больших/маленьких чисел (экспоненциальная запись)
- Точное вычисление ошибки представления
- Визуальное отображение битового состава числа
- Поддержка специальных значений IEEE-754:
  - Бесконечность (Inf/-Inf)
  - Не число (NaN)

## Технические детали

- Чистый JavaScript (без зависимостей)
- Использует ArrayBuffer для точного представления чисел
- Поддерживает все особенности стандарта IEEE-754:
  - Денормализованные числа
  - Округления
  - Граничные случаи

## Установка

Просто откройте `index.html` в браузере. Никакой дополнительной установки не требуется.
