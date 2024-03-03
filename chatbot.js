function insertText(text) {
    var inputBox = document.getElementById("prompt");
    inputBox.value = text;
}

function submitOnEnter(event) {
    if (event.which === 13 && !event.shiftKey) {
        if (!event.repeat) {
            const newEvent = new Event("submit", {cancelable: true})
            event.target.form.dispatchEvent(newEvent);
            event.target.value ="";
        }

        event.preventDefault();
    }
}

document.getElementById("prompt").addEventListener("keydown", submitOnEnter);