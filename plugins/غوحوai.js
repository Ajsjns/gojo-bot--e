import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    const name = "غوجو"; // Character name
    const anime = "ججتسو كايسن "; // Anime name
    const techNews = `╔════▣◎▣════╗\n متنساش يا حب تعمل فولو هنا وانت معدي 🫵🥰م\nhttps://whatsapp.com/channel/0029VaJxI9uJkK7BedTH0D11\n+\n رقمي لو حصلت معاك اي مشكله\n  https://wa.me/201141550162\n╚════▣◎▣════╝`;

    if (!text) {
      return conn.reply(m.chat, `*انا ${name} كيف يمكنني مساعدتك* \n\n*مثال:* .${command} هلا كيفك عرفني عن نفسك`, m);
    }

    const response = await fetch(`https://joanimi-apis-for-devs.vercel.app/api/cai/v1?name=${name}&anime=${anime}&text=${text}`);
    const data = await response.json();
    const result = data.result;

    if (!result) {
      return conn.reply(m.chat, 'للاسف مافيش اجابه.', m);
    }

    // Send the result and tech news
    conn.reply(m.chat, result + '\n\n' + techNews, m);
  } catch (error) {
    throw error;
  }
};

handler.help = ['كيلوا'];
handler.tags = ['ai'];
handler.command = /^(غوجو|gojo)$/i;
export default handler;
