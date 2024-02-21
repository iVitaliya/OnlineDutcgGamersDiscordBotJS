const { AuditLogEvent } = require("discord.js");

/** A class used to fetch/get {@link https://discord.js.org/docs/packages/discord.js/main/GuildAuditLogs:Class Audit Log(s)}. */
class ODGAuditLogs {
    constructor(
        /** 
         * The client which is used to fetch the {@link https://discord.js.org/docs/packages/discord.js/main/GuildAuditLogs:Class Audit Log(s)}.
         * @type {import("../../Client/Client")} */
         client
    ) {
        /**
         * @protected
         * @type {import("../../Client/Client")} */
        this.client = client;
    }

    /** The resolver to resolve the latest {@link https://discord.js.org/docs/packages/discord.js/main/GuildAuditLogs:Class#entries Audit Log Entry}.
     * @param {import("discord.js").Guild} guild The guild to fetch the log from.
     * @param {(keyof typeof import("discord.js").AuditLogEvent) | number} type The type of AuditLog Action to use/fetch.
     * @param {import("discord.js").UserResolvable} [user] The user to fetch for from the logs. */
    async resolve(guild, type, user) {
        let log = await guild.fetchAuditLogs({
            type: AuditLogEvent[type],
            limit: 1,
            user: user ? user : undefined
        });

        return log.entries.last() || null;
    }

    /** The resolver to resolve multiple {@link https://discord.js.org/docs/packages/discord.js/main/GuildAuditLogs:Class Audit Log}.
     * @param {import("discord.js").Guild} guild The guild to fetch the log from.
     * @param {(keyof typeof import("discord.js").AuditLogEvent) | number} type The type of AuditLog Action to use/fetch.
     * @param {number} [limit] The amount of logs to fetch.
     * @param {(value: import("discord.js").GuildAuditLogsEntry, key: string, collection: import("discord.js").Collection<string, import("discord.js").GuildAuditLogsEntry>) => boolean} findMethod  */
    async resolveMultiple(guild, type, limit, findMethod) {
        const log = await guild.fetchAuditLogs({
            type: AuditLogEvent[type],
            limit
        });

        return log.entries.find(findMethod) || null;
    }
}

module.exports = ODGAuditLogs;