const API_KEY = "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";
const submitButton = document.querySelector('#submit');
//const outPutElement = document.querySelector('#output');
const inputElement = document.querySelector('input');
const historyElement = document.querySelector(".history");
const div = document.querySelector("#outputText");
const outputCursor = document.getElementById("output-cursor");
let textGenerated = "this is a test";



async function getMessage() {
    console.log('clicked');
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "assistant", content: "answer as if your a confident financial advisor heres the question:"+inputElement.value }],
            temperature: 0.7,
            max_tokens: 150,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0
        })
    }


 

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await response.json();
        console.log(data);
        //outPutElement.textContent = data.choices[0].message.content
        textGenerated = data.choices[0].message.content;
        //if(data.choices[0].message.content){
            //const pElement = document.createElement('p');
            //pElement.textContent = inputElement.value
            //historyElement.append(pElement)
        //}    
        textTypingEffect(div, textGenerated, outputCursor);

    } catch (error) {
        console.error(error);
    }

}

function resetInputBox() {
    document.getElementById("input").value = '';
}

submitButton.addEventListener('click', getMessage);
submitButton.addEventListener('click', resetInputBox);

function textTypingEffect(element, text, cursorElement, i = 0) {
    if (i === 0) {
        element.textContent = "";
        cursorElement.style.visibility = "visible";
    }

    element.textContent += text[i];

    //const rect = element.getBoundingClientRect();
    //cursorElement.style.left = (rect.left + rect.width) + "px";

    if (i === text.length - 1) {
        cursorElement.style.visibility = "hidden";
        return;
    }

    setTimeout(() => textTypingEffect(element,text,cursorElement, i+1), 10);
}
