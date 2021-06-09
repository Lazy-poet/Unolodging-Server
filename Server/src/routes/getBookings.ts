import { Router, Request, Response, NextFunction } from "express";
import { db } from "../firebaseConfig";

const router = Router();
router.get(
  "/:id",
  function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    db.collection("bookings")
      .get()
      .then((resp) => {
        const allRooms = resp.docs.map((room) => ({ ...room.data() }));
        const bookedByUsers = allRooms.filter((room) => room.userEmail === id).map(item => item.roomId);
        console.log(bookedByUsers)
        const hostBookings = allRooms.filter(room => room.hostId === id);
        db.collection("rooms")
        .get()
        .then((resp)=> {
            const allRooms = resp.docs.map((room) => ({ ...room.data() }));
            const rooms = allRooms.filter(room => bookedByUsers.includes(room.roomId))
            res.status(200).json({userBookings: rooms, hostBookings});
        } )
    });
  }
);
export default router;
