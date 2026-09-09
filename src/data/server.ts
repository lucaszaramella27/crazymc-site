const configuredAddress = (
  import.meta.env.VITE_MINECRAFT_SERVER_ADDRESS
  ?? import.meta.env.VITE_MINECRAFT_SERVER
  ?? ''
).trim();

export const serverInfo = {
  ip: configuredAddress || 'play.crazymc.com',
  onlinePlayers: 128,
  maxPlayers: 500,
  version: '1.21.x',
  mode: 'Semi-Anarquia',
  uptime: '99.9%',
  discordUrl: 'https://discord.gg/crazymc',
};

export type MinecraftEdition = 'java' | 'bedrock';

export const serverConnection = {
  address: configuredAddress || serverInfo.ip,
  edition: import.meta.env.VITE_MINECRAFT_EDITION?.toLowerCase() === 'bedrock'
    ? 'bedrock'
    : 'java',
  enabled: configuredAddress.length > 0,
} satisfies {
  address: string;
  edition: MinecraftEdition;
  enabled: boolean;
};
