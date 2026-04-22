import { bootstrap } from "../gi-platform/bootstrap";
import { App } from "../gi-app/app";
import { routes } from "../gi-app/routes/routes";

const port = Number(process.env.PORT || 3000);

const platform = bootstrap({ port });
const app = new App(platform);

app.registerRoutes(routes);

