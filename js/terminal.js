document.addEventListener("DOMContentLoaded", () => {
    const outputElement = document.getElementById("output");
    const inputElement = document.getElementById("command-input");
    const outputContainer = document.getElementById("output-container");

  
    const commands = {
      help: "Available commands: help, about, projects, contact, clear",
      about: "Hi! I'm Claire, a computer science and philosophy major passionate about AI and sustainability.",
      projects: 'Check out my projects at: <a href="https://github.com/cvlases" target="_blank">https://github.com/cvlases</a>',
      contact: "Email: clairevlases@gmail.com | LinkedIn: <a href='https://linkedin.com/in/clairevlases' target='_blank'>linkedin.com/in/clairevlases</a>",
      clear: null, // Special case to clear terminal
    };
  
    function appendOutput(text, type) {
        const line = document.createElement("div");
        line.className = type; // Add a class based on the type (user or response)
        line.innerHTML = text; // Render the text as HTML
        outputElement.appendChild(line);
        outputContainer.scrollTop = outputContainer.scrollHeight; // Auto-scroll to the bottom
      }


      function handleCommand(command) {
        if (command === "clear") {
          outputElement.innerHTML = ""; // Clear terminal output
        } else if (commands[command]) {
          appendOutput(commands[command], "response"); // Append as a computer response
        } else {
          appendOutput(`Command not found: ${command}. Type 'help' for a list of commands.`, "response");
        }
      }
  
    inputElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const command = inputElement.value.trim();
        appendOutput(`guest@claire:~$ ${command}`, "user"); // Echo the user's command
        handleCommand(command.toLowerCase());
        inputElement.value = ""; // Clear the input field
      }
    });
});
  