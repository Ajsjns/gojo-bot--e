import cp, { exec as _exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import axios from 'axios';
import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const exec = promisify(_exec).bind(cp);

const handler = async (m, { conn, isROwner, usedPrefix, command, text }) => {
    const ar = Object.keys(plugins);
    const ar1 = ar.map((v) => v.replace('.js', ''));

    const images = [
        'https://telegra.ph/file/ba984d78fa802662438ee.jpg',
        'https://telegra.ph/file/0e22282b399e105776618.jpg',
        'https://telegra.ph/file/5e6456d22a8264b08a2bc.jpg',
        'https://telegra.ph/file/996f53288a1e2f4f35812.jpg'
    ];

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const mediaMessage = await prepareWAMessageMedia({ image: { url: randomImage } }, { upload: conn.waUploadToServer });

    if (!text) {
        const rows = ar1.map((v, index) => (
            {
                header: `الملــف رقـم : [${index + 1}]`,
                title: `${v}`,
                description: '',
                id: `${usedPrefix + command} ${v}` // تهيئة معرف الزر لإرجاع اسم الملف
            }
        ));

        const caption = `╭─────────────────────────╮\n\n│ قائــمة ملفــات plugins.\n\n│ عدد الملفات المتاحة: ${ar1.length}\n\n
        *اختر ملف الذي تريد حذفه*\n\n
        ╰─────────────────────────╯`;

        const msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        body: { text: caption },
                        footer: { text: wm },
                        header: {
                            hasMediaAttachment: true,
                            imageMessage: mediaMessage.imageMessage
                        },
                        nativeFlowMessage: {
                            buttons: [
                                {
                                    name: 'single_select',
                                    buttonParamsJson: JSON.stringify({
                                        title: '「 قــائــمــة الملفــات 」',
                                        sections: [
                                            {
                                                title: '「 قائــمة ملفــات plugins 」',
                                                highlight_label: wm,
                                                rows: rows
                                            }
                                        ]
                                    })
                                }
                            ]
                        }
                    }
                }
            }
        }, { userJid: conn.user.jid, quoted: m });

        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
        return;
    }

    // حذف الملف بناءً على الاختيار
    const selectedFile = text.trim();
    if (ar1.includes(selectedFile)) { // تحقق من أن الملف موجود في القائمة
        const filePath = `plugins/${selectedFile}.js`;

        try {
            fs.unlinkSync(filePath);
            await conn.sendMessage(m.chat, { text: `تم حذف الملف ${selectedFile}.js بنجاح.` }, { quoted: m });
        } catch (error) {
            await conn.sendMessage(m.chat, { text: `فشل في حذف الملف ${selectedFile}.js: ${error.message}` }, { quoted: m });
        }
        return;
    }

    // عرض محتوى الملف إذا كان نص المدخل ليس "حذف" أو غير موجود في القائمة
    let o;
    try {
        o = await exec(`cat plugins/${text}.js`);
    } catch (e) {
        o = e;
    }

    const { stdout, stderr } = o;
    if (stdout.trim()) {
        const aa = await conn.sendMessage(m.chat, { text: stdout }, { quoted: m });
        await conn.sendMessage(m.chat, {
            document: fs.readFileSync(`./plugins/${text}.js`),
            mimetype: 'application/javascript',
            fileName: `${text}.js`
        }, { quoted: aa });
    }

    if (stderr.trim()) {
        const aa2 = await conn.sendMessage(m.chat, { text: stderr }, { quoted: m });
        await conn.sendMessage(m.chat, {
            document: fs.readFileSync(`./plugins/${text}.js`),
            mimetype: 'application/javascript',
            fileName: `${text}.js`
        }, { quoted: aa2 });
    }
};

handler.help = ['getplugin'].map((v) => v + ' *<nombre>*');
handler.tags = ['owner'];
handler.command = /^(dp|باتش-حذف)$/i;
handler.rowner = true;

export default handler;
