const paymentData = [
    {
        _id: "674d8d2043b10ab83597800a",
        PaymentMethod: "Credit Card",
        PaymentStatus: "Success",
        PaymentAmount: 1250,
        PaymentDate: new Date("2024-12-01T14:30:00Z"),
        BookingID: "674d8cd643b10ab835977fbc",  // Change this to match the booking._id
        RefundID: "6752f5ebb250840525e44cb8",
        createdAt: new Date("2024-12-01T14:30:00Z"),
        updatedAt: new Date("2024-12-01T14:30:00Z"),
    },
    {
        _id: "674d8cd643b10ab835977fbc",
        PaymentMethod: "Credit Card",
        PaymentStatus: "Success",
        PaymentAmount: 1250,
        PaymentDate: new Date("2024-12-01T14:30:00Z"),
        BookingID: "674d8cd643b10ab835977feb",
        RefundID: "6752f5ebb250840525e44cb8",
        createdAt: new Date("2024-12-01T14:30:00Z"),
        updatedAt: new Date("2024-12-01T14:30:00Z"),
    }
];

export default paymentData;
