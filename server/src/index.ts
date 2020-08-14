if (process.env.NODE_ENV !== "production") {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const dotenv = require("dotenv");
	dotenv.config();
}

import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { ConnectToDatabase } from "./database";
import { typeDefs, resolvers } from "./graphql";
import bodyParser from "body-parser";
import compression from "compression";

const port = process.env.PORT || 9000;

const mount = async (app: Application) => {
	const db = await ConnectToDatabase();

	app.use(bodyParser.json({ limit: "2mb" }));
	app.use(cookieParser(process.env.COOKIE_SECRET));
	app.use(compression());
	if (process.env.NODE_ENV == "production") {
		app.use(express.static(`${__dirname}/client`));
		//redirect all routes to '/'
		app.get("/*", (_req, res) =>
			res.sendFile(`${__dirname}/client/index.html`)
		);
	}

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req, res }) => ({ db, req, res }),
	});

	server.applyMiddleware({ app, path: "/api" });

	app.listen(port, () => console.log(`server started on ${port}`));
};

mount(express());
