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
    fetch('https://minecraft.tmisura.sk/api/upload_picture.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        picture_url: imageUrl,
        picture_title: '',  // Môžete pridať ďalšie údaje, ak je to potrebné
        picture_description: '',
        cat_id: 0  // Predpokladáme, že ID kategórie je 1
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Obrázok bol úspešne uložený!');
      } else {
        console.error('Chyba pri ukladaní obrázka: ' + data.message);
      }
    })
    .catch((error) => {
      console.error('Chyba:', error);
    });
  }
  
  