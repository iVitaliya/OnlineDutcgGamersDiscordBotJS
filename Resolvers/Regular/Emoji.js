/** A class used to fetch/get a {@link https://discord.js.org/docs/packages/discord.js/main/GuildEmoji:Class GuildEmoji}. */
class ODGEmoji {
    constructor (
        /** 
         * The client which is used to fetch/get a {@link https://discord.js.org/docs/packages/discord.js/main/GuildEmoji:Class GuildEmoji}.
         * @type {import("../../Client/Client")} */
        client
    ) {
        /**
         * @protected
         * @type {import("../../Client/Client")} */
         this.client = client;
    }

    /**
     * The resolver to resolve the {@link https://discord.js.org/docs/packages/discord.js/main/GuildEmoji:Class GuildEmoji}.
     * @param {string} resolvable The string used to resolve the emoji.
     * @param {import("discord.js").Guild} guild */
    async resolve(resolvable, guild) {
        let EmojiResolvable = await guild.emojis.cache.find(
            (emji) => emji.name.toLowerCase() === resolvable.toLowerCase() ||
                `<:${emji.name}:${emji.id}>` === resolvable ||
                `:${emji.name}:` === resolvable ||
                emji.id === resolvable
        );

        try {
            if (typeof EmojiResolvable === "undefined") EmojiResolvable = await guild.emojis.fetch()
        } catch (err) {
            
        }
    }

    /**
     * @private
     * @param {string|{ id: string; str: string; }} replaceble */
    toID(replaceble) {
        if (typeof replaceble === "string") return replaceble.includes(":") ? replaceble.replace(/:/g, "") : replaceble;
        else {
            
        }
    }
}