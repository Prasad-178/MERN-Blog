"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const getAllBlogs_1 = __importDefault(require("../controllers/blogControllers/getAllBlogs"));
const createBlogController_1 = __importDefault(require("../controllers/blogControllers/createBlogController"));
const getMyBlogs_1 = __importDefault(require("../controllers/blogControllers/getMyBlogs"));
const verifyJWTLogin_1 = require("../middleware/verifyJWTLogin");
const getBlogById_1 = __importDefault(require("../controllers/blogControllers/getBlogById"));
const router = express_1.default.Router();
router.get('/allblogs', getAllBlogs_1.default);
router.get('/blog/:id', getBlogById_1.default);
router.use(verifyJWTLogin_1.verifyToken);
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads");
    },
    filename: (req, file, callback) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        callback(null, fileName);
    }
});
exports.upload = (0, multer_1.default)({
    storage: storage
});
router.post('/newblog', createBlogController_1.default);
router.post('/myblogs', getMyBlogs_1.default);
exports.default = router;
