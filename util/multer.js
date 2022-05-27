const multer = require('multer');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads');
	},
	filename: function(req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		// const ext = file.mimetype.split('/')[1];
		cb(null, req.body.phoneNumber + '-' + uniqueSuffix + '.' + 'png');
	}
});

const upload = multer({ storage: storage });
// module.exports = upload;
const uploadUserImage = upload.single('Image');
module.exports = uploadUserImage;
