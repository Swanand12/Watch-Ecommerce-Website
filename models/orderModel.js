import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    payments: {},
    buyers: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Processing",
      enum: [
        "Not Processing",
        "Processing",
        "Shipped",
        "En Route",
        "Delivered",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("orders", orderSchema);
