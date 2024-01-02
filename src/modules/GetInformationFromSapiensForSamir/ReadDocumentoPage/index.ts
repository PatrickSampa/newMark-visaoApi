import { ReadDocumentPageUseService } from "./ReadDocumentPageUseService";
import { ReadDocumentPageUseController } from "./ReadDocumentPageController";

export const readDocumentPageUseService = new ReadDocumentPageUseService();
export const readDocumentPageUseController = new ReadDocumentPageUseController(readDocumentPageUseService);
