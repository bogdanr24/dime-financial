import openai

openai.api_key = "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"

messages = []
system_msg = "a confident financial advisor"
messages.append({"role": "system", "content": system_msg})
print("Your assistant is ready!") #a debug statement

while True:
    user_input = input("Please enter your question: ")
    if user_input == "!quit":
        break
    messages.append({"role": "user", "content": user_input})
    response = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)
    reply = response["choices"][0]["message"]["content"]
    messages.append({"role": "assistant", "content": reply})
    print("Finbot: " + reply)
