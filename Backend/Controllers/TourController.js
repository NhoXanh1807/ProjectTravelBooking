import Tour from '../models/Tour.js'

export const createTour = async (req,res) => {
    const newTour = new Tour (req.body) ;
    try {
        const savedTour = await newTour.save();
        res.status(200).json({success:true,message:'Successfully created tour' ,
            data:savedTour
        });

    } catch (err) {
        res .status(500).json({success:false,message:'Failed, Try again'});
    }
};

export const updateTour = async (req,res) => {
    const id =req.params.id
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id,{$set: req.body},{new:true});
        res.status(200).json({success:true,message:'Successfully update tour' ,
            data:updateTour
        });

    } catch (err) {
        res .status(500).json({success:false,message:'Failed, Try again'});
    }
};


export const deleteTour = async (req,res) => {
    const id = req.params.id;
    try {
        await  Tour.findByIdAndDelete(id);
        res.status(200).json({success:true,message:'Successfully deleted' ,
            
        });

    } catch (err) {
        res .status(500).json({success:false,message:'Failed, Try again'});
    }
};


export const getSingleTour = async (req,res) => {
    const id = req.params.id;
    try {
        const tour = await Tour.findById(id);
        res.status(200).json({success:true,message:'Successfully ' ,
            data:tour
        });

    } catch (err) {
        res .status(404).json({success:false,message:'Not Found'});
    }
};



export const getAllTour = async (req,res) => {
    const page = parseInt(req.query.page)
    
    try {
        const tours = await Tour.find({})
   
        res.status(200).json({success:true,count:tours.length,message:'Successfully ' ,
            data:tours
        });

    } catch (err) {
        res .status(404).json({success:false,message:'Not Found'});
    }
};


export const getTourBySearch = async (req, res) => {
    try {
        // Lấy thông tin từ query string
        const { location, startDate, endDate } = req.query;

        // Tạo query tìm kiếm
        let query = {};

        // Tìm kiếm theo địa điểm
        if (location) {
            query.Locations = { $regex: location, $options: 'i' }; // Tìm kiếm không phân biệt hoa thường
        }

        // Tìm kiếm theo ngày
        if (startDate && endDate) {
            query.StartDate = { $gte: new Date(startDate) }; // Ngày bắt đầu >= startDate
            query.EndDate = { $lte: new Date(endDate) }; // Ngày kết thúc <= endDate
        }

        // Lấy danh sách tour từ database
        const tours = await Tour.find(query);

        // Trả kết quả
        res.status(200).json({
            success: true,
            count: tours.length,
            data: tours,
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            success: false,
            message: 'nNot Found',
        });
    }
};


export const getTourByAdvancedSearch = async (req, res) => {
    try {
        // Lấy các thông tin từ query string
        const { location, startDate, endDate, minPrice, maxPrice, name } = req.query;

        // Tạo query tìm kiếm
        let query = {};

        // Tìm kiếm theo địa điểm
        if (location) {
            query.Locations = { $regex: location, $options: 'i' }; // Tìm theo chuỗi không phân biệt hoa thường
        }

        // Tìm kiếm theo ngày bắt đầu và ngày kết thúc
        if (startDate && endDate) {
            query.StartDate = { $gte: new Date(startDate) }; // Ngày bắt đầu >= startDate
            query.EndDate = { $lte: new Date(endDate) }; // Ngày kết thúc <= endDate
        } else if (startDate) {
            query.StartDate = { $gte: new Date(startDate) }; // Nếu chỉ có startDate
        } else if (endDate) {
            query.EndDate = { $lte: new Date(endDate) }; // Nếu chỉ có endDate
        }

        // Tìm kiếm theo khoảng giá (Price Range)
        if (minPrice && maxPrice) {
            query.Price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) }; // Giá trong khoảng [minPrice, maxPrice]
        } else if (minPrice) {
            query.Price = { $gte: parseFloat(minPrice) }; // Nếu chỉ có minPrice
        } else if (maxPrice) {
            query.Price = { $lte: parseFloat(maxPrice) }; // Nếu chỉ có maxPrice
        }

        // Tìm kiếm theo loại tour (Type)
        if (name) {
            query.TourName = { $regex: name, $options: 'i' }; // Tìm theo chuỗi không phân biệt hoa thường
        }

        // Lấy danh sách tour từ database
        const tours = await Tour.find(query);

        // Trả kết quả
        res.status(200).json({
            success: true,
            count: tours.length,
            data: tours,
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            success: false,
            message: 'Not Found',
        });
    }
};


export const getFeatureTour = async (req,res) => {
   
    
    try {
        const tours = await Tour.find({featured:true}).limit(8);
        
       
        res.status(200).json({success:true,count:tours.length,message:'Successfully ' ,
            data:tours
        });

    } catch (err) {
        res .status(404).json({success:false,message:'Not Found'});
    }
};

export const getTourCount = async(req,res) => {
    try { const tourCount = await Tour.estimatedDocumentCount();
        res.status(200).json({success:true,data: tourCount});

    } catch (err) {
        res .status(509).json({success:false,message:'Fail to Fetch'});
    }
}