/* eslint-disable prettier/prettier */
import dotenv from 'dotenv';

export async function CreateHtmlFromPdf(): Promise<string> {
  dotenv.config();
  const CMD_Python = process.env.CMD_Python;
  // const requestLoginSapiens = new RequestLoginSapiens(login);
  // const result = await  requestLoginSapiens.handle()
  // console.log("", result)
  // return result
  const { spawn } = require('child_process');
  // const childPython = spawn("python", ["--version"])
  const childPython = spawn(CMD_Python, ['./python/pdfToHtml.py', 'patrick']);
  console.log("aqui?")
  return new Promise<string>((resolve, reject) => {
    childPython.on('exit', (code: any) => {
      if (code == 0) {
        resolve('Pdt to html successfully');
      } else {
        reject('Erro to transform pdf');
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    childPython.on('error', (error: any) => {
      reject('`Erro ao executar o processo pythonHtml: ${error.message}`');
    });
  });
}
