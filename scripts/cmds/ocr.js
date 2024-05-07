const axios = require('axios');
module.exports = {
  config: {
    name: "ocr",
    version: "1.0",
    author: "OtinXSandip",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "extracts text"
    },
    longDescription: {
      en: "extracts text"
    },
    category: "tools",
    guide: {
      en: "reply to image"
    }
  },
  onStart: async function ({ api, event }) {
    if (event.type === "message_reply" && event.messageReply.attachments[0]?.type === "photo") {
      const attachment = event.messageReply.attachments[0];
      const imageURL = attachment.url;
      try {
        const ocrUrl = `https://api-test.yourboss12.repl.co/api/extract?url=${encodeURIComponent(imageURL)}`;
        const ocrResponse = await axios.get(ocrUrl);
        const extractedText = ocrResponse.data.ExtractedText;
        return api.sendMessage(extractedText, event.threadID, event.messageID);
      } catch (error) {
        console.log(error);
        return api.sendMessage('Failed to extract the text.', event.threadID, event.messageID);
      }
    } else {
      api.sendMessage("Please reply to an image to get extracted text", event.threadID, event.messageID);
    }
  }
};