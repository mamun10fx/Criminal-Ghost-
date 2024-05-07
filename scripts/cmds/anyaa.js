const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

async function anya(api, event, args, message) {
  try {
    const text = args.join(" ").trim();

    if (!text) {
      return message.reply("ex: {p}anya {your question}");
    }

    const response = await axios.get(`https://anya-voiceai.vercel.app/kshitiz?text=${encodeURIComponent(text)}`);
    const { text: audioText, mp3Url } = response.data;

    const fileName = `audio_${Date.now()}.mp3`;
    const filePath = path.join(__dirname, 'cache', fileName);
    const writer = fs.createWriteStream(filePath);
    const audioResponse = await axios({
      url: mp3Url,
      method: 'GET',
      responseType: 'stream'
    });
    audioResponse.data.pipe(writer);

    writer.on('finish', () => {
      message.reply({
        body: `${audioText}`,
        attachment: fs.createReadStream(filePath)
      });
    });

  } catch (error) {
    console.error('Error:', error.message);
    message.reply("An error occurred while processing your request.");
  }
}

const anyaCommand = {
  name: 'anyaa',
  version: '2.0',
  author: 'Vex_Kshitiz',
  role: 0,
  longDescription: 'anya forger voce ai.',
  category: 'ai',
  guide: {
    en: '{p}anya {text}'
  }
};

module.exports = {
  config: anyaCommand,
  handleCommand: anya,
  onStart: function ({ api, message, event, args }) {
    return anya(api, event, args, message);
  }
};