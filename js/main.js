const API_KEY = "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";
const submitButton = document.querySelector("#submit");
const outputElement = document.querySelector("#output");
const inputElement = document.querySelector("input");
const historyElement = document.querySelector(".history");
const buttonElement = document.querySelector("button");

function changeInput(value) {
  const inputElement = document.querySelector("input");
  inputElement.value = value;
}

async function getMessage() {
  const options = {
    method: "POST",
    headers: {
      authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: inputElement.value },
      ],
      max_tokens: 100,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    outputElement.textContent = data.choices[0].message.content;

    if (data.choices[0].message.content && inputElement.value) {
      const pElement = document.createElement("p");
      pElement.textContent = inputElement.value;
      pElement.addEventListener("click", () =>
        changeInput(pElement.textContent)
      );
      historyElement.append(pElement);
    }
  } catch (error) {
    console.error(error);
  }
}

function clearInput() {
  inputElement.value = "";
}

submitButton.addEventListener("click", getMessage);

buttonElement.addEventListener("click", clearInput);
