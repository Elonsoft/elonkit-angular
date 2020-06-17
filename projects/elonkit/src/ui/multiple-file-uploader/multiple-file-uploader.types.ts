export interface IESMultipleUploaderFile {
  id?: number;
  deleted?: boolean;
  type?: string;
  base64?: string;
  file?: string;
  name: string;
  size: number;
  content: File;
}

export interface IESMultipleUploaderChangeAction {
  files: IESMultipleUploaderFile[];
}

export interface IESMultipleUploaderRemoveAction {
  file: IESMultipleUploaderFile;
  index: number;
}
