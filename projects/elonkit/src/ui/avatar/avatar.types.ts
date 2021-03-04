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
