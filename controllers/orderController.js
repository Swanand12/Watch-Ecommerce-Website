import orderModel from "../models/orderModel.js";

export const getOrdersController = async (req, res) => {
  try {
    const { userid } = req.params;
    const orders = await orderModel
      .find({ buyers: userid })
      .populate("products", "-photo")
      .populate("buyers", "name");

    // res.json(orders);
    res.status(200).send({
      success: true,
      message: "Succesfully get orders",
      orders,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: " Error while getting orders",
      error,
    });
  }
};

// Admin Orders

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products")
      .populate("buyers", "name");

    res.status(200).send({
      success: true,
      message: "Succesfully get orders",
      orders: orders,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: " Error while getting orders",
      error,
    });
  }
};

export const updateStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Succesfully get orders",
      orders: orders,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: " Error while getting orders",
      error,
    });
  }
};
