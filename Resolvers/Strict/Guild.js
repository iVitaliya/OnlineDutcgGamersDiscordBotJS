/** A class used to fetch/get {@link https://discord.js.org/docs/packages/discord.js/main/Guild:Class Guild}. */
class ODGStrictGuild {
    constructor(
        /** 
         * The client which is used to get/fetch a {@link https://discord.js.org/docs/packages/discord.js/main/Guild:Class Guild}.
         * @type {import("../../Client/Client")} */
        client
    ) {
        /**
         * @protected
         * @type {import("../../Client/Client")} */
        this.client = client;
    }

    /**
     * The resolver to resolve the {@link https://discord.js.org/docs/packages/discord.js/main/Guild:Class Guild}.
     * @param {string} resolvable The string used to resolve the guild. */
    async resolve(resolvable) {
        let GuildResolvable = await this.client.guilds.cache.find(
            (gld) => gld.name.toLowerCase() === resolvable.toLowerCase() ||
                gld.id === resolvable
        );

        try {
            if (typeof GuildResolvable === "undefined") GuildResolvable = await this.client.guilds.fetch({
                cache: false,
                force: true,
                guild: resolvable
            });
        } catch (err) {
            throw this.client.logger.error({
                err_name: err.name,
                err_message: err.message
            });
        }

        return GuildResolvable || null;
    }
}

module.exports = ODGStrictGuild;