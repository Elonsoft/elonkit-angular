export interface ESAvatarDefaultOptions {
  icon?: ESAvatarIcon;
  avatarSrc?: string;
  height?: number;
  width?: number;
  borderRadius?: number;
  showStatus?: boolean;
  statusSrc?: string;
  statusWidth?: number;
  statusHeight?: number;
  statusBorderWidth?: number;
  textTypography?: string;
}

export type ESAvatarIcon = 'account-round' | 'account-square' | 'seal';
