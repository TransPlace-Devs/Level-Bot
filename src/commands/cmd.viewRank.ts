import _ from 'lodash';
import { ApplicationCommandType } from 'discord-api-types/v10';
import { ResponsiveContentMenuCommandBuilder } from '@interactionHandling/commandBuilders.js';
import { GuildMember } from 'discord.js';
import TEMPLATES from '@resources/commandTemplates.js';

export default new ResponsiveContentMenuCommandBuilder()
  .setType(ApplicationCommandType.Message)
  .setName('View Rank')
  .setResponse(async (interaction, _interactionHandler, _command) => {
    if (!interaction.isMessageContextMenu()) return;

    const TargetUser = interaction.targetMessage?.author;
    if (!TargetUser) return;
    if(TargetUser.bot) return interaction.reply({
      content: 'You cannot view the rank of a bot.',
      ephemeral: true,
    });

    const GUILD_MEMBER_ID = interaction.targetMessage.author.id;
    const GUILD_MEMBER = interaction.targetMessage.member instanceof GuildMember ? interaction.targetMessage.member : await interaction.guild?.members.fetch(GUILD_MEMBER_ID).catch();
    if (!GUILD_MEMBER) {
      return await interaction.reply({
        content: 'Could not find the user in the guild.',
        ephemeral: true
      });
    }
    return await interaction.reply({
      embeds: [await TEMPLATES.getUserRank(GUILD_MEMBER.user)],
      ephemeral: true,
    });

  });
