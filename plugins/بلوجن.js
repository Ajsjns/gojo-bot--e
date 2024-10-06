import fs from 'fs';
import path from 'path';

// دالة لعرض محتوى الملف
let displayFileContent = async (filename) => {
    let filePath = path.join('plugins', filename);

    try {
        // التحقق من وجود الملف أولاً
        await fs.promises.access(filePath, fs.constants.F_OK);
    } catch (err) {
        throw new Error(`الملف ${filename} غير موجود.`);
    }

    try {
        // قراءة المحتوى الحالي للملف
        let fileContent = await fs.promises.readFile(filePath, 'utf8');
        return fileContent;
    } catch (err) {
        throw new Error(`فشل في قراءة الملف ${filename}: ${err.message}`);
    }
};

// دالة لجلب جميع الملفات الموجودة في مجلد 'plugins'
let getPluginFiles = async () => {
    let pluginPath = path.join('plugins');
    try {
        let files = await fs.promises.readdir(pluginPath);
        return files.filter(file => file.endsWith('.js')); // جلب الملفات ذات الامتداد .js فقط
    } catch (err) {
        throw new Error('فشل في جلب قائمة الملفات.');
    }
};

let handler = async (m, { isROwner, usedPrefix, command, text }) => {
    await m.reply(global.wait);
    if (!isROwner) return;

    // الحالة الأولى: إذا لم يتم إرسال اسم ملف
    if (!text) {
        try {
            // جلب قائمة الملفات من مجلد 'plugins'
            let files = await getPluginFiles();

            if (files.length === 0) {
                throw new Error('لم يتم العثور على ملفات.');
            }

            // إنشاء أزرار لكل ملف بتنسيق .gpo {اسم_الملف}
            let buttons = files.map(file => {
                let filenameWithoutExt = path.basename(file, '.js'); // إزالة الامتداد
                return [`.gpo ${filenameWithoutExt}`, `.عرض ${filenameWithoutExt}`];
            });

            // إرسال الرسالة مع الأزرار
            await conn.sendButton(
                m.chat,
                'اختر ملفاً لعرضه:',
                ' > PLUTO | 🐼❤️',
                '', // يمكنك وضع رابط هنا إذا لزم الأمر
                buttons, // الأزرار التي تم إنشاؤها
                m
            );
        } catch (e) {
            console.error(`حدث خطأ: ${e.message}`);
            m.reply(`حدث خطأ: ${e.message}`);
        }
    } else {
        // الحالة الثانية: إذا تم إرسال اسم ملف (عند اختيار الزر)
        let filename = text.trim() + '.js';

        try {
            // عرض محتوى الملف
            let fileContent = await displayFileContent(filename);
            m.reply(`نص الملف ${filename}:\n\n${fileContent}`);
        } catch (e) {
            console.error(`حدث خطأ أثناء عرض الملف ${filename}: ${e.message}`);
            m.reply(`حدث خطأ أثناء عرض الملف ${filename}: ${e.message}`);
        }
    }
};

handler.help = ['viewplugin'];
handler.tags = ['owner'];
handler.command = /^(gpo|باتش-عرض|عرض)$/i;
handler.rowner = true;

export default handler;
