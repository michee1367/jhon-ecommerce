import { EventHandlerRequest, H3Event, readMultipartFormData } from "h3";
import Axios from "axios";
import https from "https";
import FormData from "form-data";

const instance = Axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

let config = {
  password:"passwordF4L4%Pgd978vLpy^KFN*A4qg!zkoAnT3!jmA",
  maxAge: 60 * 60 * 24 * 1000,
  name:"main"
}

export default defineEventHandler(async (event) => {
  return await meProxy(event);
});


async function meProxy(event: H3Event<EventHandlerRequest>) {

  const method = event.method;
  const originalUrl = event.path;

  const sessionData = await useSession(event, config);
  const user = sessionData.data.user;

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "unauthorized"
    });
  }

  const destURL = `${process.env.API_URL}` + originalUrl.slice(4);

  console.log("##########################################")
  console.log("##########################################")
  console.log(user.jwt_token)
  console.log("##########################################")
  console.log("##########################################")

  let headers = {
    Authorization: "Bearer " + user.jwt_token,
    Accept: "application/json"
  };

  let axiosResponse;

  try {

    // 📌 Si on reçoit un multipart/form-data
    if (isMultipart(event)) {

      const form = new FormData();
      const parts = await readMultipartFormData(event);

      if (parts) {
        for (const part of parts) {
          if (part.filename) {
            // fichier
            form.append(part.name, part.data, {
              filename: part.filename,
              contentType: part.type
            });
          } else {
            // champ texte
            form.append(part.name, part.data.toString());
          }
        }
      }

      // fusionner les headers form-data générés automatiquement
      Object.assign(headers, form.getHeaders());

      axiosResponse = await instance.request({
        method,
        url: destURL,
        data: form,
        headers
      });

    } else if (["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {

      // 📌 JSON classique
      const body = await readBody(event);

      axiosResponse = await instance.request({
        method,
        url: destURL,
        data: body,
        headers
      });

    } else {
      // 📌 GET / DELETE
      axiosResponse = await instance.request({
        method,
        url: destURL,
        headers
      });
    }

    setResponseStatus(event, axiosResponse.status);
    return axiosResponse.data;

  } catch (e) {
    console.error("Proxy error:", e);
    throw createError({
      statusCode: 500,
      statusMessage: "Proxy Server Error",
      data: e.message
    });
  }
}


/**
 * Détecte si la request est multipart
 */
function isMultipart(event: H3Event) {
  const type = getHeader(event, "content-type") || "";
  return type.includes("multipart/form-data");
}
