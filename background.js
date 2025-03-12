chrome.runtime.onInstalled.addListener(() => {
    // Vytvorenie položky v kontextovej ponuke
    chrome.contextMenus.create({
      id: "sendImageUrl",
      title: "Odoslať URL obrázku do IS",
      contexts: ["image"],  // Tento príkaz sa zobrazí len pri obrázkoch
    });
  });
  
  // Ak používateľ klikne na položku v kontextovej ponuke
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "sendImageUrl") {
      const imageUrl = info.srcUrl; // Získame URL obrázku
  
      // Odošleme URL obrázku do informačného systému
      sendToInformationSystem(imageUrl);
    }
  });
  
  function sendToInformationSystem(imageUrl) {
    fetch('https://your-information-system.com/api', {
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
  