export interface ESDropzoneFile {
  id?: number;
  type?: string;
  base64?: string;
  name: string;
  size: number;
  content: File | string;
}

export interface ESDropzoneDefaultOptions {
  accept?: string;
  svgIcon?: string;
  maxSize?: number;
  type?: 'base64' | 'binary';
  headingTypography?: string;
  subheadingTypography?: string;
}

export interface ESDropzoneValidationError {
  fileName: string;
  error: 'FILE_TYPE' | 'FILE_SIZE';
}
