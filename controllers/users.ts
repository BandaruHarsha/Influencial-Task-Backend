import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/users";
import jwt from "jsonwebtoken";

export const authCreateUser = async (req: Request, res: Response) => {

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({
        message: "User already registered with given email",
        content: null,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      creatorName: req.body.creatorName,
      email: req.body?.email,
      password: hashedPassword,
      phone: req.body.phone,
    });
    console.log(newUser);
    await newUser.save();
    return res.status(201).send({
      message: "Created user successfully",
      content: newUser,
    });
  } catch (error) {
    res.send({
      message: "Network error...Couldn't create user",
      content: null,
      status: 500,
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found with the email", content: null });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .send({ message: "Wrong credentials", content: null });
    }
    return res.status(200).send({
      success: true,
      message: "login success",
      content: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        creatorName: user.creatorName,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Network error...Couldn't get user",
      content: null,
    });
  }
};
