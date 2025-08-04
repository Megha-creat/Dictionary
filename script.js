function searchWord() {
  const word = document.getElementById('wordInput').value.trim();
  const resultDiv = document.getElementById('result');

  if (!word) {
    resultDiv.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Word not found");
      }
      return response.json();
    })
    .then(data => {
      const definition = data[0].meanings[0].definitions[0].definition;
      const partOfSpeech = data[0].meanings[0].partOfSpeech;
      const phonetics = data[0].phonetics[0]?.text || '';

      resultDiv.innerHTML = `
        <h2>${word}</h2>
        <p><strong>Phonetic:</strong> ${phonetics}</p>
        <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
        <p><strong>Definition:</strong> ${definition}</p>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}
