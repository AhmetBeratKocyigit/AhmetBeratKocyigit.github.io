
class CodeRunner {
    constructor() {
        this.attachEventListeners();
    }

    attachEventListeners() {
        document.addEventListener('click', this.handleRunButtonClick.bind(this));
    }

    handleRunButtonClick(event) {
        if (event.target.classList.contains('run-button')) {
            const runButton = event.target;
            const codeContainer = runButton.closest('.code-container');
            const codeElement = codeContainer.querySelector('.javascript-code');
            const outputContainer = codeContainer.nextElementSibling;
            const outputElement = outputContainer ? outputContainer.querySelector('.output') : null;

            if (codeElement && outputElement) {
                this.runCode(codeElement.textContent, outputElement);
            }
        }
    }

    runCode(codeToRun, outputElement) {
        outputElement.textContent = '';
        try {
            const customConsole = {
                log: (...args) => {
                    outputElement.textContent += args.join(' ') + '\n';
                }
            };
            const executeCode = new Function('console', codeToRun);
            executeCode(customConsole);
        } catch (error) {
            outputElement.textContent = `Hata: ${error}`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Tüm <code-compiler> etiketlerini işle
    document.querySelectorAll('code-compiler').forEach(el => {
        const codeText = el.textContent.trim();

        el.innerHTML = `
            <div class="code-container">
                <div class="code-header">
                    <span class="language">JavaScript</span>
                    <button class="run-button">Çalıştır</button>
                </div>
                <pre><code class="language-javascript javascript-code" contenteditable="true">${codeText}</code></pre>
            </div>
            <div class="output-container" style="margin-top: 30px;">
                <h2>Çıktı:</h2>
                <pre class="output"></pre>
            </div>
        `;
    });

    // Kod çalıştırıcıyı başlat
    new CodeRunner();
});

