const { App } = require('@slack/bolt');
const axios = require('axios');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

const invoke = async (command) => {
  const result = await axios.post(`http://${process.env.MR_SMITH_URL}/api/invoke`, { command });
  
  return result.data;
};

app.event('app_mention', async ({ event, say }) => {  
  console.log(event);
  const command = event.text.split('>')[1];
  const result = await invoke(command);

  say(result);
});

app.message(async ({ event, say }) => {
  console.log(event);
  const command = event.text;
  const result = await invoke(command);

  say(result);
});

// Start your app
(async () => {
  await app.start(3000);
  console.log('⚡️ Bolt app is running!');
})();
