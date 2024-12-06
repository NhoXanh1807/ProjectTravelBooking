import jwt from 'jsonwebtoken';

// Hàm verifyToken
const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ success: false, message: "You're not authorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Token is invalid" });
        }
        req.user = user;  // Lưu thông tin user vào req.user
        next();  // Tiếp tục xử lý
    });
};

// Middleware để kiểm tra quyền truy cập của user
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role === "traveler") {
            next();  // Nếu người dùng là owner của tài nguyên hoặc có quyền "traveler", cho phép tiếp tục
        } else {
            return res.status(401).json({ success: false, message: "You're not authenticated" });
        }
    });
};

// Middleware để kiểm tra quyền admin
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === "operator") {
            next();  // Nếu user có quyền "operator", cho phép tiếp tục
        } else {
            return res.status(401).json({ success: false, message: "You're not authorized" });
        }
    });
};
