import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // validations
    if (!name) {
      return res.status(500).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(500).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(500).send({ message: "Password is required" });
    }
    if (!phone) {
      return res.status(500).send({ message: "Phone is required" });
    }
    if (!address) {
      return res.status(500).send({ message: "Address is required" });
    }

    // check user
    const existingUser = await userModel.findOne({ email });
    // error for existingUser
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exist please login",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);
    // save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    return res.status(201).send({
      success: true,
      message: "user register successfully",
      user,
    });

    // const user =
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Registeration Process",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // check user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not register",
      });
    }
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // token
    const token = await JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    return res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error in Login Process");
  }
};

const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "sawantswanand2004@gmail.com",
    // pass: "tjzx ecfs xmff nzf",
    pass: "dwjh vnxx sckj etjx",
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// request OTP
export const requestOtpController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(500).send({
      message: "Email is required",
    });
  }
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(500).send({
      success: false,
      message: "Invalid email",
    });
  }

  const otp = generateOTP();
  user.otp = otp;
  user.otpExpiry = Date.now() + 3600000;
  await user.save();

  const mailoptions = {
    from: {
      name: "Swanand Nodemailer",
      address: "sawantswanand2004@gmail.com",
    },
    to: email,
    subject: "Password Reset OTP",
    text: `Your otp is ${otp}`,
  };

  transport.sendMail(mailoptions, (err, info) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: "Failed to send OTP",
        err,
      });
    }
    return res.status(200).send({
      success: true,
      message: "OTP send successfully",
      otp: otp,
      email: email,
    });
  });
};

export const verifyOtpController = async (req, res) => {
  const { email, otp } = req.body;

  // Validations
  if (!otp) {
    return res.status(500).send({
      success: false,
      message: "OTP is required",
    });
  }

  if (!email) {
    return res.status(500).send({
      success: false,
      message: "Email is required",
      S,
    });
  }

  const user = await userModel.findOne({ email });

  if (user.otp === otp || user.otpExpiry > Date.now()) {
    return res.status(200).send({
      success: true,
      message: "Verified User",
    });
  } else {
    return res.status(500).send({
      success: false,
      message: "Invalid User or OTP expires",
    });
  }
};

export const resetPasswordController = async (req, res) => {
  const { newPassword, confirmPassword, email } = req.body;

  // validations
  if (!newPassword) {
    return res.status(500).send({
      success: false,
      message: "newPassword is required",
    });
  }
  if (!confirmPassword) {
    return res.status(500).send({
      success: false,
      message: "confirmPassword is required",
    });
  }
  if (newPassword != confirmPassword) {
    return res.status(500).send({
      success: false,
      message: "Pasword do not match",
    });
  }

  const user = await userModel.findOne({ email });

  const hashedPassword = await hashPassword(newPassword);
  user.password = hashedPassword;
  await user.save();

  res.status(200).send({
    success: true,
    message: "Password reset successfully",
  });
};

export const testController = (req, res) => {
  try {
    res.send("Protected Route");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const updateUserProfileController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (password && password.length < 6) {
      return res.status(500).send({
        success: false,
        message: "password must be of 6 characters",
      });
    }

    let hashedPassword;
    if (password) {
      hashedPassword = await hashPassword(password);
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: " Successfully updated profile",
      updatedUser,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updating user profile",
      error,
    });
  }
};
