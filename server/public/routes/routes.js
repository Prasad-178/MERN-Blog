"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userSignupController_1 = __importDefault(require("../controllers/authControllers/userSignupController"));
const userLoginController_1 = __importDefault(require("../controllers/authControllers/userLoginController"));
const verifyJWTLogin_1 = require("../middleware/verifyJWTLogin");
const VerifyEmail_1 = require("../controllers/authControllers/VerifyEmail");
const userDetails_1 = __importDefault(require("../controllers/authControllers/userDetails"));
const userLogoutController_1 = __importDefault(require("../controllers/authControllers/userLogoutController"));
const checkUserVerification_1 = __importDefault(require("../middleware/checkUserVerification"));
const router = express_1.default.Router();
router.get('/emailverification', checkUserVerification_1.default);
router.post('/register', userSignupController_1.default);
router.post('/login', userLoginController_1.default);
router.post('/verifyemail', VerifyEmail_1.verifyEmail);
router.get('/userdetails', userDetails_1.default);
router.use(verifyJWTLogin_1.verifyToken);
router.get('/logout', userLogoutController_1.default);
router.get('/checkemailverification');
exports.default = router;
