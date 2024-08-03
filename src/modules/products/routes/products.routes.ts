import { Router } from "express";
import ProductController from "../controller/ProductController";

const productsRoutes = Router();

const productsController = new ProductController();

productsRoutes.get("/", productsController.index);
productsRoutes.get("/:id", productsController.listById);
productsRoutes.post("/", productsController.create);
productsRoutes.patch("/:id", productsController.update);
productsRoutes.delete("/:id", productsController.delete);

export default productsRoutes;