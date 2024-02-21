/** A class used to fetch/get a {@link https://discord.js.org/docs/packages/discord.js/main/GuildEmoji:Class GuildEmoji}. */
class ODGEmoji {
    constructor(
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
            (emji) =>
                emji.name.toLowerCase() === resolvable.toLowerCase() ||
                `<:${emji.name}:${emji.id}>` === resolvable ||
                `:${emji.name}:` === resolvable ||
                emji.id === resolvable
        );

        try {
            if (typeof EmojiResolvable === "undefined")
                EmojiResolvable = await guild.emojis.fetch(
                    this.toID(resolvable),
                    { cache: false, force: true }
                );
        } catch (err) {
            throw this.client.logger.error({
                err_name: err.name,
                err_message: err.message,
            });
        }

        return EmojiResolvable || null;
    }

    /**
     * @private
     * @param {string} replaceble */
    toID(replaceble) {
        const emoji = replaceble.split(/[:<>]/g);
        const result = emoji.filter((str) => str !== "");

        return result[1];
    }
}

module.exports = ODGEmoji;
