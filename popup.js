const inputText = document.querySelector('#input');
const translateBtn = document.querySelector('.translate-button');
const output = document.querySelector('#output');
const copyBtn = document.querySelector('.copy');
const pasteBtn = document.querySelector('.paste');
// Translate when translate button clicked
translateBtn.addEventListener('click', () => {
    translateText(inputText.value).then((text) => {
        output.value = text;
        enableButton(copyBtn);
    });
});

inputText.addEventListener('input', () => {
    if (inputText.value && translateBtn.disabled === true) {
        enableButton(translateBtn);
    } else if (!inputText.value) {
        disableButton(translateBtn);
    }
});

//Paste button
pasteBtn.addEventListener('click', () => {
    pasteText(inputText);
});

//Copy text button
copyBtn.addEventListener('click', () => copyText(output));

//Enable button
function enableButton(button) {
    button.disabled = false;
    button.classList.add('enabled');
}

//Disable button
function disableButton(button) {
    button.disabled = true;
    button.classList.remove('enabled');
}

//Paste text
async function pasteText(textarea) {
    textarea.select();
    document.execCommand('paste');
    textarea.unselect();
}

// Copy output text to clipboard
function copyText(copyarea) {
    const text = copyarea.value;
    navigator.clipboard.writeText(text);
}

// Api call to translate text. Returns the translated text
async function translateText(text) {
    output.innerHTML = 'Loading...';
    const res = await fetch(
        `https://google-translate20.p.rapidapi.com/translate?text=${text}&tl=en`,
        {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'google-translate20.p.rapidapi.com',
                'x-rapidapi-key':
                    '9cc82d9b21mshc5b0f3ff413cec4p1dd0f8jsn310b17ac1b65',
            },
        }
    );

    const data = await res.json();
    return data.data.translation;
}
