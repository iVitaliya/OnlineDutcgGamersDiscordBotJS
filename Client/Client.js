// Required files for the client...
const Logger = require("./Logger");
const { developer, token } = require("../Config/Preferences");
const Functions = require("../Utils/Functionts");

const {
    category,
    directory,
    forum,
    media,
    news,
    stage,
    text,
    thread,
    thread_only,
    voice,
    welcome
} = require("../Resolvers/Channels/index");
const {
    audit_logs,
    channel,
    emoji,
    member,
    role,
    user
} = require("../Resolvers/Regular/index");

// Required packages for the client...
const {
    Client,
    Partials,
    GatewayIntentBits,
    GuildMember,
    Guild,
    ActivityType,
} = require("discord.js");

function Sweeper() {
    return {
        message: { lifetime: 3000, interval: 10300 },
        invite: { lifetime: 1000, interval: 10500 },
        ban: { interval: 8000, filter: (b, _key, _collection) => !b.user.bot },
        reaction: { interval: 3000 },
        guildMember: {
            interval: 3500,
            filter: (m, _key, _collection) => !m.user.bot,
        },
        user: { interval: 5000, filter: (u, _key, _collection) => !u.bot },
        voiceState: { interval: 1500 },
        presence: { interval: 1000 },
        threadMember: { interval: 10000 },
        thread: { lifetime: 1000, interval: 1500 },
        stageInstance: { interval: 1300 },
        emoji: { interval: 1200 },
        sticker: { interval: 950 },
    };
}

const strictResolvers = function(client) {
    const Category = new category(client);
    const Directory = new directory(client);
};

class ODGClient extends Client {
    constructor() {
        super({
            allowedMentions: {
                repliedUser: true,
                parse: ["roles", "users"],
            },
            failIfNotExists: true,
            presence: {
                status: "online",
                activities: [
                    {
                        type: ActivityType.Competing,
                        name: "Online Dutch Gamers",
                    },
                ],
            },
            partials: [
                Partials.User,
                Partials.Reaction,
                Partials.Message,
                Partials.GuildMember,
                Partials.Channel,
            ],
            intents: [
                GatewayIntentBits.AutoModerationConfiguration,
                GatewayIntentBits.AutoModerationExecution,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.GuildModeration,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildScheduledEvents,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessageTyping,
            ],
            sweepers: {
                messages: Sweeper().message,
                invites: Sweeper().invite,
                bans: Sweeper().ban,
                reactions: Sweeper().reaction,
                guildMembers: Sweeper().guildMember,
                users: Sweeper().user,
                voiceStates: Sweeper().voiceState,
                presences: Sweeper().presence,
                threadMembers: Sweeper().threadMember,
                threads: Sweeper().thread,
                stageInstances: Sweeper().stageInstance,
                emojis: Sweeper().emoji,
                stickers: Sweeper().sticker,
            },
        });

        /** @type {typeof Logger} */
        this.logger = Logger;

        if (process.argv.includes("-t"))
            super.on("debug", (deb) => Logger.debug(deb));
        super.on("warn", (warn) => Logger.warn(warn));
        super.on("error", (err) =>
            Logger.error({
                err_name: err.name,
                err_message: err.message,
            })
        );

        // Process Events.
        process.on("exit", (c) =>
            Logger.error(
                `The application has been terminated with an error with code ${c}`
            )
        );
        process.on("uncaughtException", (err) =>
            Logger.error({
                err_name: err.name,
                err_message: err.message,
            })
        );
        process.on("unhandledRejection", (err) =>
            Logger.error({
                err_name: err.name,
                err_message: err.message,
            })
        );
        process.on("warning", (warn) =>
            Logger.warn(
                `${
                    warn.name.includes("[") && warn.name.includes("]")
                        ? warn.name.toUpperCase()
                        : `[${warn.name.toUpperCase()}]`
                } ${warn.message}`
            )
        );

        // Shard Logs.
        super.on("shardDisconnect", (_e, id) =>
            Logger.error(`Shard#${id} has disconnected from the Client`)
        );
        super.on("shardError", (err, id) =>
            Logger.error(
                `Shard#${id} has thrown an error\n${
                    err.stack
                        ? err.stack
                        : `${err.name.toUpperCase()}: ${err.message}`
                }`
            )
        );
        super.on("shardReady", (id) =>
            Logger.info(
                `Shard#${id} has started up and connected successfully to the application`
            )
        );
        super.on("shardReconnecting", (id) =>
            Logger.info(
                `Shard#${id} has disconnected and is trying to reconnect...`
            )
        );

        // Settings.
        this.developer = developer;
        this.embed = ODGEmbed;
        this.pager = Pager;

        // this.resolvers = {
        //     audit_logs,
        //     channel,
        //     emoji,
        //     member,
        //     role,
        //     user,
        //     strict: {
        //         category: () => {
        //             const instance = new category(this);

        //             return instance.resolve
        //         }()
        //     }
        // };
        /** @type {typeof Utils} */
        this.functions = Functions;
    }

    /**
     * Connects to Discord using the provided token.
     * @param {string} token  */
    async connect() {
        await this.login(token);
    }
}

module.exports = ODGClient;
