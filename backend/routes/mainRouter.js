import { Router } from "express";

const mainRouter = new Router();

// Add routes
mainRouter.get("/", (req, res) => {
	return res.json({ mesasge: "Welcome to api server" });
});
// mainRouter.post('/', SessionController.store);
// mainRouter.put('/', SessionController.store);
// mainRouter.delete('/', SessionController.store);

export default mainRouter;
