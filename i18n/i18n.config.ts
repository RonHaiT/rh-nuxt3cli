// import defineI18nConfig from "@nuxtjs/i18n"
async function loadMessages() {

    const [zhModule, enModule, twModule] = [
        await import('./locales/zh.json'),
        await import('./locales/en.json'),
        await import('./locales/tw.json'),
    ]

    const zhMessages = { ...zhModule.default, }
    const twMessages = { ...twModule.default, }
    const enMessages = { ...enModule.default, }
    return {
        zh: zhMessages,
        en: enMessages,
        tw: twMessages
    }
}

export default defineI18nConfig(async () => ({
    legacy: false,
    locale: 'zh',
    messages: await loadMessages()
}));