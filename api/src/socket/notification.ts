import NotificationModel from "../model/Notification";
import socketIO from "./socketIO";

export default async (socket: any, tokenUser) => {
  socket.on("getUserNotifications", async () => {
    const notification = await NotificationModel.find({
      user: tokenUser.id,
    }).sort({ _id: -1 });
    socketIO.to(socket.id).emit("getUserNotifications", notification);
  });
  //   socket.on("updateBulkNotification", async (id: any) => {
  //     const notification = await NotificationModel.update(
  //       { isRead: true },
  //       {
  //         where: {
  //           id: {
  //             [Op.in]: id,
  //           },
  //           authId: tokenUser?.id,
  //         },
  //       }
  //     );
  //     socketIO.to(socket.id).emit("getUserNotifications", notification);
  //   });
};
