export const getNameFile = (fileName) => {
  if (!fileName) return fileName;

  const arrFileName = fileName.split('.');
  const fileExt = arrFileName[arrFileName.length - 1];

  let finalFileName = arrFileName.slice(0, arrFileName.length - 1).join('.');
  finalFileName = finalFileName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();

  return `${finalFileName}-${Date.now()}.${fileExt}`;
};
