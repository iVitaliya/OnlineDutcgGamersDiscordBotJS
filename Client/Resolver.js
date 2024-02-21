class Resolver {
    /** @param {import("../Client/Client")} client  */    
    constructor(client) {
        /** {import("../Client/Client")} */
        this.client = client;
    }

    /**
     * Fetches a member by the provided identifier.
     * @public
     * @param {string} resolvable The id which will be used to fetch a GuildMember, this may be a username, nickname, mention or a user ID.
     * @param {import("discord.js").Guild} guild  */
    async member(resolvable, guild) {
        let MemberResolvable = guild.members.cache.find(
            (mem) => mem.user.username.toLowerCase() === resolvable.toLowerCase() ||
                mem.nickname.toLowerCase() === resolvable.toLowerCase() ||
                mem.id === resolvable.replace("<>@!", "")
        );

        try {
            if (typeof MemberResolvable === "undefined") await guild.members.resolve(resolvable);
        } catch (err) {
            throw this.client.logger.error({
                err_name: err.name,
                err_message: err.message
            });
        }

        return MemberResolvable || null;
    }
}

module.exports = Resolver;