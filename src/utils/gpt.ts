import { Configuration, OpenAIApi } from "openai";
import { IQuestion } from "./interfaces";

const configuration = new Configuration({
  apiKey: process.env.OPENAIAPIKEY,
});

const openai = new OpenAIApi(configuration);

export default openai;
