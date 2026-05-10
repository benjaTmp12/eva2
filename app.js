const express = require('express');
const app = express();
const port = 3000;

const climaRoutes = require('./routes/climaRoutes');
const gimnasioRoutes = require('./routes/gimnasioRoutes'); 

app.use(express.json());

app.use('/clima', climaRoutes);
app.use('/gimnasio', gimnasioRoutes); 

app.get('/', (req, res) => {
    res.send('API FUNCIONANDO');
});

app.listen(port, () => {
    console.log(`Servidor volando en http://localhost:${port}`);
});