// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Partials } = require("discord.js");
const { token, oaiKey } = require("./config.json");
const { OpenAI } = require("openai");
// const fetch = require('node-fetch');

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    // GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// OpenAI API
const openai = new OpenAI({
  apiKey: oaiKey,
});

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Hacky workaround for only allowing certain users to trigger the command and prompts based on Discord users.
// message.author.username from the Discord object
const allowedUsers = ["bob"];

// Listen for message events and do something
client.on("messageCreate", async (message) => {
  console.log(message.author.username + ": " + message.content);
  const parseCmd = message.content.substring(0, 6);

  // Avoid infinite loops with the bot
  if (message.author.bot) return;

  // Remind the user the benefits of weekly meetings
  if (message.content == "Randy" || message.content == "randy") {
    message.reply(
      "Personally, I like face-to-face zoom meetings where I get to learn about company culture. It helps me stay centered and engaged."
    );
  }

  // Make sure users are safe at all times
  if (message.content == "pool" || message.content == "Pool") {
    message.reply("Welfare check on Joel");
  }

  // Reminds users why they must dad-game
  if (message.content == "cs2" || message.content == "CS2") {
    message.reply(
      "They always got caught with their nades out.. What a shame."
    );
  }

  if (allowedUsers.includes(message.author.username) && parseCmd === "!craft") {
    const promptCapture = message.content.replace("!craft ", "");
    console.log("Prompt: " + promptCapture);

    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: promptCapture,
      n: 1,
      size: "1024x1024",
    });

    message.reply(response.data[0].url);
  } else if (
    !allowedUsers.includes(message.author.username) &&
    parseCmd === "!craft"
  ) {
    message.reply("You do not have permissions.");
  } else {
    console.log("Doing nothing.");
  }
});

// Log in to Discord with your client's token
client.login(token);
