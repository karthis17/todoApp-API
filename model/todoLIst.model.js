import sqlite3 from "sqlite3";
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../instance/data.db');

export const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err, "hi");
    } // else {
    //     db.serialize(() => {
    //         db.run(`CREATE TABLE  user (
    //             id INTEGER PRIMARY KEY,
    //             name TEXT,
    //             email TEXT NOT NULL UNIQUE,
    //             password TEXT NOT NULL
    //         )`, (createUserErr) => {
    //             if (createUserErr) {
    //                 console.error("Error creating 'user' table:", createUserErr);
    //             } else {
    //                 db.run(`CREATE TABLE todolist (
    //                     id INTEGER PRIMARY KEY,
    //                     user_id INTEGER,
    //                     task TEXT NOT NULL,
    //                     completed BOOLEAN DEFAULT 0,
    //                     date TEXT NOT NULL,
    //                     FOREIGN KEY (user_id) REFERENCES user(id)
    //                 )`, (createTodoListErr) => {
    //                     if (createTodoListErr) {
    //                         console.error("Error creating 'todolist' table:", createTodoListErr);
    //                     } else {
    //                         console.log("Tables 'user' and 'todolist' created successfully.");
    //                     }
    //                 });
    //             }
    //         });
    //     });
    // }
});


