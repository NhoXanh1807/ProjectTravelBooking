import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
    TourName: {
        type: String,
        required: true,
        trim: true
    },
    TourStatus: {
        type: String,
        enum: {
            values: ['Available', 'Unavailable', 'Completed'],
            message: '{VALUE} is not a valid tour status.'
        },
        default: 'Available'
    },
    AvailableSeats: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: function(value) {
                return value <= this.Capacity;
            },
            message: props => `AvailableSeats (${props.value}) cannot be greater than Capacity (${props.instance.Capacity}).`
        }
    },
    Description: {
        type: String,
        trim: true
    },
    Price: {
        type: Number,
        required: true,
        min: 0
    },
    Duration: {
        type: String,
        required: true
    },
    Capacity: {
        type: Number,
        required: true,
        min: 1
    },
    Locations: {
        type: [String],
        required: true,
        validate: {
            validator: function(value) {
                return value.length > 0;
            },
            message: 'Locations array must have at least one location.'
        }
    },
    CancellationPolicy: {
        type: String,
        trim: true
    },
    Type: {
        type: String,
        required: true,
        trim: true
    },
    LanguageOffers: {
        type: [String],
        required: true,
        validate: {
            validator: function(value) {
                return value.length > 0;
            },
            message: 'LanguageOffers array must have at least one language.'
        }
    },
    StartDate: {
        type: Date,
        required: true
    },
    EndDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value > this.StartDate;
            },
            message: 'EndDate must be after StartDate.'
        }
    },
    TourOperatorObjectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    BookingObjectID: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
        }
    ],
    TravelerObjectID: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, 
{ timestamps: true });

export default mongoose.model("Tour", tourSchema);
