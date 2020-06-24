export interface ESFileListFile {
  id?: number;
  deleted?: boolean;
  type?: string;
  base64?: string;
  file?: string;
  name: string;
  size: number;
  content: File;
}

export interface ESFileListRemoveAction {
  file: ESFileListFile;
  index: number;
}
