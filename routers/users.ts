import express from  'express';
import SetLocalStorage from '../modules/setLocalStorage';
const router = express.Router();

router.get("/:username", (req, res) => {

  if (req.params.username) {
    res.send(SetLocalStorage("username", req.params.username, "/user"));
  } else {
    res.redirect("/users");
  }
});

export default router;