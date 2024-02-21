const ODGAuditLogs = require("./AuditLogs"),
    ODGChannel = require("./Channel"),
    ODGEmoji = require("./Emoji"),
    ODGMember = require("./Member"),
    ODGRole = require("./Role"),
    ODGUser = require("./User");

module.exports = {
    audit_logs: ODGAuditLogs,
    channel: ODGChannel,
    emoji: ODGEmoji,
    member: ODGMember,
    role: ODGRole,
    user: ODGUser,
};
