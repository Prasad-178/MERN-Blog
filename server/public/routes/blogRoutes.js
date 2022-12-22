"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const getAllBlogs_1 = __importDefault(require("../controllers/getAllBlogs"));
const createBlogController_1 = __importDefault(require("../controllers/createBlogController"));
const getMyBlogs_1 = __importDefault(require("../controllers/getMyBlogs"));
const verifyJWTLogin_1 = require("../middleware/verifyJWTLogin");
const router = express_1.default.Router();
router.get('/allblogs', getAllBlogs_1.default);
router.use(verifyJWTLogin_1.verifyToken);
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads/");
    },
    filename: (req, file, callback) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        callback(null, fileName);
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            callback(null, true);
        }
        else {
            callback(null, false);
            return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
router.post('/newblog', upload.single("image"), createBlogController_1.default);
router.get('/myblogs', getMyBlogs_1.default);
exports.default = router;
