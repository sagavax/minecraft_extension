chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    for (let i = 0; i < details.responseHeaders.length; i++) {
      if (details.responseHeaders[i].name.toLowerCase() == 'content-security-policy') {
        // Odstránime CSP alebo pridáme povolený server
        details.responseHeaders[i].value = details.responseHeaders[i].value.replace("connect-src 'self'", "connect-src 'self' https://minecraft.tmisura.sk");
      }
    }
    return {responseHeaders: details.responseHeaders};
  },
  {urls: ["https://minecraft.tmisura.sk/*"]},
  ["blocking", "responseHeaders"]
);


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
    fetch('http://localhost/minecraft/api/upload_picture.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        picture_url: 'https://i.pinimg.com/736x/90/89/04/908904ed5d080c53eedaf6f6e43ec903.jpg',
        picture_path: 'https://i.pinimg.com/736x/90/89/04/908904ed5d080c53eedaf6f6e43ec903.jpg',
        picture_name: 'https://i.pinimg.com/736x/90/89/04/908904ed5d080c53eedaf6f6e43ec903.jpg',
        picture_title: '',
        picture_description: '',
        cat_id: 0
      })
    })
    .then(response => {
      // Skontrolujeme, či odpoveď obsahuje JSON alebo iný obsah
      return response.text();  // Prečítame odpoveď ako text
    })
    .then(text => {
      try {
        const data = JSON.parse(text);  // Pokúsime sa parsovať text ako JSON
        console.log('Server response:', data);
        if (data.success) {
          console.log('Obrázok bol úspešne uložený!');
        } else {
          console.error('Chyba pri ukladaní obrázka: ' + data.message);
        }
      } catch (e) {
        console.error('Chyba pri parsovaní JSON:', e);
        console.log('Odpoveď nie je validný JSON. Obsah odpovede:', text);  // Zobrazíme textovú odpoveď
      }
    })
    .catch((error) => {
      console.error('Chyba pri požiadavke:', error);
    });
  }
  
  