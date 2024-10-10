import fetch from 'node-fetch';

const handler = async (m, {conn, text, args, usedPrefix, command, isROwner, isOwner, isMods, isPrems}) => {

if (isOwner) {

let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }


  if (!text) {
  
  await conn.sendMessage(m.chat, { text: `*❲ ❗ ❳ لم يتم إدخال رابط.*\nيرجي ادخال رابط مثال :\n> ➤  ${usedPrefix + command} https://vm.tiktok.com/ZM686Q4ER/` }, { quoted: fkontak });
  
  await conn.sendMessage(m.chat, { react: { text: '❗', key: m.key } });
  
  return;
  }
  
    if (!/tiktok/.test(text)) {
  
  await conn.sendMessage(m.chat, { text: `*❲ ❗ ❳ حدث خطأ عند البحث عن الرابط .*\nيرجي ادخال رابط صحيح مثال :\n> ➤  ${usedPrefix + command} https://vm.tiktok.com/ZM686Q4ER/` }, { quoted: fkontak });
  
  await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  
  return;
  }
  
  
await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } });

try {

const response = await fetch(`https://deliriusapi-official.vercel.app/download/tiktok?url=${text}`);

const data = await response.json()
const { author, meta, music, title, duration, like, share, comment, download, published} = data.data

const cap2 = `*\`تفضل طلبك يا صديقي 🍿❤️\`*\n\n⌲ العنوان : ${title}\n⌲ الحجم : ${meta.media[0].size_hd}\n⌲ المدة : ${duration}\n⌲ الاعجابات : ${like}\n⌲ المشاركات : ${share}\n⌲ التحميلات : ${download}\n⌲ التعليقات : ${comment}\n⌲ النشر : ${published}\n⌲ الحساب : ${author.username}\n⌲ الصانع : ${author.nickname}\n⌲ الصوت : ${music.title}\n⌲ المنتج : ${music.author}`;


//await conn.sendMessage(m.chat, {video: {url: meta.media[0].hd}, mimetype: , tiktok.mp4, caption: cap2}, {quoted: m});

await conn.sendMessage(m.chat, {video: {url: meta.media[0].hd}, mimetype: 'video/mp4', fileName: 'tiktok.mp4', caption: cap2}, {quoted: fkontak});

await conn.sendMessage(m.chat, {audio: {url: meta.media[0].hd}, mimetype: 'audio/mpeg', fileName: 'tiktok.mp3'}, {quoted: fkontak});

//conn.sendFile(m.chat, meta.media[0].hd, 'tiktok.mp4', cap2, m) mimetype: fileName

await conn.sendMessage(m.chat, { react: { text: '👌🏻', key: m.key } });

} catch {
 await conn.sendMessage(m.chat, { text: `*\`❲ ❗ ❳ حدث خطأ عند البحث عن الرابط .\`*\nيرجي ادخال رابط صحيح مثال :\n> ➤  ${usedPrefix + command} https://vm.tiktok.com/ZM686Q4ER/` }, { quoted: fkontak });
 
 await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }

} else if (isROwner){
} else if (isMods){
} else if (isPrems){
} else {

  if (!text) {
  
  await conn.sendMessage(m.chat, { text: `*❲ ❗ ❳ لم يتم إدخال رابط.*\nيرجي ادخال رابط مثال :\n> ➤  ${usedPrefix + command} https://vm.tiktok.com/ZM686Q4ER/` }, { quoted: m });
  
  await conn.sendMessage(m.chat, { react: { text: '❗', key: m.key } });
  
  return;
  }
  
    if (!/tiktok/.test(text)) {
  
  await conn.sendMessage(m.chat, { text: `*❲ ❗ ❳ حدث خطأ عند البحث عن الرابط .*\nيرجي ادخال رابط صحيح مثال :\n> ➤  ${usedPrefix + command} https://vm.tiktok.com/ZM686Q4ER/` }, { quoted: m });
  
  await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  
  return;
  }
  
await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } });

try {
const dataFn = await conn.getFile(`${global.MyApiRestBaseUrl}/api/tiktokv2?url=${args[0]}&apikey=${global.MyApiRestApikey}`);
const cap2 = `تفضل طلبك يا صديقي 🧞`;

await conn.sendMessage(m.chat, {video: dataFn.data, caption: cap2}, {quoted: m});

await conn.sendMessage(m.chat, { react: { text: '👌🏻', key: m.key } });

} catch {
 await conn.sendMessage(m.chat, { text: `*❲ ❗ ❳ حدث خطأ عند البحث عن الرابط .*\nيرجي ادخال رابط صحيح مثال :\n> ➤  ${usedPrefix + command} https://vm.tiktok.com/ZM686Q4ER/` }, { quoted: m });
 
 await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
  
  }
};

handler.command = /^(تيك)$/i;
export default handler;
