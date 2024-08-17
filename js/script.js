document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('result');
    const expressionDisplay = document.getElementById('expression');
    const historyList = document.getElementById('historyList');
    const historySection = document.getElementById('history');
    const historyBtn = document.getElementById('historyBtn');
    const modeBtn = document.getElementById('modeBtn');
    const calculator = document.querySelector('.calculator');
    const scientificButtons = document.querySelector('.scientific-buttons');
    
    let expression = '';
    let resultShown = false;
    let history = [];

    function updateDisplay() {
        if (resultShown) {
            try {
                display.textContent = eval(expression) || '0';
            } catch {
                display.textContent = 'Error';
            }
        } else {
            display.textContent = expression || '0';
        }
        expressionDisplay.textContent = expression;
    }

    function updateHistory() {
        historyList.innerHTML = '';
        history.forEach((entry) => {
            const li = document.createElement('li');
            li.textContent = entry;
            li.addEventListener('click', () => {
                expression = entry;
                resultShown = false;
                updateDisplay();
                historySection.style.display = 'none'; // Oculta o histórico ao reutilizar uma operação
            });
            historyList.appendChild(li);
        });
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            if (value === 'C') {
                expression = '';
                resultShown = false;
            } else if (value === '=') {
                try {
                    expression = eval(expression).toString();
                } catch {
                    expression = 'Error';
                }
                resultShown = true;
                if (!history.includes(expression)) {
                    history.push(expression);
                    updateHistory();
                }
            } else {
                if (resultShown) {
                    expression = ''; // Limpa a expressão após mostrar o resultado
                    resultShown = false;
                }
                expression += value;
            }
            updateDisplay();
        });
    });

    document.addEventListener('keydown', function (event) {
        const key = event.key;
        if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
            if (resultShown) {
                expression = ''; // Limpa a expressão após mostrar o resultado
                resultShown = false;
            }
            expression += key;
        } else if (key === 'Enter' || key === '=') {
            try {
                expression = eval(expression).toString();
            } catch {
                expression = 'Error';
            }
            resultShown = true;
            if (!history.includes(expression)) {
                history.push(expression);
                updateHistory();
            }
        } else if (key === 'Backspace') {
            expression = expression.slice(0, -1);
        } else if (key.toLowerCase() === 'c' || key === 'Escape') {
            expression = '';
            resultShown = false;
        }
        updateDisplay();
    });

    historyBtn.addEventListener('click', () => {
        historySection.style.display = (historySection.style.display === 'none' || historySection.style.display === '') ? 'block' : 'none';
    });

    modeBtn.addEventListener('click', () => {
        calculator.classList.toggle('scientific');
        scientificButtons.classList.toggle('active');
        updateDisplay();
    });
});
