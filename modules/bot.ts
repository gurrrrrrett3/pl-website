import Discord from 'discord.js';
import auth from '../auth.json';
export class Bot {

    public Client: Discord.Client;

    public channels: [{name: string, id: string, channel: Discord.GuildChannel}] | any[] = [];
    public guildID = "917229154200612895";

    constructor() {
        this.Client = new Discord.Client({intents: ["DIRECT_MESSAGES", "GUILDS", "GUILD_MESSAGES", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_MEMBERS", "GUILD_PRESENCES", "GUILD_VOICE_STATES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING"]});
        this.Client.on('ready', () => {
            console.log(`Logged in as ${this.Client.user?.tag}!`);

            this.Client.guilds.cache.get(this.guildID)?.channels.cache.forEach(channel => {
                if (channel.type == "GUILD_TEXT") {
                    this.channels.push({name: channel.name, id: channel.id, channel: channel});
                }
            })
    
            console.log(`Loaded ${this.channels.length} channels`);

        });

        this.Client.login(auth.botToken).then(() => {

      
    })
    }

    public sendMessage(message: string, channel: Discord.TextChannel) {
    
        channel.send(message);
    }

    public sendEmbed(embed: Discord.MessageEmbed, channel: Discord.TextChannel) {

        channel.send({embeds: [embed]});
    }

}