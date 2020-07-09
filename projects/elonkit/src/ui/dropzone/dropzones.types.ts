export interface ESDropzoneFile {
  id?: number;
  deleted?: boolean;
  type?: string;
  base64?: string;
  file?: string;
  name: string;
  size: number;
  content: File | string;
}

export interface ESDropzoneOptions {
  accept?: string;
  maxSize?: number;
  type?: string;
}
