/** A class used to fetch/get a {@link https://discord.js.org/docs/packages/discord.js/main/User:Class User}. */
class ODGUser {
    constructor(
        /**
         * The client which is used to get/fetch the {@link https://discord.js.org/docs/packages/discord.js/main/User:Class User}.
         * @type {import("../../Client/Client")} */
        client
    ) {
        /**
         * @protected
         * @type {import("../../Client/Client")} */
        this.client = client;
    }

    /**
     * The resolver to resolve the {@link https://discord.js.org/docs/packages/discord.js/main/User:Class User}.
     * @param {string} resolvable The string used to resolve the user. */
    async resolve(resolvable) {
        let UserResolvable = await this.client.users.cache.find(
            (usr) =>
                usr.username.toLowerCase() === resolvable.toLowerCase() ||
                usr.displayName.toLowerCase() === resolvable.toLowerCase() ||
                usr.id === resolvable.replace(/[\\<>@!]/g, "")
        );

        try {
            if (typeof UserResolvable === "undefined") UserResolvable = await this.client.users.fetch(resolvable, { cache: false, force: true });
        } catch (err) {
            throw this.client.logger.error({
                err_name: err.name,
                err_message: err.message
            });
        }

        return UserResolvable || null;
    }
}

module.exports = ODGUser;
