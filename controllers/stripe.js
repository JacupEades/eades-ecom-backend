const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
// const express = require("express");
// const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
// app.use(express.static("public"));
// app.use(express.json());

exports.createPaymentIntent = async (req, res) => {
	// console.log(req.body);
	const { couponApplied } = req.body;

	// later apply coupon
	// later calc price

	// 1 find user
	const user = await User.findOne({ email: req.user.email }).exec();
	// 2 get cart total
	const { cartTotal, totalAfterDiscount } = await Cart.findOne({
		orderedBy: user._id,
	}).exec();
	// console.log("CART TOTAL", cartTotal, "AFTER DISCONT", totalAfterDiscount);

	let finalAmount = 0;

	if (couponApplied && totalAfterDiscount) {
		finalAmount = totalAfterDiscount * 100;
	} else {
		finalAmount = cartTotal * 100;
	}

	// creat payment intent with order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: finalAmount,
		currency: "usd",
	});

	res.send({
		clientSecret: paymentIntent.client_secret,
		cartTotal,
		totalAfterDiscount,
		payable: finalAmount,
	});
};
