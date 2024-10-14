import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    const name = "غوجو"; // اسم الشخصية
    const anime = "ججتسو كايسن"; // اسم الأنمي
    const techNews = `╔════▣◎▣════╗\n لاتنسى يا حب تعمل فولو هنا وانت معدي 🫵🥰\n https://whatsapp.com/channel/0029VamtPU8EKyZLsLtKsJ0j\n+\n رقمي لو حصلت معاك اي مشكله\n  https://wa.me/967783179256\n╚════▣◎▣════╝`;

    if (!text) {
      return conn.reply(m.chat, `*انا ${name} كيف يمكنني مساعدتك* \n\n*مثال:* .${command} هلا كيفك عرفني عن نفسك`, m);
    }

    const response = await fetch(`https://joanimi-apis-for-devs.vercel.app/api/cai/v1?name=${name}&anime=${anime}&text=${text}`);
    const data = await response.json();
    const result = data.result;

    if (!result) {
      return conn.reply(m.chat, 'للاسف مافيش اجابه.', m);
    }

    // إعداد المحتوى الذي سيتم إرساله مع الزر
    const captionn = result + '\n\n' + techNews;
    const link = 'https://wa.me/967783179256';

    // إرسال الرد مع زر ".غوجو"
    await conn.sendButton(
      m.chat, 
      captionn, 
      ' > GOJO | 🐼❤️', 
      link, 
      [['✨ الاجابه مره اخرى 🐥', `.غوجو ${text}`]], 
      m
    );
    
  } catch (error) {
    throw error;
  }
};

handler.help = ['كيلوا'];
handler.tags = ['ai'];
handler.command = /^(غوجو|gojo)$/i;
export default handler;
