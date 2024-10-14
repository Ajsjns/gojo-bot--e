let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender);
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
    let message = `*˼❄️˹┊「 مرحبآ ↫ ${taguser}」*\n> تكلم عن نفسك اسمي غوجو \n لعرض الاوامر .اوامر ومتنسى ال (.) اذا احتجت شي المطور اكتب  .مطور \n*✧━━ • ━ 「  ✤  」 ━ • ━━✧*
\n> ❯⏐ 𝐆𝐎𝐉𝐎⚡𝐁𝐎𝐓`;
    conn.sendFile(m.chat, 'https://telegra.ph/file/8ae6adf5b8437c417968c.mp4','image.jpg', message, m);
};

handler.customPrefix = /^(بوت)$/i;
handler.command = new RegExp;

export default handler;
