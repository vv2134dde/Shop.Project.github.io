import { Request, Response, Router } from 'express';
import {  IUserRequisitesEntity } from "../../types";
import { connection } from "../../index";
import { IAuthRequisites  } from "@Shared/types";
import { body, validationResult } from "express-validator";

export const authRouter = Router();

// authRouter.post('/', async (
//     req: Request<{}, {}, IAuthRequisites>,
//     res: Response
// ) => {
//     const { username, password } = req.body;
//     const [data] = await connection.query < IUserRequisitesEntity[] > (
//         "SELECT * FROM users WHERE username = ? AND password = ?",
//         [username, password]
//     );

//     if (!data?.length) {
//         res.status(404);
//     }

//     res.send();
// });

authRouter.post(
    '/',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async (
        req: Request<{}, {}, IAuthRequisites>,
        res: Response
    ) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400);
            res.json({ errors: errors.array() });
            return;
        }

        const { username, password } = req.body;
        const [data] = await connection.query < IUserRequisitesEntity[] > (
            "SELECT * FROM users WHERE username = ? AND password = ?",
            [username, password]
        );

        if (!data?.length) {
            res.status(404);
        }

        res.send();
    });