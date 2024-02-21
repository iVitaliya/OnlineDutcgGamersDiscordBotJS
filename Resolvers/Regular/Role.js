/** A class used to fetch/get a {@link https://discord.js.org/docs/packages/discord.js/main/Role:Class Role}. */
class ODGRole {
    constructor(
        /**
         * The client which is used to get/fetch the {@link https://discord.js.org/docs/packages/discord.js/main/Role:Class Role}.
         * @type {import("../../Client/Client")} */
        client
    ) {
        /**
         * @protected
         * @type {import("../../Client/Client")} */
        this.client = client;
    }

    /**
     * The resolver to resolve the {@link https://discord.js.org/docs/packages/discord.js/main/Role:Class Role}.
     * @param {string} resolvable The string used to resolve the role.
     * @param {import("discord.js").Guild} guild */
    async resolve(resolvable, guild) {
        let RoleResolvable = await guild.roles.cache.find(
            (rl) =>
                rl.name.toLowerCase() === resolvable.toLowerCase() ||
                rl.id === resolvable.replace(/[\\<>@&]/g, "")
        );

        try {
            if (typeof RoleResolvable === "undefined")
                RoleResolvable = await guild.roles.fetch(
                    resolvable.replace(/[\\<>@&]/g, "")
                );
        } catch (err) {
            throw this.client.logger.error({
                err_name: err.name,
                err_message: err.message,
            });
        }

        return RoleResolvable || null;
    }
}

module.exports = ODGRole;
