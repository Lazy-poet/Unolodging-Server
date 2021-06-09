"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firebaseConfig_1 = require("../firebaseConfig");
const router = express_1.Router();
router.get("/:id", function (req, res, next) {
    const { id } = req.params;
    firebaseConfig_1.db.collection("bookings")
        .get()
        .then((resp) => {
        const allRooms = resp.docs.map((room) => ({ ...room.data() }));
        const bookedByUsers = allRooms.filter((room) => room.userEmail === id).map(item => item.roomId);
        console.log(bookedByUsers);
        const hostBookings = allRooms.filter(room => room.hostId === id);
        firebaseConfig_1.db.collection("rooms")
            .get()
            .then((resp) => {
            const allRooms = resp.docs.map((room) => ({ ...room.data() }));
            const rooms = allRooms.filter(room => bookedByUsers.includes(room.roomId));
            res.status(200).json({ userBookings: rooms, hostBookings });
        });
    });
});
exports.default = router;
