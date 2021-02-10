export interface ESAvatarDefaultOptions {
  avatarSrc?: string;
  height?: number;
  width?: number;
  altText?: string;
  borderRadius?: number;
  showStatus?: boolean;
  statusSrc?: string;
  statusWidth?: number;
  statusHeight?: number;
  statusBorderWidth?: number;
  textTypography?: string;
  formType?: ESAvatarForm;
  statusBorderColor?: string;
}

export type ESAvatarForm = 'round' | 'square';
