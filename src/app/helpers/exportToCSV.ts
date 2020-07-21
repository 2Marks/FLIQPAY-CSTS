import { parseAsync } from 'json2csv';
import { saveFile } from './saveFile';

interface ExportToCSVDTO {
  data: any;
  fields: any[];
  name?: string;
}
export async function exportToCSV({
  data,
  fields,
  name,
}: ExportToCSVDTO): Promise<{ fileName: string }> {
  const csvData = await parseAsync(data, { fields });
  let fileName = name ? name : 'fliqpay_csts_downloads';

  if (!fileName.split('.').includes('csv')) {
    fileName = `${fileName}.csv`;
  }

  const { fileName: newFileName } = await saveFile(fileName, csvData);

  return {
    fileName: newFileName,
  };
}
