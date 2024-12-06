import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



export const register = async (req, res) => {
    

    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.Password,salt);



        const newUser = new User({
            FirstName: req.body.FirstName,
            LastName : req.body.LastName,
            Username: req.body.Username,
            Email: req.body.Email,
            Password: hash,
            Phone: req.body.Phone,
            DateOfBirth :req.body.DateOfBirth,
            Gender: req.body.Gender
        })
        await newUser.save(); // Lưu user và gán kết quả vào savedUser
        res.status(200).json({
            success: true,
            message: 'Successfully created User',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed, Please Try again'
        });
    }
};

export const login = async (req, res) => {
    const Email = req.body.Email;
    try {
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'User Not Found' });
        }

        // Kiểm tra mật khẩu
        const checkCorrectPassword = await bcrypt.compare(req.body.Password, user.Password);
        if (!checkCorrectPassword) {
            return res.status(401).json({ success: false, message: 'Incorrect email or password' });
        }

        // Tạo JWT token và bao gồm role trong token nhưng không trả về trong response
        const token = jwt.sign(
            { id: user._id, role: user.role },  // 'role' vẫn có trong JWT để dùng trong các request sau
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15d" }
        );

        // Xóa trường nhạy cảm trực tiếp trước khi trả về
        const userData = user.toObject(); // Chuyển sang object thuần để chỉnh sửa
        delete userData.Password;
        delete userData.role; // Ẩn 'role' khỏi response

        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: token.expiresIn,
        }).status(200).json({
            success: true,
            message: "Successfully login",
            token, // Trả về token để client có thể sử dụng trong các yêu cầu tiếp theo
            data: userData, // Trả về dữ liệu người dùng không có password và role
        });

    } catch (err) {
        console.error(err); // Log chi tiết lỗi ra console
        res.status(500).json({ 
            success: false, 
            message: 'Failed, Try again', 
            error: err.message // Trả về chi tiết lỗi để dễ dàng debug
        });
    }
};