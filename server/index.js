import Config from "config";
import Routes from "./routes";
import Server from "./common/server";

const dbUrl = `mongodb+srv://web3vishal:lx988iCjP0Zga9gu@cluster0.rqb3p.mongodb.net/`;
const server = new Server()
  .router(Routes)
  .handleError()
  .configureDb(dbUrl)
  .then((_server) => _server.listen(Config.get("port")));

export default server;
