import path from 'path';
import * as fs from 'fs';

export function deletePDF(filename: string): void {
  const filePath = path.join(`./src/modules/Pdfs/${filename}.pdf`);
  /* const filePath = path.join('resources/app/build/modules/GetPdfSislabra/GetPdfSislabra/sislabra.pdf'); */
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`${filename} was deleted successfully`);
  });
}
