export interface ESDragAndDropFile {
  id?: number;
  deleted?: boolean;
  type?: string;
  base64?: string;
  file?: string;
  name: string;
  size: number;
  content: File;
}
