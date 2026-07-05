const axios = require('axios');

/**
 * Free Dictionary API'den kelime detaylarını çeken servis fonksiyonu
 * @param {string} word - Aranacak İngilizce kelime
 */
const fetchWordDetails = async (word) => {
    try {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const response = await axios.get(url);
        
        // API dizisi içinde ilk eşleşen veriyi alıyoruz
        const data = response.data[0];

        // Anlamı (Definition) ayıklama
        let definition = 'Anlam bulunamadı.';
        if (data.meanings && data.meanings[0].definitions && data.meanings[0].definitions[0]) {
            definition = data.meanings[0].definitions[0].definition;
        }

        // Örnek Cümleyi (Example) ayıklama
        let example = 'Örnek cümle bulunamadı.';
        if (data.meanings && data.meanings[0].definitions && data.meanings[0].definitions[0].example) {
            example = data.meanings[0].definitions[0].example;
        }

        // Telaffuz (Audio) linkini ayıklama (Orijinal planda tutmak istediğimiz alan)
        let audioUrl = null;
        if (data.phonetics && data.phonetics.length > 0) {
            const phoneticWithAudio = data.phonetics.find(p => p.audio !== '');
            if (phoneticWithAudio) audioUrl = phoneticWithAudio.audio;
        }

        return {
            english: data.word,
            definition: definition, // İngilizce açıklaması
            sample_sentence: example,
            audio_url: audioUrl
        };

    } catch (error) {
        console.error('Dış API bağlantı hatası:', error.message);
        throw new Error('Kelime dış sözlükte bulunamadı veya API hatası oluştu.');
    }
};

module.exports = {
    fetchWordDetails
};