import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    UserID: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Name: {
        FirstName: {
            type: String,
            required: true
        },
        LastName: {
            type: String,
            required: true
        }
    },
    Username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Phone: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    DateOfBirth: {
        type: Date,
        required: true
    },
    RegistrationDate: {
        type: Date,
        required: true,
        default: Date.now // Mặc định là thời gian hiện tại khi tạo tài khoản
    },
    UserType: {
        type: String,
        enum: ['Traveler', 'TourOperator', 'IT team member'],
        required: true
    },
    // Embedding thêm chi tiết vào từng loại user
    OperatorDetails: {
        type: Object,
        required: function() {
            return this.UserType === 'TourOperator'; // Chỉ cần nếu UserType là 'TourOperator'
        },
        properties: {
            Certificate: {
                type: String,
                required: true
            },
            LicenseNumber: {
                type: String,
                required: true
            },
            Strength: {
                Specialization: {
                    type: String,
                    required: true
                },
                RegionExpertise: {
                    type: String,
                    required: true
                }
            },
            SocialMediaLinks: {
                type: [String],
                required: true
            },
            LanguageSupport: {
                type: [String],
                required: true
            },
            TourOperatorID: {
                type: String,
                required: true
            }
        }
    },
    ITMemberDetails: {
        type: Object,
        required: function() {
            return this.UserType === 'IT team member'; // Chỉ cần nếu UserType là 'IT team member'
        },
        properties: {
            Role: {
                type: String,
                required: true
            },
            AvailabilityHours: {
                Monday: {
                    type: String,
                    required: true
                },
                Tuesday: {
                    type: String,
                    required: true
                },
                Wednesday: {
                    type: String,
                    required: true
                },
                Thursday: {
                    type: String,
                    required: true
                },
                Friday: {
                    type: String,
                    required: true
                }
            },
            IT_team_members_ID: {
                type: String,
                required: true
            }
        }
    },
    TravelerDetails: {
        type: Object,
        required: function() {
            return this.UserType === 'Traveler'; // Chỉ cần nếu UserType là 'Traveler'
        },
        properties: {
            DietaryRestrictions: {
                type: [String],
                required: true
            },
            Nationality: {
                type: String,
                required: true
            },
            PassportID: {
                type: String,
                required: true
            },
            VisaInformation: {
                VisaType: {
                    type: String,
                    required: true
                },
                ExpirationDate: {
                    type: Date,
                    required: true
                }
            },
            LoyaltyPoints: {
                type: Number,
                required: true
            },
            TravelerID: {
                type: String,
                required: true
            }
        }
    }
}, 
{timestamps: true});

// Các virtuals để thừa kế TravelerID, TourOperatorID, IT_team_members_ID từ UserID
userSchema.virtual('TravelerID').get(function() {
    if (this.UserType === 'Traveler') {
        return this.UserID;
    }
    return null;
});

userSchema.virtual('TourOperatorID').get(function() {
    if (this.UserType === 'TourOperator') {
        return this.UserID;
    }
    return null;
});

userSchema.virtual('IT_team_members_ID').get(function() {
    if (this.UserType === 'IT team member') {
        return this.UserID;
    }
    return null;
});

export default mongoose.model("User", userSchema);
