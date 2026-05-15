import bot from './client';
import commands from './commands';
import { PREFIX } from './config';

const allCommands = ['play', 'help'];

bot.on('text', async ctx => {
  const messageText = ctx.message?.text || '';
  if (!messageText.startsWith(PREFIX)) return;

  const [command, ...rest] = messageText.split(' ');
  const content = rest.join(' ');

  if (!allCommands.includes(command.substring(1))) return;

  const adapter = {
    reply: (text: string) => ctx.reply(text),
    sendFile: (path: string) => ctx.replyWithAudio({ source: path }),
  };

  try {
    await commands[command].run(adapter, content);
  } catch (err) {
    console.error(err);
    await ctx.reply('An error occurred');
  }
});
