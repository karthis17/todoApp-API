import { Router } from "express";
import { addToDolist, getTasks, makeItComplete } from "../controller/todo.controller.js";

const router = new Router();


router.post('/add-task', (req, res) => {

    addToDolist(req.body.id, req.body.task).then((done) => {
        res.send(done);
    }).catch((err) => {
        res.send(err);
    });

});

router.get('/get-task/:id', (req, res) => {

    getTasks(req.params.id, 0).then((tasks) => {
        res.send(tasks);
    }).catch((err) => {
        res.status(500).send(err);
    });

});

router.get('/completed-task/:id', (req, res) => {
    getTasks(req.params.id, 1).then((tasks) => {
        res.send(tasks);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.get('/make-it-complete/:id', (req, res) => {

    makeItComplete(req.params.id).then((tasks) => {
        res.send(tasks);
    }).catch((err) => {
        res.status(500).send(err);
    });

});


export default router;