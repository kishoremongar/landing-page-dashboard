export const base64ToFile = (base64Data) => {
  const binaryData = atob(base64Data.split(',')[1]);
  const bytes = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    bytes[i] = binaryData.charCodeAt(i);
  }
  const fileNameMatch = base64Data.match(/data:.*?;base64,.*?,(?<fileName>.*)/);
  const fileName = fileNameMatch?.groups.fileName || 'image.png';

  const fileTypeMatch = base64Data.match(/data:(?<fileType>.*?);base64/);
  const fileType = fileTypeMatch?.groups.fileType || 'image/png';

  const file = new File([bytes], fileName, { type: fileType });
  return file;
};
