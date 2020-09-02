export const validateFileType = (file: any, types: string): boolean => {
  const typesArr = types.split(',').map((v) => v.trim());
  return typesArr.includes('*') || typesMatch(typesArr, file);
};

const typesMatch = (types: string[], file: File): boolean =>
  types.some(
    (type) =>
      type === file.type ||
      typeMatchesFileType(type, file.type) ||
      typeMatchesFilenameExtension(type, file.name)
  );

const typeMatchesFilenameExtension = (type: string, fileName: string): boolean =>
  type.charAt(0) === '.' && fileName.toLowerCase().endsWith(type);

const typeMatchesFileType = (type: string, fileType: string): boolean =>
  type.endsWith('/*') && fileType.startsWith(type.replace(/\/.*$/, ''));
