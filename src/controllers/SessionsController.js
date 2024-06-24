const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require("../config/auth");
const { sign } = require("jsonwebtoken");

class SessionsController {
    async create(request, response) {
        let { email, password } = request.body;
        
        email = email.toLowerCase();
        const user = await knex("users").whereRaw("LOWER(email) = ?", [email]).first();

        if (!user) {
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError("E-mail e/ou senha incorreta", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn,
        });

        return response.json({ user, token });
    }
}

module.exports = SessionsController;
