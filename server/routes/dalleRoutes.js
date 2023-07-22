import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import axios from "axios";
import FormData from "form-data";
dotenv.config();

const router = express.Router();
// const FormData = require('form-data');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
var i =1
router.route("/").get((req, res) => {
  res.send("Hello from DALL-E!");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    let data = new FormData();
    data.append("seedValue", "-1");
    data.append("inputText", prompt);
    data.append("width", "512");
    data.append("height", "512");
    data.append("styleId", "140");
    data.append("styleLabel", "Hotpot Art 9");
    data.append("isPrivate", "false");
    data.append("requestId", "8-mxTJwLexGrz1BNB");
    data.append(
      "resultUrl",
      `https://hotpotmedia.s3.us-east-2.amazonaws.com/8-mxTJwLexGrz1BN${i%2===0? 'A' : 'B'}.png`
    );
    i+=1
    console.log(i)
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.hotpot.ai/art-maker-sdte-zmjbcrr",
      headers: {
        Authorization: "hotpot-temp9n88MmVw8uaDzmoBq",
        ...data.getHeaders(),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        
        res.send(response.data)
        
      })
      .catch((error) => {
        console.log(error);
      });

    // let data = new FormData();
    // data.append('action', 'createAIImages');
    // data.append('returnUrl', '/');
    // data.append('searchType', 'aiPrompt');
    // data.append('aiPrompt', prompt);

    // let config = {
    // method: 'post',
    // maxBodyLength: Infinity,
    // url: 'https://freeimagegenerator.com/queries/queryCreateAIImagesFromTextPrompt.php?server=1',
    // headers: {
    //     'Cookie': 'PHPSESSID=0f8017b97c8699a1914d0519748f9c55; firstPage=freeimagegenerator.com%2Fqueries%2FqueryCreateAIImagesFromTextPrompt.php%3Fserver%3D1; referralPage=unknown; entryPage=freeimagegenerator.com%2Fqueries%2FqueryCreateAIImagesFromTextPrompt.php%3Fserver%3D1; timestampVisit=1690001622; experimentId=experimentNewVisitorDiscount20Yes; SERVERID=s1; _ga=GA1.2.1685714983.1690006182; _gid=GA1.2.1936931932.1690006182; __kla_id=eyIkZmlyc3RfbmFtZSI6IiIsIiRsYXN0X25hbWUiOiIiLCJVc2VyIFR5cGUiOiJuZXdWaXNpdG9yIiwiJHJlZmVycmVyIjp7InRzIjoxNjkwMDA2MTgzLCJ2YWx1ZSI6IiIsImZpcnN0X3BhZ2UiOiJodHRwczovL2ZyZWVpbWFnZWdlbmVyYXRvci5jb20vIn0sIiRsYXN0X3JlZmVycmVyIjp7InRzIjoxNjkwMDA2ODQxLCJ2YWx1ZSI6IiIsImZpcnN0X3BhZ2UiOiJodHRwczovL2ZyZWVpbWFnZWdlbmVyYXRvci5jb20vIn19; _dc_gtm_UA-2746940-13=1; _ga_2GPYH8GPHW=GS1.2.1690010349.2.1.1690011416.0.0.0',
    //     ...data.getHeaders()
    // },
    // data : data
    // };
    // axios.request(config)
    // .then((response) => {

    // // console.log(response.data.aiImageData[0]);
    // res.send(response.data.aiImageData[0].images[0].url)
    // })
    // .catch((error) => {
    // console.log(error);
    // });

    // const aiResponse = await openai.createImage({
    //     prompt,
    //     n:1,
    //     size: '1024x1024',
    //     response_format: 'b64_json',
    // })
    // const image = aiResponse.data.data[0].b64_json
    // res.status(200).json({photo: image});
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message);
  }
});

export default router;
