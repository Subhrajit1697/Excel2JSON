const express = require('express');
const cors = require('cors');
const multer = require('multer');
const csv = require('csv-parser');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    const filePath = path.join(__dirname, req.file.path);
    const extention = path.extname(req.file.originalname);

    try {
        if (extention === '.csv') {
            const results = [];
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    res.json(results);
                });
        } else if (extention === '.xlsx') {
            const workbook = xlsx.readFile(filePath);
            const sheet_name_list = workbook.SheetNames;
            const json = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            res.json(json);
        } else {
            res.json({ message: 'File type not supported' });
        }
    } catch (error) {
        res.json({ message: 'Error occured' });
        console.log(error);
    }

});




app.get('/', (req, res) => {
    res.send('Hello World');
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});