export interface ESImageCarouselFile {
  id?: number;
  deleted?: boolean;
  type?: string;
  base64?: string;
  file?: string;
  name: string;
  size: number;
  content: File | string;
}

export interface ESImageCarouselAction {
  file: ESImageCarouselFile;
  index: number;
}

export interface ESImageCarouselOptions {
  imageTypes?: string;
  imageHeight?: number;
  imageWidth?: number;
  gap?: number;
  canRemove?: boolean;
  canView?: boolean;
  viewSvgIcon?: string;
}
