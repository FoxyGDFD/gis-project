export const toHexString = (bytes: any) => {
  return Array.from(bytes, (byte: any) => {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
};

export const formatFileSize = (bytes: number) => {
  if (bytes <= 0) return "0 B";
  const sufixes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2).replace(/\.00$/, "")} ${
    sufixes[i]
  }`;
};

export const formatFileName = (fileName: string) => {
  return fileName.split(".")[0];
};

export const formatTypesToInputAccept = (types: string[]) => {
  return types.join(",");
};


export const hexToRgbaArray = (hex: string) => {
  const color = hex.charAt(0) === '#' ? hex.substring(1, 9) : hex;

  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const a = parseInt(color.substring(6, 8), 16);

  return [r, g, b, a ? a : 255];
};
