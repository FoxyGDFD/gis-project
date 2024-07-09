import jsPDF from 'jspdf';

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

export const hexToRgbaArray = (hex: string, alpha?: string | number) => {
  const color = hex.charAt(0) === "#" ? hex.substring(1, 9) : hex;

  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  let a = 255;
  if (alpha) {
    a = +alpha > 255 ? 255 : +alpha < 0 ? 0 : +alpha;
  }

  return [r, g, b, a];
};

export const formatFileType = (fileType: string) => {
  return fileType.split('/')[1];
};

export const formatAcceptedTypesToInputAccept = (acceptedTypes: string[]) => {
  return acceptedTypes.join(',');
};


export const saveMap = (canvas: HTMLCanvasElement, type: string ) => {
  const a = document.createElement('a');
  switch (type) {
    case'application/pdf':
      saveCanvasAsPDF(canvas);
      break;

    default:
      a.href = canvas.toDataURL(type);
      a.download = `map.${formatFileType(type)}`;
      a.click();
      break;
  }
}

const saveCanvasAsPDF = (canvas: HTMLCanvasElement) => {
  const pdf = new jsPDF('l', 'px', [canvas.width, canvas.height]);
      pdf.setTextColor('#000000');

      pdf.addImage(
        canvas.toDataURL(),
        0,
        0,
        canvas.width,
        canvas.height
      );

      pdf.save('map.pdf');
}