import Config from "config";
import Routes from "./routes";
import Server from "./common/server";

const dbUrl = `mongodb+srv://MoonDive:Bluemoon@mores.msntkot.mongodb.net/Mores`;
const server = new Server()
  .router(Routes)
  .handleError()
  .configureDb(dbUrl)
  .then((_server) => _server.listen(Config.get("port")));

export default server;
