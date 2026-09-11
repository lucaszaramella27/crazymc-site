const configuredAddress = (
  import.meta.env.VITE_MINECRAFT_SERVER_ADDRESS
  ?? ''
).trim();

const configuredDiscordUrl = (import.meta.env.VITE_DISCORD_URL ?? '').trim();

function validPublicUrl(value: string, fallback: string) {
  if (!value) return fallback;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString() : fallback;
  } catch {
    return fallback;
  }
}

export const serverInfo = {
  ip: configuredAddress || 'crazymc.bed.net.br',
  mode: 'Semi-Anarquia',
  discordUrl: validPublicUrl(configuredDiscordUrl, 'https://discord.gg/crazymc'),
};

export type MinecraftEdition = 'java' | 'bedrock';

export const serverConnection = {
  address: configuredAddress || serverInfo.ip,
  edition: import.meta.env.VITE_MINECRAFT_EDITION?.toLowerCase() === 'bedrock'
    ? 'bedrock'
    : 'java',
  enabled: serverInfo.ip.length > 0,
} satisfies {
  address: string;
  edition: MinecraftEdition;
  enabled: boolean;
};
