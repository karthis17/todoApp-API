import { Router } from "express";
import { getUserById, login, register } from "../controller/user.controller.js";

const router = Router();

router.post('/register', async (req, res) => {
    console.log(req.body);
    // call register fuction which is in controller file (user.controller) and pass user details
    const user = await register(req.body.name, req.body.email, req.body.password)

    console.log(user);
    if (!user) res.status(404).send(user);
    res.send(user);

});

router.post('/login', async (req, res) => {
    console.log(req.body);
    // call login fuction which is in controller file (user.controller) and pass user details
    const user = await login(req.body.email, req.body.password)

    console.log(user);
    if (!user) res.status(404).send(user);
    res.send(user);


});

router.get('/get-user/:id', (req, res) => {

    getUserById(req.params.id).then((user) => {
        res.send(user);
    }).catch((err) => {
        res.status(404).send(err);
    });


});

export default router;