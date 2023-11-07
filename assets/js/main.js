// AUFGABE: - Die Caesar-Verschlüsselung ist ein einfaches symmetrisches Verschlüsselungsverfahren, das auf der monographischen und monoalphabetischen Substitution basiert. Bei der Verschlüsselung wird jeder Buchstabe des Klartexts auf einen Geheimtextbuchstaben abgebildet. Diese Abbildung ergibt sich, indem man die Zeichen eines geordneten Alphabets um eine bestimmte Anzahl zyklisch nach rechts verschiebt (rotiert); zyklisch bedeutet, dass man beim Verschieben über Z hinaus wieder bei A anfangend weiterzählt. Die Anzahl der verschobenen Zeichen bildet den Schlüssel, der für die gesamte Verschlüsselung unverändert bleibt.
// - BEISPIEL verschiebung um 3 Zeichen: - Klartext-Alphabet: a b c d e f g h i j k l m n o p q r s t u v w x y z
//                                      - Geheimtextalphabet: D E F G H I J K L M N O P Q R S T U V W X Y Z A B C
// --> Schlüssel: 3
// - Dann erstelle eine HTML-Seite mit einem Formular, in dem User:innen zwischen Kodierung und Dekodierung wählen können.
// - Das Formular hat zwei Eingaben (die Zeichenfolge und den Schlüssel) und eine Ausgabe (das verschlüsselte Ergebnis).

// !! genutzter blog-eintrag zur Lösung der aufgabe: https://keithwilliams-91944.medium.com/caesar-cipher-solution-in-javascript-d8221984d61

// GENERALS:

const textInput = document.body.querySelector('#text-input');
const keyInput = document.body.querySelector('#key-input');
const encoderButton = document.body.querySelector('#encoder');
const decoderButton = document.body.querySelector('#decoder');
const textOutput = document.body.querySelector('#text-output');

// const alphabetArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; --> irrelevant



encoderButton.addEventListener('click', () => {
    const input = textInput.value.toLowerCase().replaceAll(" ", "");
    const key = Number(keyInput.value); // weil alles aus html string ist muss key zu number werden, damit wir es innerhalb der schleife für unseren shift verwenden können

    let resultArr = [];
    // 1. loop, der durch einzelne buchstaben des inputs iteriert
    for (let i = 0; i < input.length; i++){
        // console.log(input[i]);
        // 2. variable definieren der wir den ASCII code (alphabet: 97 - 122) für die geshifteten buchstaben zuweisen (mit charCodeAt() methode können wir den richtigen index des buchstabens im ascii code identifizieren)
        let asciiCodePlusKey = input.charCodeAt(i) + key;

        // 3. neuer loop, damit nummern größer 122 ab 97 geshiftet werden
        while (asciiCodePlusKey > 122) {
            asciiCodePlusKey = (asciiCodePlusKey - 122) + 96;
        }
        // 4. jetzt soll der geshiftete ascii code wieder zu einem buchstaben werden, dafür nutzt man die fromCharCode() methode; gleichzeitig wandeln wir den buchstaben in string um und pushen ihn ins leere Array resultArr
        resultArr.push(String.fromCharCode(asciiCodePlusKey));
        // --> jetzt haben wir ein array mit den verschlüsselten buchstaben

        // console.log(resultArr);    
    }

    // 5. mit der join('') methode kann das array jetzt wieder in einen string umgewandelt werden und der verschlüsselte text kann ausgegeben werden:
    textOutput.textContent = resultArr.join('');
    
});


decoderButton.addEventListener('click', () => {
    const input = textOutput.textContent;
    // console.log(input);
    const key = Number(keyInput.value); 
    let decodedArr = [];

    for (i = 0; i < input.length; i++){
        let asciiCodeMinusKey = input.charCodeAt(i) - key;

        while(asciiCodeMinusKey < 97){
            asciiCodeMinusKey = (asciiCodeMinusKey - 96) + 122;
        }
        decodedArr.push(String.fromCharCode(asciiCodeMinusKey));
    }

    textOutput.textContent = decodedArr.join('');
})