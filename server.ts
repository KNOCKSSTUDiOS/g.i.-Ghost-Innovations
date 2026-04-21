import http from "http";
import { createCore } from "./gi-core/core";
import { createRouter } from "./gi-router/router";

import { registerAuthExtension } from "./gi-extensions-auth/auth-extension";
import { registerUserExtension } from "./gi-extensions-user/user-extension";
import { registerSystemExtension } from "./gi-extensions-system/system-extension";

const core = createCore();
const router = createRouter(core);

registerAuthExtension(router, core);
registerUserExtension(router, core);
registerSystemExtension(router, core);

const server = http.createServer(async (req, res) => {
  await router.handle(req, res);
});

server.listen(8080, () => {
  core.logger.log("server_started");
});
