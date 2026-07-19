import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearNotifications
} from "../controllers/notification.controller.js";

const router = Router();

router.use(verifyJwt);

router.route("/").get(getNotifications);

router.route("/read-all").patch(markAllAsRead);

router.route("/:notificationId/read").patch(markAsRead);

router.route("/:notificationId").delete(deleteNotification);
router.route("/clear").delete(clearNotifications);

export default router;