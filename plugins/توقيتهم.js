import moment from 'moment-timezone';
import { generateWAMessageFromContent, prepareWAMessageMedia } from '@whiskeysockets/baileys';

const timezones = {
    'بيرو': 'America/Lima',
    'المكسيك': 'America/Mexico_City',
    'بوليفي': 'America/La_Paz',
    'تشيلي': 'America/Santiago',
    'الأرجنتين': 'America/Argentina/Buenos_Aires',
    'كولومبيا': 'America/Bogota',
    'لاكوادور': 'America/Guayaquil',
    'كوستاريكا': 'America/Costa_Rica',
    'كوبا': 'America/Havana',
    'جواتيمالا': 'America/Guatemala',
    'هندوراس': 'America/Tegucigalpa',
    'نيكاراجوا': 'America/Managua',
    'بنما': 'America/Panama',
    'أوروغواي': 'America/Montevideo',
    'فنزويلا': 'America/Caracas',
    'باراغواي': 'America/Asuncion',
    'نيو يورك': 'America/New_York',
    'اسيا': 'Asia/Jakarta',
    'البرازيل': 'America/Sao_Paulo',
    'جنق القلعه': 'Africa/Malabo'
  };


let handler = async (m, { conn, usedPrefix, command, text }) => {

if (!text) {

  const rows = Object.entries(timezones).map(([country, timezone]) => ({
    header: country,
    title: `توقيت ${country}`,
    description: '',
    id: `${usedPrefix + command} ${timezone}` // معرف الزر لعرض الوقت
  }));

  const caption = 'اختر الدولة لمعرفة توقيتها:';
  const flex = ['https://ar.prayerinislam.com/wp-content/uploads/المشروع-في-المسجد.jpg'];
  const mediaMessage = await prepareWAMessageMedia({ image: { url: flex[0] } }, { upload: conn.waUploadToServer });

  const message = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: { text: caption },
          footer: { text: 'اختر دولة' },
          header: {
            hasMediaAttachment: true,
            imageMessage: mediaMessage.imageMessage
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                  title: 'قائمة الدول',
                  sections: [{
                    title: 'اختر دولة',
                    rows: rows // الصفوف التي تحتوي على أسماء الدول
                  }]
                })
              }
            ]
          }
        }
      }
    }
  }, { userJid: conn.user.jid, quoted: m });

  await conn.relayMessage(m.chat, message.message, { messageId: message.key.id });
  
  } else {
  
  
  const timezon = text; // المنطقة الزمنية
  const currentTime = moment().tz(timezon).format('DD/MM HH:mm');
  const countryName = Object.keys(timezones).find(country => timezones[country] === timezon) || 'غير معروف';

  await conn.sendMessage(m.chat, { text: `توقيت ${countryName}: ${currentTime}` }, { quoted: m });
  
  }
};


handler.help = ['horario'];
handler.tags = ['info'];
handler.command = /^(توقيت|التوقيت)$/i;

export default handler;
