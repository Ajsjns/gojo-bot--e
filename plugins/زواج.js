let toM = a => '@' + a.split('@')[0];

async function handler(m, { groupMetadata, conn }) {
    let ps = groupMetadata.participants.map(v => v.id);
    let a = ps.getRandom();
    let b;
    do b = ps.getRandom();
    while (b === a);

    const captionn = `*${toM(a)}, الف مبروك للعريس🥳✨*\n*${toM(b)}, الف مبروك للعروسه🥳✨*\n\n*ملاحظه: ذا منشن عشوائي للمرح فقط، إذا لم يعجبك الأمر لاتستخدمه💗*`;
    const link = 'http://example.com'; // أدخل الرابط الذي تريد استخدامه هنا

    // إرسال الزر مع الرسالة
    await conn.sendButton(m.chat, captionn, ' > Gojo | 🐼❤️', link, [['🔄 اتنين كمان 👩‍❤️‍👨', `.زواج`]], m);
}

handler.help = ['formarpareja'];
handler.tags = ['main', 'fun'];
handler.command = ['formarpareja', 'زواج'];
handler.group = true;

export default handler;
