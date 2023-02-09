const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");
// controllers
const {
	userCart,
	getUserCart,
	emptyUserCart,
	saveAddress,
	applyCouponToUserCart,
	createOrder,
	orders,
	addToWishlist,
	wishlist,
	removeFromWishlist,
	createCashOrder,
} = require("../controllers/user");

// save cart
router.post("/user/cart", authCheck, userCart);
// get cart
router.get("/user/cart", authCheck, getUserCart);
// remove cart
router.delete("/user/cart", authCheck, emptyUserCart);
// save user address
router.post("/user/address", authCheck, saveAddress);

// create order after payment
// Stripe
router.post("/user/order", authCheck, createOrder);
// Cash on delivery
router.post("/user/cash-order", authCheck, createCashOrder);
router.get("/user/orders", authCheck, orders);

// coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

// wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

// router.get("/user", (req, res) => {
// 	res.json({
// 		data: "hey you hit user API endpoint",
// 	});
// });

module.exports = router;
