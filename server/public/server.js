"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import path from "path"
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// mounting middleware
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', methods: ["GET", "POST", "PUT", "DELETE"], credentials: true, exposedHeaders: ['Set-Cookie', 'Date', 'ETag'] }));
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/api/secure', routes_1.default);
app.use('/api/blogs', blogRoutes_1.default);
mongoose_1.default.
    connect(`mongodb+srv://prasad178:${process.env.MONGODB_PASSWORD}@cluster0.hvwuyz0.mongodb.net/auth?retryWrites=true&w=majority`)
    .then(() => {
    app.listen(5000, () => {
        console.log("Server live on port 5000");
    });
}).catch((err) => console.log(err));
