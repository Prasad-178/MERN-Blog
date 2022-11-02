"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const verificationRoutes_1 = __importDefault(require("./routes/verificationRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const userSignupController_1 = __importDefault(require("./controllers/userSignupController"));
const userLoginController_1 = __importDefault(require("./controllers/userLoginController"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
// mounting middleware
app.use((0, express_session_1.default)({
    secret: "2t26edge2e6g27e6g27e6dybwd72bd28dgyb2t2gd28",
    resave: false,
    saveUninitialized: true,
}));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/secure', verificationRoutes_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'client', 'build')));
// app.use(express.static(path.join(__dirname, '..', 'client', 'public')))
mongoose_1.default.
    connect("mongodb+srv://prasad178:pass123@cluster0.hvwuyz0.mongodb.net/auth?retryWrites=true&w=majority").then(() => {
    app.listen(3000, () => {
        console.log("Server live on port 3000");
    });
}).catch((err) => console.log(err));
app.get('/*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendFile(path_1.default.join(__dirname, '../client/build/index.html'));
}));
app.post('/login', userLoginController_1.default);
app.post('/register', userSignupController_1.default);
