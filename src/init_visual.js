

const container = document.getElementById('bit-container');
  
// Создаем 52 чекбокса
for (let i = 0; i < 52; i++) {

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'bit-checkbox';
    checkbox.id = `bit-${i}`;
    
    container.appendChild(checkbox);
    
}