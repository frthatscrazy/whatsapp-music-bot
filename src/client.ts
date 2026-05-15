import { Telegraf } from 'telegraf';
import text from './language';
import { LANGUAGE, TELEGRAM_BOT_TOKEN } from './config';

if (!TELEGRAM_BOT_TOKEN) {
  console.error('TELEGRAM_BOT_TOKEN is not set in environment variables.');
  process.exit(1);
}

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
bot.launch().then(() => console.log(text[LANGUAGE].CONNECTED));

export default bot;
