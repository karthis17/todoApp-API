import { db } from "../model/todoLIst.model.js";
import bcrypt from "bcrypt";


const sql = {
    INSERT_USER: "INSERT INTO user (name, email, password) VALUES(?, ?, ?)",
    SELECT_USER: "SELECT * FROM user WHERE id = ?",
}

const getUser = (email) => {
    return new Promise((resolve, reject) => {
        db.get(sql.SELECT_USER, [email], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

export const register = async (name, email, password) => {
    try {
        const salt = await bcrypt.genSalt(5);
        const hashPassword = await bcrypt.hash(password, salt);

        // Check if the user with the given email already exists
        if (await getUser(email)) {
            return {
                success: false,
                message: 'User already exists.'
            };
        }
        return new Promise((resolve, reject) => {
            db.run(sql.INSERT_USER, [name, email, hashPassword], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        success: true,
                        message: 'Registered successfully.',
                        id: this.lastID // Assuming the ID is obtained from the result
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error in registration:', error);
        throw error;
    }
}

export const login = async (email, password) => {
    try {
        const existingUser = await getUser(email);

        // Check if the user with the given email already exists
        if (!existingUser) {
            return {
                success: false,
                message: 'Invalid email id'
            }
        }
        const isValid = bcrypt.compare(password, existingUser.password);

        if (!isValid) {
            return {
                success: false,
                message: "Invalid password"
            }
        }

        return {
            success: true,
            message: "Login successfully",
            id: existingUser.id
        };


    } catch (error) {
        throw new Error(error);
    }

}

export const getUserById = (id) => {

    try {
        return new Promise((resolve, reject) => {
            db.get(sql.SELECT_USER, [id], (err, result) => {
                if (err || !result) {
                    reject({
                        success: false,
                        message: "User not found",
                        error: err
                    });
                } else {
                    resolve({
                        success: true,
                        email: result.email,
                        name: result.name
                    });
                }
            });
        });
    } catch (error) {
        throw new Error(error);
    }

}