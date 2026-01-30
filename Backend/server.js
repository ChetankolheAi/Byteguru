import express from "express";
import cors from "cors";
import taskRoutes  from './Routes/index.js';
import './Model/db.js'; 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
  
app.use('/api', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
