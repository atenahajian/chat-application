import { serve } from "./deps.js";
import { configure, renderFile } from "./deps.js";

import * as messageService from "./services/messageService.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const addMessage = async (request) => {
  const formData = await request.formData();

  const sender= formData.get("sender");
  const message = formData.get("message");

  await messageService.add(sender, message);

  return redirectTo("/");
};


const handleRequest = async (request) => {
  const data = {
      message: await messageService.findLastFive()
  };

  if (request.method === "POST") {
      return await addMessage(request);
  }

  return new Response(await renderFile("index.eta", data), responseDetails);
};

serve(handleRequest, { port: 7777 });