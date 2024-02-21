const ODGCategoryChannel = require("./Category"),
    ODGDirectoryChannel = require("./Directory"),
    ODGForumChannel = require("./Forum"),
    ODGMediaChannel = require("./Media"),
    ODGNewsChannel = require("./News"),
    ODGStageChannel = require("./Stage"),
    ODGTextChannel = require("./Text"),
    ODGThreadChannel = require("./Thread"),
    ODGThreadOnlyChannel = require("./ThreadOnly"),
    ODGVoiceChannel = require("./Voice"),
    ODGWelcomeChannel = require("./Welcome");

module.exports = {
    category: ODGCategoryChannel,
    diretory: ODGDirectoryChannel,
    forum: ODGForumChannel,
    media: ODGMediaChannel,
    news: ODGNewsChannel,
    stage: ODGStageChannel,
    text: ODGTextChannel,
    thread: ODGThreadChannel,
    thread_only: ODGThreadOnlyChannel,
    voice: ODGVoiceChannel,
    welcome: ODGWelcomeChannel
};