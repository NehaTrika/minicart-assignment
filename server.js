import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

const VtexBaseUrl='https://trika.vtexcommercestable.com.br';

app.use(async (req, res, next) => {

  const url = `${VtexBaseUrl}${req.url}`

  const response = await axios.get(url);  
    
  res.json({
    ...response.data
  });

  next();
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

