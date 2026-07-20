import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearNotifications,
} from "../controllers/notification.controller.js";

const router = Router();

router.use(verifyJwt);

router.route("/").get(getNotifications);

router.route("/read-all").patch(markAllAsRead);

router.route("/clear").delete(clearNotifications); // 👈 Aa pela

router.route("/:notificationId/read").patch(markAsRead);

router.route("/:notificationId").delete(deleteNotification);

export default router;
