export interface ESDropzoneFile {
  id?: number;
  type?: string;
  base64?: string;
  name: string;
  size: number;
  content: File | string;
}

export interface ESDropzoneOptions {
  accept?: string;
  svgIcon?: string;
  maxSize?: number;
  type?: 'base64' | 'binary';
}
