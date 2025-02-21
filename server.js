import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

const VtexBaseUrl='https://trika.vtexcommercestable.com.br';

app.use(async (req, res, next) => {

  console.log("req.url", req.url)

  const url = `${VtexBaseUrl}${req.url}`

  const response = await axios.get(url);  

  res.header("Access-Control-Allow-Origin", "*");
    
  res.json({
    ...response.data
  });

  next();
});


app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});

