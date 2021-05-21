"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firebaseConfig_1 = require("../firebaseConfig");
const router = express_1.Router();
router.get("/", function (req, res, next) {
    //implementation
    firebaseConfig_1.db.collection("rooms")
        .get()
        .then((resp) => {
        const allRooms = resp.docs.map((room) => ({ ...room.data() }));
        res.status(200).json(allRooms);
    });
});
exports.default = router;
