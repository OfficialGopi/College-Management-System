import { Router } from "express";
import { forgetPassword, getToken, getUser, postUser, updateUser } from "../controllers/UserController.js";

const user = Router()

user.post('/', postUser)
user.get('/gettoken', getToken)
user.get('/', getUser)
user.put('/update/:_id', updateUser)
user.put('/forgetpassword', forgetPassword)





export { user }