// Needed packages to pass with the logging.
const moment = require("moment");
const {
    yellow,
    yellowBright,
    blueBright,
    green,
    red,
    redBright,
    blackBright,
    dim,
} = require("colorette");

/** @param {string} title */
function seekErrorTitle(title) {
    return title.includes("[") && title.includes("]")
        ? title.toUpperCase()
        : `[${title.toUpperCase()}]`;
}

const time = moment(Date.now()).format("Do [of] MMMM[,] YYYY [@] h:mm:ss A");
const prefix = `${blackBright("[")}${dim(yellow(time))}${blackBright("]")}`;

const Logger = {
    /**
     * Sends a message to the console which would inform the user on any message.
     * @public
     * @param {any} msg The message to send.
     * @returns {void} */
    info(msg) {
        return process.stdout.write(
            `${prefix} ${blackBright("(")}${blueBright("Info")}${blackBright(
                ")"
            )}: ${Array.isArray(msg) ? msg.join(" ") : msg}`
        );
    },

    /**
     * Sends a message to the console which would give a detailed description of logging all the info of what's happening in/behind the application.
     * @public
     * @param {string | string[]} msg The message to send.
     * @returns {void} */
    debug(msg) {
        return process.stdout.write(
            `${prefix} ${blackBright("(")}${green("Debug")}${blackBright(
                ")"
            )}: ${Array.isArray(msg) ? msg.replace("\n", "").join(" ") : msg}`
        );
    },

    /**
     * Sends a message to the console which would warn the user for an action that has occurred.
     * @public
     * @param {string} msg The message to send.
     * @returns {void} */
    warn(msg) {
        process.stdout.write(
            `${prefix} ${blackBright("(")}${yellowBright(
                "Warning"
            )}${blackBright(")")}: ${msg}`
        );
    },

    /**
     * Sends a message to the console which would be the cause of the error.
     * @public
     * @param  {string | { err_name: string; err_message: string; }} msg The message to send.
     * @returns {void} */
    error(msg) {
        process.stdout.write(
            `${prefix} ${blackBright("(")}${redBright("Error")}${blackBright(
                ")"
            )}: ${typeof msg === "string" ? msg : `${seekErrorTitle(msg.err_name)} ${msg.err_message}`}`
        );
    },

    /**
     * Sends a message to the console which would be the cause of the error, exits after the message has been sent.
     * @public
     * @param {string  | { err_name: string; err_message: string; }} msg The message to send before exiting.
     * @returns {void} */
    fatal(msg) {
        process.stdout.write(
            `${prefix} ${blackBright("(")}${red("Fatal")}${blackBright(
                ")"
            )}: ${typeof msg === "string" ? msg : `${seekErrorTitle(msg.err_name)} ${msg.err_message}`}`
        );

        process.exit(1);
    },
};

module.exports = Logger;
