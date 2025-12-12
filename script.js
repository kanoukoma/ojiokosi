let recognition;
    let isRecognizing = false;

    if ("webkitSpeechRecognition" in window) {
      recognition = new webkitSpeechRecognition();
      recognition.lang = "en-US"; // 言語固定（自動検出は削除）
      recognition.interimResults = true;
      recognition.continuous = true;

      recognition.onresult = function (event) {
        let result = "";
        for (let i = 0; i < event.results.length; i++) {
          result += event.results[i][0].transcript;
        }
        document.getElementById("transcription").innerText = result;
      };

      recognition.onerror = function (event) {
        console.error("Error:", event.error);
      };
    } else {
      alert("このブラウザは音声認識に対応していません。");
    }

    document.getElementById("startBtn").onclick = () => {
      if (!isRecognizing) {
        isRecognizing = true;
        recognition.start();
      }
    };

    document.getElementById("stopBtn").onclick = () => {
      if (isRecognizing) {
        isRecognizing = false;
        recognition.stop();
      }
    };

    document.getElementById("clearBtn").onclick = () => {
      document.getElementById("transcription").innerText = "";
    };