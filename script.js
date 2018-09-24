const SpeechRecognition = webkitSpeechRecognition;
let recording = false;

const getSpeech = () => {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.start();
  recognition.continuous = false;
  recognition.interimResults = true;
  recording = true;
  console.log('started rec');

  recognition.onresult = event => {
    const speechResult = event.results[0][0].transcript;
    console.log('result: ' + speechResult);
    console.log('confidence: ' + event.results[0][0].confidence);
    // document.querySelector('#speech-div').textContent = speechResult;
    let speechArray = speechResult.split(' ');
    getEmoji(speechArray);
  };

  recognition.onend = () => {
    // for "endless" mode, comment out the next line and uncomment getSpeech()
    // recognition.stop();
    getSpeech();

  };

  recognition.onerror = event => {
    console.log('something went wrong: ' + event.error);
  };
  };


const getEmoji = speechArray => {

// let url = `https://unpkg.com/emoji.json/emoji.json`;
let url = 'emoji.json';
fetch(url)
  .then(response => response.json())
  .then(data => {
    for (j=0; j<speechArray.length; j++){
      let emojiWord=" ";
      for (i=0; i<data.length; i++){
        keyArray = data[i].keywords.split(', ');
        console.log(keyArray);
        for (k=0; k<keyArray.length; k++){
          if (speechArray[j]==keyArray[k]){
            emojiWord = data[i].char;
        }
        //yields about 1600 emojis
        //if (data[i].keywords == "flag"){
          // console.log(data[i].char);
          // document.getElementById("emoji-div").innerHTML+=data[i].char;
        }
       }
        document.getElementById("emoji-div").innerHTML+=emojiWord;
      //render html here, will happen once per word
    }

  });
}


  document.querySelector('#my-button').onclick = () => {
    document.getElementById("emoji-div").innerHTML=' ';
    document.getElementById('my-button').id = 'my-button-clicked';
    console.log('clickity');
    getSpeech();
  };
