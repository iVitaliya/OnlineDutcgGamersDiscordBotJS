const Channel = require("../Channels/index");
const {
    category,
    diretory,
    forum,
    media,
    news,
    stage,
    text,
    thread,
    thread_only,
    voice,
    welcome
} = Channel;

/** @typedef {keyof typeof Channel} ChannelType */

/** A class used to fetch/get a {@link https://discord.js.org/docs/packages/discord.js/main/Channel:Class Channel}. */
class ODGChannel {
    constructor(
        /** 
         * The client which is ued to fetch/get the {@link https://discord.js.org/docs/packages/discord.js/main/Channel:Class Channel}.
         * @type {import("../../Client/Client")} */
        client
    ) {
        /**
         * @protected
         * @type {import("../../Client/Client")} */
         this.client = client;

         /**
          * @protected
          * @type {import("../Channels/Category")} */
        this.category = new category(client);
        /**
         * @protected
         * @type {import("../Channels/Directory")} */
        this.diretory = new diretory(client);
        /**
         * @protected
         * @type {import("../Channels/Forum")} */
        this.forum = new forum(client);
        /**
         * @protected
         * @type {import("../Channels/Media")} */
        this.media = new media(client);
        /**
         * @protected
         * @type {import("../Channels/News")} */
        this.news = new news(client);
        /**
         * @protected
         * @type {import("../Channels/Stage")} */
        this.stage = new stage(client);
        /**
         * @protected
         * @type {import("../Channels/Text")} */
        this.text = new text(client);
        /**
         * @protected
         * @type {import("../Channels/Thread")} */
        this.thread = new thread(client);
        /**
         * @protected
         * @type {import("../Channels/ThreadOnly")} */
        this.thread_only = new thread_only(client);
        /**
         * @protected
         * @type {import("../Channels/Voice")} */
        this.voice = new voice(client);
        /**
         * @protected
         * @type {import("../Channels/Welcome")} */
        this.welcome = new welcome(client);
    }

    /**
     * The resolver used to resolve a {@link https://discord.js.org/docs/packages/discord.js/main/Channel:Class Channel}.
     * @param {string} resolvable The string used to resolve the channel.
     * @param {import("discord.js").Guild} guild */
    async resolveFor(resolvable, guild) {
        let ChannelResolvable = await guild.channels.cache.find(
            (chnnl) => chnnl.name.toLowerCase() === resolvable.toLowerCase() ||
                chnnl.id === resolvable.replace(/[\\<>#]/g, "")
        );

        try {
            if (typeof ChannelResolvable === "undefined") ChannelResolvable = await guild.channels.fetch(resolvable);
        } catch (err) {
            this.client.logger.error({
                err_name: err.name,
                err_message: err.message
            });
        }

        /** @type {ChannelType[]} */
        const types = ["category", "diretory", "forum", "media", "news", "stage", "text", "thread", "thread_only", "voice", "welcome"];
        for (const type of types) {
            const Chan = await this[type].resolve(ChannelResolvable, guild);

            if (Chan !== null) return Chan;
        }

        return null;
    }

    /** 
     * The resolver used to resolve a {@link https://discord.js.org/docs/packages/discord.js/main/Channel:Class Channel}.
     * @param {ChannelType} type The type of the channel to strictly search for.
     * @param {string} resolvable The string used to resolve the channel strictly.
     * @param {import("discord.js").Guild} guild */
    async resolveStrict(type, resolvable, guild) {
        let ChannelResolvable = await guild.channels.cache.find(
            (chnnl) => chnnl.name.toLowerCase() === resolvable.toLowerCase() ||
                chnnl.id === resolvable.replace(/[\\<>#]/g, "")
        );

        try {
            if (typeof ChannelResolvable === "undefined") ChannelResolvable = await guild.channels.fetch(resolvable, { cache: false, force: true });
        } catch (err) {
            this.client.logger.error({
                err_name: err.name,
                err_message: err.message
            });
        }

        const Chan = await this[type].resolve(ChannelResolvable, guild);

        if (Chan === null) return null;
        else return Channel;
    }
}

module.exports = ODGChannel;