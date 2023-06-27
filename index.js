const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token, logs_channel } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


client.once(Events.ClientReady, cli => {
    console.log(`Ready! Logged in as ${cli.user.tag}`);
});

client.on(Events.MessageDelete, (m) => {
    client.channels.cache.get(logs_channel).send({
        embeds: [
            {
                "title": "Message Supprimé",
                "color": 16065893,
                "author": {
                    "name": "SimpleLogs",
                    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
                },
                "fields": [
                    {
                        "name": "Auteur",
                        "value": `<@${m.author.id}>`,
                        "inline": true
                    },
                    {
                        "name": "Salon",
                        "value": `<#${m.channelId}>`,
                        "inline": true
                    },
                    {
                        "name": "Message",
                        "value": m.content,
                        "inline": false
                    }
                ]
            },
        ]
    })
})
client.on(Events.MessageUpdate, (m) => {
    client.channels.cache.get(logs_channel).send({
        embeds: [
            {
                "title": "Message Modifié",
                "color": 39129,
                "author": {
                    "name": "SimpleLogs",
                    "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
                },
                "fields": [
                    {
                        "name": "Auteur",
                        "value": `<@${m.author.id}>`,
                        "inline": true
                    },
                    {
                        "name": "Salon",
                        "value": `<#${m.channelId}>`,
                        "inline": true
                    },
                    {
                        "name": "Ancien Message",
                        "value": m.content,
                        "inline": false
                    },
                    {
                        "name": "Nouveau Message",
                        "value": m.reactions.message.content,
                        "inline": true
                    }
                ]
            }
        ]
    })
})
client.login(token);
