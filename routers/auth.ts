import express, { Router } from "express";
import crypto from "crypto";
import DiscordOauth2 from "discord-oauth2";
import path from "path";
import auth from "../auth.json";
import SetLocalStorage from "../modules/setLocalStorage";
const router = express.Router();

const oauth = new DiscordOauth2(auth.authData);

router.get("/", (req, res) => {});

router.get("/request", (req, res) => {
	res.redirect(
		oauth.generateAuthUrl({
			scope: ["identify", "guilds", "guilds.join"],
			state: crypto.randomBytes(16).toString("hex"),
		})
	);
});

router.get("/callback", (req, res) => {
	const code = req.query.code?.toString();

	oauth
		.tokenRequest({
			clientId: auth.authData.clientId,
			clientSecret: auth.authData.clientSecret,

			scope: ["identify", "guilds", "guilds.join"],
			grantType: "authorization_code",
			code: code,
		})
		.then((token) => {
			const accessToken = token.access_token;

			res.send(SetLocalStorage("token", accessToken, "/api/auth/nick"));
            console.log(accessToken);
		})
		.catch((err) => {
			console.error(err);
			res.send(SetLocalStorage("error", `Error: ${err}`, "/")); //api/error
		});
});

router.get("/nick", (req, res) => {
	res.sendFile(path.resolve(__dirname + "/../assets/pages/static/nick.html"));
});

router.get("/joinserver", (req, res) => {
	const token = req.query.token?.toString();
	const nick = req.query.nick?.toString();

	if (!token || !nick) {
		res.send(SetLocalStorage("error", "An error occured, ERR: token == null | nick == null", "/"));
		return;
	}

	oauth
		.getUser(token ?? "")
		.then((user) => {

            console.log(user);

            
			const id = user.id;
			const username = user.username;
			const discriminator = user.discriminator;
			const avatar = user.avatar;

			console.log(token);

			oauth.addMember({
				accessToken: token ?? "",
				guildId: auth.guildId,
				nickname: nick,
				userId: id,
				botToken: auth.botToken,
			});

			console.log(
				`${username}#${discriminator} (${id}) has been added to the server as ${nick}!`
			);
		})
		.catch((err) => {
			console.error(err);
		});
});

export default router;
