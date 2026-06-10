import { cannedFiles, commandHelp, openTargets } from './terminalCommands.js';

document.addEventListener('DOMContentLoaded', () => {
  const outputElement = document.getElementById('output');
  const inputElement = document.getElementById('command-input');
  const outputContainer = document.getElementById('output-container');
  const shortcutButtons = document.querySelectorAll('.shortcut-bar button');
  const commandHistory = [];
  let historyIndex = -1;
  let hasUsedTerminal = false;

  function scrollToBottom() {
    requestAnimationFrame(() => {
      outputContainer.scrollTop = outputContainer.scrollHeight;
    });
  }

  function appendLine(text, type = 'response') {
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.innerHTML = text;
    outputElement.appendChild(line);
    scrollToBottom();
  }

  function appendBlock(label, body) {
    const wrapper = document.createElement('div');
    wrapper.className = 'terminal-line response';
    wrapper.innerHTML = `
      <div class="response-block">
        <span class="response-label">${label}</span>
        <div>${body}</div>
      </div>
    `;
    outputElement.appendChild(wrapper);
    scrollToBottom();
  }

  function openWindow(key) {
    const target = openTargets[key];
    if (!target) {
      appendLine(`Unknown window: ${key}`, 'error');
      return;
    }
    window.parent.openPopup(target, key === 'wizard' ? 500 : 860, key === 'wizard' ? 400 : 640);
  }

  function handleCommand(raw) {
    const command = raw.trim();
    const [head, ...rest] = command.split(' ');
    const arg = rest.join(' ').trim();

    if (!command) return;

    if (head === 'clear') {
      outputElement.innerHTML = '';
      scrollToBottom();
      return;
    }

    if (head === 'help') {
      appendBlock('available commands', commandHelp.join('<br>'));
      return;
    }

    if (head === 'ls') {
      appendBlock('directory listing', Object.keys(cannedFiles).concat(Object.keys(openTargets).map((key) => `${key}/`)).join('<br>'));
      return;
    }

    if (head === 'whoami') {
      appendBlock('whoami', 'Claire Vlases — creative technologist, HCI researcher, artist, and person with too many tabs open in her brain.');
      return;
    }

    if (head === 'skills') {
      appendBlock('skills', 'design systems · creative coding · research synthesis · prototyping · visual storytelling · responsible tech');
      return;
    }

    if (head === 'projects') {
      appendBlock('projects', 'Try <code>open portfolio</code> for the main archive, or <code>open art</code> / <code>open planet</code> for more specific worlds.');
      return;
    }

    if (head === 'contact') {
      appendBlock('contact', `
        <div class="response-links">
          <a href="mailto:clairevlases@gmail.com">clairevlases@gmail.com</a><br>
          <a href="https://www.linkedin.com/in/clairevlases/" target="_blank" rel="noreferrer">linkedin</a> ·
          <a href="https://github.com/cvlases" target="_blank" rel="noreferrer">github</a>
        </div>
      `);
      return;
    }

    if (head === 'resume') {
      appendBlock('resume', `<a href="../assets/Vlases, Claire_Resume_May 2024.pdf" target="_blank" rel="noreferrer">Open resume PDF</a>`);
      return;
    }

    if (head === 'philosophy') {
      appendBlock('philosophy', 'Technology is for people, made by people. I care about usefulness, beauty, responsibility, and systems that hold up in the real world.');
      return;
    }

    if (head === 'joke') {
      appendBlock('terminal humor', 'I did not choose the Win95 life. The Win95 life chose me.');
      return;
    }

    if (head === 'open') {
      openWindow(arg.toLowerCase());
      appendLine(`Opening ${arg}...`, 'response');
      return;
    }

    if (head === 'cat') {
      const file = cannedFiles[arg];
      if (!file) {
        appendLine(`No such file: ${arg}`, 'error');
        return;
      }
      appendBlock(arg, file.replace(/\n/g, '<br>'));
      return;
    }

    appendLine(`Command not found: ${command}. Type 'help' for options.`, 'error');
  }

  appendBlock('boot log', 'System ready.<br>Type <code>help</code> to begin, or use one of the shortcuts above.');
  scrollToBottom();
  window.addEventListener('resize', scrollToBottom);

  function retirePlaceholder() {
    if (hasUsedTerminal) return;
    hasUsedTerminal = true;
    inputElement.placeholder = '';
  }

  inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!commandHistory.length) return;
      historyIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      inputElement.value = commandHistory[commandHistory.length - 1 - historyIndex];
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!commandHistory.length) return;
      historyIndex = Math.max(historyIndex - 1, -1);
      inputElement.value = historyIndex === -1 ? '' : commandHistory[commandHistory.length - 1 - historyIndex];
      return;
    }

    if (event.key !== 'Enter') return;
    const command = inputElement.value.trim();
    retirePlaceholder();
    appendLine(`guest@claire:~$ ${command}`, 'user');
    if (command) {
      commandHistory.push(command);
      historyIndex = -1;
    }
    handleCommand(command);
    inputElement.value = '';
  });

  shortcutButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const command = button.dataset.command;
      retirePlaceholder();
      appendLine(`guest@claire:~$ ${command}`, 'user');
      handleCommand(command);
      inputElement.focus();
    });
  });
});
