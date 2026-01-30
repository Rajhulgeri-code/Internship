import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/dashboard", auth(["client"]), (req, res) => {
  res.json({
    success: true,
    message: "Client dashboard access granted"
  });
});

export default router;
