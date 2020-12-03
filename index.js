require("dotenv").config();

const { Client } = require("discord.js");
const ytdl = require("ytdl-core");
const PREFIX = "?";

const client = new Client({ disableMentions: "true" });

client.on("ready", () => console.log("Active"));

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  //   const args = message.content.substring(PREFIX.length).split(" ");
  const ngaji = "https://www.youtube.com/watch?v=GJXvwsnZ-ww";

  if (message.content.startsWith(`${PREFIX}play`)) {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      return message.channel.send("Astagfirullah Akhi belom masuk channel");
    }

    const permissions = voiceChannel.permissionsFor(message.client.user);

    if (!permissions.has("CONNECT")) {
      return message.channel.send("Ya Akhi ga bisa connect ini");
    }
    if (!permissions.has("SPEAK")) {
      return message.channel.send("Hamba tidak bisa berbicara ya akhi");
    }

    try {
      var connection = await voiceChannel.join();
    } catch (error) {
      console.log(error);
      return message.channel.send("Aduh gabisa join hamba ya akhi");
    }

    const dispatcher = connection
      .play(ytdl(ngaji))
      .on("finish", () => {
        voiceChannel.leave;
      })
      .on("error", (error) => {
        console.log(error);
      });

    dispatcher.setVolumeLogarithmic(5 / 5);
  } else if (message.content.startsWith(`${PREFIX}stop`)) {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      return message.channel.send("Astagfirullah Akhi belom masuk channel");
    }

    message.member.voice.channel.leave();
    return null;
  }
});

client.login(process.env.TOKEN);
