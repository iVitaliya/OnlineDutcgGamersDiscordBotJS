/**
 * @template T
 * @template {keyof T} K
 * @typedef {Omit<T, K>} AdvancedOmit */

/** A class used to fetch/get a {@link https://discord.js.org/docs/packages/discord.js/main/Message:Class Message}. */
class ODGStrictMessage {
    constructor(
        /** 
         * The client which is used to fetch/get the {@link https://discord.js.org/docs/packages/discord.js/main/Message:Class Message}.
         * @type {import("../../Client/Client")} */
        client
    ) {
        /**
         * @protected
         * @type {import("../../Client/Client")} */
        this.client = client;
    }

    /**
     * The resolver to resolve the {@link https://discord.js.org/docs/packages/discord.js/main/Message:Class Message}.
     * @param {string} resolvable The string used to resolve the message.
     * @param {import("discord.js").Guild} guild
     * @param {import("discord.js").ForumChannel | import("discord.js").MediaChannel | import("discord.js").NewsChannel | import("discord.js").TextChannel | import("discord.js").ThreadChannel | import("discord.js").ThreadOnlyChannel | import("discord.js").VoiceChannel} channel */
    async resolve(resolvable, guild, channel) {
        
    }
}