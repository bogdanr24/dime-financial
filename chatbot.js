import { config } from "dotenv" // used to get the api key from the env file along with its configs
config()

import OpenAI from "openai" // Open AI import
import readline from "readline" //the module used to listen for user inputs and wait
//the key related stuff
const openAi = new OpenAI(
  {
    apiKey: process.env.OPEN_AI_API_KEY,
  }
)

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Listening for user input events
userInterface.prompt()
console.log("User: ", "");


userInterface.on("line", async input => {
  if (input.toLowerCase() === "goodbye") {
    console.log("Goodbye!");
    userInterface.close();
    return;
  }
  const airesponse = await openAi.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  })
    // Displays the api's output
  console.log("Finbot:", airesponse.choices[0].message.content)

    // Prompting the user for input again
  console.log("User: ", "");
  userInterface.prompt()
})