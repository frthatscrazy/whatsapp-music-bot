import Downloader from '../services/download';
import Searcher from '../services/search';
import text from '../language';
import { LANGUAGE } from '../config';

export default {
  run: async (message: any, keyword: string): Promise<any> => {
    const downloader = new Downloader();
    const searcher = new Searcher();
    try {
      const { title, videoId } = await searcher.handle(keyword);
      await message.reply(`${text[LANGUAGE].FOUNDED} "${title}"`);

      await message.reply(text[LANGUAGE].DOWNLOAD_STARTED);

      const music = await downloader.handle(videoId);

      await message.sendFile(music);
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return message.reply(text[LANGUAGE].ERROR);
    }
  },
  help: text[LANGUAGE].HELP_PLAY,
};
