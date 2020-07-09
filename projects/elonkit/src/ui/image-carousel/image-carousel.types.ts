export interface ESImageCarouselFile {
  id?: number;
  deleted?: boolean;
  type?: string;
  base64?: string;
  file?: string;
  name: string;
  size: number;
  content: File;
}

export interface ESImageCarouselRemoveAction {
  file: ESImageCarouselFile;
  index: number;
}
