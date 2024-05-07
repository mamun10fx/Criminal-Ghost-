module.exports = {
  config: {
    name: "clear300",
    aliases: ["clr300"],
    author: "kshitiz",  
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "unsent all messages sent by bot"
    },
    category: "𝗕𝗢𝗫",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async function ({ api, event }) {

    const unsendBotMessages = async () => {
      const threadID = event.threadID;


      const botMessages = await api.getThreadHistory(threadID, 300); // Adjust the limit as needed 50 = 50 msg


      const botSentMessages = botMessages.filter(message => message.senderID === api.getCurrentUserID());


      for (const message of botSentMessages) {
        await api.unsendMessage(message.messageID);
      }
    };


    await unsendBotMessages();
  }
};