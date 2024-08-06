const express = require('express');
const router = express.Router();
const path = require('path');

const multer = require('multer');
const Tesseract = require('tesseract.js');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        var filename = Date.now() + path.extname(file.originalname);
        
       
        console.log(file)
        cb(null, filename )
        console.log(cb)
    }
})

const upload = multer({storage: storage})

router.post("/upload", upload.single('images'), async (req, res) => {
  try {
    const imagePath = path.join(__dirname, '../images', req.file.filename);
    const { data: { text } } = await Tesseract.recognize(
        imagePath,
        'eng', 
        {
            logger: info => console.log(info) 
        }
    );
    console.log('Recognized text:', text);

    res.status(200).json({ data: text  });
} catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed to recognize text' });
}
});


module.exports = router;
