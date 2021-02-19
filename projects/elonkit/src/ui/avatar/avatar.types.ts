export interface ESAvatarDefaultOptions {
  height?: number;
  width?: number;
  borderRadius?: number;
  showStatus?: boolean;
  statusSrc?: string;
  statusWidth?: number;
  statusHeight?: number;
  statusBorderWidth?: number;
  textTypography?: string;
  variant?: ESAvatarForm;
  statusBorderColor?: string;
}

export type ESAvatarForm = 'round' | 'square';
