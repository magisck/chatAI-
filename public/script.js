const chatBox = document.getElementById("chatBox");

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.innerText = text;

  chatBox.appendChild(div);

  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById("messageInput");

  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");

  input.value = "";

  addMessage("AI正在输入...", "ai");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text
      })
    });

    const data = await response.json();

    chatBox.lastChild.remove();

    addMessage(data.reply, "ai");
  } catch (error) {
    chatBox.lastChild.remove();

    addMessage("回复失败", "ai");
  }
}
