const { WelcomeChannel } = require("discord.js");

/** A class used to fetch/get a {@link https://discord.js.org/docs/packages/discord.js/main/WelcomeChannel:Class WelcomeChannel}. */
class ODGWelcomeChannel {
    constructor(
        /**
         * The client which is used to fetch/get the {@link https://discord.js.org/docs/packages/discord.js/main/WelcomeChannel:Class WelcomeChannel}.
         * @type {import("../../Client/Client")} */
        client
    ) {
        /**
         * @protected
         * @type {import("../../Client/Client")} */
        this.client = client;
    }

    /**
     * @public
     * The resolver used to resolve a {@link https://discord.js.org/docs/packages/discord.js/main/WelcomeChannel:Class WelcomeChannel}.
     * @param {string} resolvable The string used to resolve the channel.
     * @param {import("discord.js").Guild} guild */
    async resolve(resolvable, guild) {
        let ChannelResolvable = await guild.channels.cache.find(
            (chnnl) =>
                chnnl.name.toLowerCase() === resolvable.toLowerCase() ||
                chnnl.id === resolvable.replace(/[\\<>#]/g, "")
        );

        try {
            if (typeof ChannelResolvable === "undefined")
                ChannelResolvable = await guild.channels.fetch(
                    resolvable.replace(/[\\<>#]/g, ""),
                    { cache: false, force: true }
                );
        } catch (err) {
            throw this.client.logger.error({
                err_name: err.name,
                err_message: err.message,
            });
        }

        if (!(ChannelResolvable instanceof WelcomeChannel)) return null;
        else return ChannelResolvable;
    }
}

module.exports = ODGWelcomeChannel;
