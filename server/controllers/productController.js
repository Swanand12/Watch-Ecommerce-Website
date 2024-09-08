import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, category, shipping } =
      req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case photo && photo > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is required and it should be less than 1mb" });
    }

    const product = await new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: "Successfully created product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating product",
      error,
    });
  }
};

export const getProductsController = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .select("-photo")
      .limit(12)
      .populate("category")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Successfully get limited products",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting limited products",
      error,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Successfully get single products",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single products",
      error,
    });
  }
};

export const getPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, quantity, category } = req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case photo && photo > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is required and it should be less than 1mb" });
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: "Successfully updated product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating product",
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Successfully deleted product",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

export const productFilterController = async (req, res) => {
  try {
    const { checked, radio, page } = req.body;
    const perPage = 3;
    let args = {};
    if (checked.length > 0) args.category = await checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await productModel
      .find(args)
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(3)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Successfully filtered products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while filtering product",
      error,
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const { checked, radio } = req.body;

    // Define the query object
    let args = {};
    if (checked.length > 0) args.category = { $in: checked };
    if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] };

    const total = await productModel.countDocuments(args);
    res.status(200).send({
      success: true,
      message: "Successfully get count of products",
      total: total,
      checked,
      radio,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while counting product",
      error,
    });
  }
};

export const productListController = async (req, res) => {
  try {
    const { checked, radio, page } = req.body;
    const perPage = 3;

    let args = {};
    if (checked.length > 0) args.category = { $in: checked };
    if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await productModel
      .find(args)
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(3)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Successfully filtered products",
      products,
      page,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while filtering product",
      error,
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;

    const products = await productModel.find({
      $or: [
        {
          name: { $regex: keyword, $options: "i" },
        },
        {
          description: { $regex: keyword, $options: "i" },
        },
      ],
    });

    res.status(200).send({
      success: true,
      message: "Successfully filtered products",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while filtering product",
      error,
    });
  }
};

// Payment
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const generatePaymentTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        res.send({ err });
      } else {
        res.status(200).send({ response });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in generating payment token",
    });
  }
};

export const braintreePaymentController = async (req, res) => {
  try {
    const { id, cart, nonce } = req.body;

    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    // let productsid = {}
    // cart.map((i)=> productsid.push(i._id))

    gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (err, result) {
        if (err) {
          console.error(err);
          return;
        }

        if (result.success) {
          const order = new orderModel({
            products: cart,
            payments: result,
            buyers: id,
          }).save();
          res.status(200).send({ success: true });
        } else {
          console.error(result.message);
        }
      }
    );
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in generating payment token",
    });
  }
};
