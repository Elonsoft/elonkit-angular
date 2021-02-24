export interface ESAvatarDefaultOptions {
  size?: number;
  borderRadius?: number;
  showStatus?: boolean;
  statusSrc?: string;
  statusSize?: number;
  statusBorderWidth?: number;
  textTypography?: string;
  variant?: ESAvatarForm;
  statusBorderColor?: string;
}

export type ESAvatarForm = 'round' | 'square';

export interface ESAvatarGroupSets {
  alt?: string;
  src?: string;
  showStatus?: boolean;
  statusSrc?: string;
  statusSize?: number;
  statusBorderWidth?: number;
  textTypography?: string;
}
