export interface ESAvatarDefaultOptions {
  size?: number;
  textTypography?: string;
  variant?: ESAvatarForm;
}

// export type ESAvatarForm = 'round' | 'square';

export enum ESAvatarForm {
  Round = 'round',
  Square = 'square'
}

export interface ESAvatarGroupSets {
  alt?: string;
  src?: string;
  textTypography?: string;
}
