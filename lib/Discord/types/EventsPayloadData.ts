type UserData = {
  id: string;
  username: string;
  discrimiator: string;
  avatar: string | null;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string | null;
  accent_color?: number | null;
  locale?: string;
  verified?: boolean;
  email?: string | null;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
};

type GuildMemberData = {
  user?: UserData;
  nick?: string;
  roles: string[];
  joined_at: string;
  premium_since?: string;
  deaf: boolean;
  mute: boolean;
  pending?: boolean;
  permissions?: string;
};

type ChannelMentionData = {};

type MessageData = {
  author: UserData;
  application_id: string;
  channel_id: string;
  content: string;
  flags: string;
  guild_id?: string;
  id: string;
  member?: GuildMemberData;
  mention_everyone: boolean;
  nonce?: string | number;
  pinned: boolean;
  referenced_message: null;
  timestamps: string;
  tts: boolean;
  type: number;
  webhook_id: string;
};

export type { GuildMemberData, MessageData };
