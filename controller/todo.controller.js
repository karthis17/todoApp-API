import { db } from "../model/todoLIst.model.js";

const sql = {
    INSERT_TASK: "INSERT INTO todolist (user_id, task, date) VALUES(?, ?, ?)",
    SELECT_TASK: "SELECT * FROM todolist WHERE user_id = ? AND completed = ?",
    UPDATE_COMPLETED: "UPDATE todolist SET completed = true WHERE id = ?"
}

export const addToDolist = (user_id, task) => {
    let date = new Date();
    date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

    return new Promise((resolve, reject) => {
        console.log(user_id, task)
        db.run(sql.INSERT_TASK, [user_id, task, date], (err, result) => {
            if (err) {
                reject({
                    success: false,
                    message: err
                });
            }

            resolve({
                success: true,
                message: "task created successfully",
            });
        })

    });

}

export const getTasks = (user_id, completedOrNot) => {

    return new Promise((resolve, reject) => {
        db.all(sql.SELECT_TASK, [user_id, completedOrNot], (err, results) => {
            if (err) {
                reject({
                    success: false,
                    message: err
                });
            }
            console.log(results);
            resolve(results);

        })
    });

}

export const makeItComplete = (id) => {
    console.log(id);

    return new Promise((resolve, reject) => {
        db.run(sql.UPDATE_COMPLETED, [id], (err, results) => {
            if (err) {
                reject({
                    success: false,
                    message: err
                });
            }

            resolve({
                success: true,
                message: "updated successfully",
            })
        })
    });

}