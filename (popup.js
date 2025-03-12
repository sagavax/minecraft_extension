document.getElementById('sendButton').addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: getImageUrl
      });
    });
  });
  
  function getImageUrl() {
    const images = document.getElementsByTagName('img');
    if (images.length > 0) {
      const imageUrl = images[0].src; // Získa URL prvého obrázka
      sendToInformationSystem(imageUrl);
    } else {
      alert('Žiadny obrázok na stránke!');
    }
  }
  
  function sendToInformationSystem(imageUrl) {
    fetch('https://minecraft.tmisura.sk/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl: imageUrl })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }