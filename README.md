# crftBOT
A quick proof of concept for a Discord bot integrated with DALL-E.

## Notes
This is not a very efficient implementation. Some things to consider:
1. This implementation listens for every message event. A better approach would be to use Discord's [Slash Commands](https://discord.com/developers/docs/interactions/application-commands#slash-commands).
2. There is no rate limiting.
3. The bot responds with a link directly from OpenAI -- you may not want to expose this. 

## Setup
1. You'll need a Discord bot token and an OpenAI API key to run this. 
2. Create a `config.json` file in your root folder to place the credentials.
3. `npm install`
4. Run the Node server to bring the bot online.

### Example config.json
```
{
	"token": "abc",
	"oaiKey": "123"
}
```

## Usage
Once the bot is running, it will listen for messages that start with `!craft` and respond with a generated image from DALL-E. 