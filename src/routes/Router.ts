import { Router } from 'express';
import { loginController } from '../modules/Login/index';
import { getUserResponsibleIdController } from '../modules/GetUserResponsibleId/index';
import { getInformationFromSapiensForSamirController } from '../modules/GetInformationFromSapiensForSamir/ReadDocumentoMoviment';
import { readDocumentPageUseController } from '../modules/GetInformationFromSapiensForSamir/ReadDocumentoPage';

const rotasTestes = Router();

rotasTestes.post('/login', (req, res) => {
  return loginController.handle(req, res);
});

rotasTestes.get('/id', (req, res) => {
  return getUserResponsibleIdController.handle(req, res);
});

rotasTestes.post('/processos', (req, res) => {
  return getInformationFromSapiensForSamirController.handle(req, res);
});

rotasTestes.get('/page', (req, res) => {
  return readDocumentPageUseController.handle(req, res);
});

export { rotasTestes };
