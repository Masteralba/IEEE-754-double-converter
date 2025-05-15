const container = document.getElementById('numbertable')

const signGroup = document.getElementById('sign-bit');
const exponentGroup = document.getElementById('exponent-bits');
const mantissaGroup = document.getElementById('mantissa-bits'); 

  
// Создаем 64 чекбокса
for (let i = 0; i < 64; i++) {

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'bit-checkbox';
    checkbox.id = `bit-${i}`;
    
    if (i === 0) {
        signGroup.appendChild(checkbox);
      } else if (i >= 1 && i <= 11) {
        exponentGroup.appendChild(checkbox)
      } else {
        mantissaGroup.appendChild(checkbox);
      }
    
}


//container.appendChild(signGroup);
//container.appendChild(exponentGroup);
//container.appendChild(mantissaGroup);
