import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import CatRoute from "./routes/CatRoutes.js";
import ArticleRoute from "./routes/ArticleRoutes.js";
import AdoptRoute from "./routes/AdoptRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(CatRoute);
app.use(ArticleRoute);
app.use(AdoptRoute);

app.listen(5000, () => console.log('Server up and running...'));