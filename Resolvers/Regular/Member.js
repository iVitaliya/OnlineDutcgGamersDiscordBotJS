/** A class used to fetch/get a {@link https://discord.js.org/docs/packages/discord.js/main/GuildMember:Class Member} */
class ODGMember {
    constructor(
        /** 
         * The client which is used to fetch the {@link https://discord.js.org/docs/packages/discord.js/main/GuildMember:Class Member}.
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
     * The resolver used to resolve the {@link https://discord.js.org/docs/packages/discord.js/main/GuildMember:Class GuildMember}.
     * @param {string} resolvable The string used to resolve the member.
     * @param {import("discord.js").Guild} guild */
    async resolve(resolvable, guild) {
        let MemberResolvable = await guild.members.cache.find(
            (membr) => membr.displayName.toLowerCase() === resolvable.toLowerCase() ||
                membr.user.username.toLowerCase() === resolvable.toLowerCase() ||
                membr.id === resolvable.replace(/[\\<>@!]/g, "")
        );

        try {
            if (typeof MemberResolvable === "undefined") MemberResolvable = await guild.members.fetch({ user: resolvable });
        } catch (err) {
            throw this.client.logger.error({
                err_name: err.name,
                err_message: err.message
            });
        }

        return MemberResolvable;
    }
}

module.exports = ODGMember;