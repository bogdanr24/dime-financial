const openai = require('openai');

openai.apiKey = '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';

let messages = [];

let system_msg = "finance bot";
messages.push({ role: "system", content: system_msg });

console.log("Your new assistant is ready!");

while (true) {
    let user_input = prompt(); 
    if (user_input === "quit()") break;

    messages.push({ role: "user", content: user_input });

    let response = await openai.ChatCompletion.create({
        model: "gpt-3.5-turbo",
        messages: messages
    });

    let reply = response.data.choices[0].message.content;
    messages.push({ role: "assistant", content: reply });

    console.log("Assistant: " + reply);
}
