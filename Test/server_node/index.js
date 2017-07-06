let express = require('express');
let app = express();
let formidable = require('express-formidable');
let fs = require('fs');

app.use(formidable({
  uploadDir: './public'
}));
app.listen(3000, () => console.log('Server started'));
app.post('/', (req, res) => {
    fs.rename(req.files.image.path, req.files.image.path+'.jpg', err => {});
});