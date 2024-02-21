const { colors, icons } = require("./Preferences");
const { EmbedBuilder } = require("discord.js");
const moment = require("moment");

/** @param {string} title */
function seekErrorTitle(title) {
    return title.includes("[") && title.includes("]")
        ? title.toUpperCase()
        : `[${title.toUpperCase()}]`;
}

// STAAT OP <SCHIJF>:\Development\Private Bots\KichiChan
const time = moment(Date.now()).format("L");

/** @typedef {import("discord.js").APIEmbedField | import("discord.js").APIEmbedField[]} EmbedFields */

class ODGEmbed {
    /**
     * @public
     * @param {{ client: import("../Client/Client"); guild: import("discord.js").Guild; userId: string; }} data
     * @param {string} title
     * @param {string} description
     * @param {EmbedFields} [fields] */
    static async main(data, title, description, fields) {
        const user = await new data.client.resolvers(data.client).member(
            data.userId,
            data.guild
        );
        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: icons.Success,
                name: title,
            })
            .setDescription(description)
            .setColor(colors.ODG)
            .setFooter({
                iconURL: user.avatarURL(),
                text: `Requested by @${user.displayName} • ${time}`,
            });

        if (fields) {
            Array.isArray(fields)
                ? embed.setFields(fields)
                : embed.addFields([fields]);
        }

        return embed.toJSON();
    }

    /**
     * @public
     * @param {{ client: import("../Client/Client"); guild: import("discord.js").Guild; userId: string; theme: Extract<keyof typeof colors, "LowLatency" | "NormalLatency" | "HighLatency"> }} data
     * @param {string} title
     * @param {string} description
     * @param {EmbedFields} [fields] */
    static async latency(data, title, description, fields) {
        /** @type {import("discord.js").GuildMember | undefined} */
        const user = await new data.client.resolvers(data.client).member(
            data.userId,
            data.guild
        );
        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: icons[data.theme],
                name: title,
            })
            .setDescription(description)
            .setColor(colors[data.theme])
            .setFooter({
                iconURL: user.avatarURL(),
                text: `Requested by @${user.displayName} • ${time}`,
            });

        if (fields) {
            Array.isArray(fields)
                ? embed.setFields(fields)
                : embed.setFields([fields]);
        }

        return embed.toJSON();
    }

    /**
     * @public
     * @param {{ client: import("../Client/Client"); guild: import("discord.js").Guild; userId: string; theme: Extract<keyof typeof colors, "LowRisk" | "MediumRisk" | "HighRisk">; }} data
     * @param {string} title
     * @param {string} description
     * @param {EmbedFields} [fields] */
    static async risk(data, title, description, fields) {
        /** @type {import("discord.js").GuildMember | undefined} */
        const user = await new data.client.resolvers(data.client).member(
            data.userId,
            data.guild
        );
        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: icons[data.theme],
                name: title,
            })
            .setDescription(description)
            .setColor(colors[data.theme])
            .setFooter({
                iconURL: user.avatarURL(),
                text: `Requested by @${user.displayName} • ${time}`,
            });

        if (fields) {
            Array.isArray(fields)
                ? embed.setFields(fields)
                : embed.setFields([fields]);
        }

        return embed.toJSON();
    }

    /**
     * @public
     * @param {string} name
     * @param {string} message */
    static async error(name, message) {
        const embed = new EmbedBuilder()
            .setAuthor({
                iconURL: icons["Failed"],
                name: "An Error Occurred",
            })
            .setDescription(
                `**${seekErrorTitle(name)}**\n\`\`\`\n${message}\n\`\`\``
            )
            .setColor(colors["Failed"])
            .setFooter({
                text: `Error occurred at`,
            });

        return embed.toJSON();
    }

    /**
     * @public
     * @param {{ client: import("../Client/Client"); guild: import("discord.js").Guild; userId: string; theme: keyof typeof colors; }} data
     * @param {string} title
     * @param {string} [description=""]
     * @param {EmbedFields} [fields] */
    static async advanced(data, title, description, fields) {
        const user = await new data.client.resolvers(data.client).member(
            data.userId,
            data.guild
        );
        const embed = new EmbedBuilder();
    }
}
