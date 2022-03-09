const Product = require('../models/Product');
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require('./verifyToken');

const router = require('express').Router();

// CREATE

router.post('/', verifyToken, async (req, res) => {
	const newCart = new Cart(req.body);

	try {
		const savedCart = await newCart.save();
		res.status(200).json(savedCart);
	} catch (err) {
		res.status(500).json(err);
	}
});

// UPDATE

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
	try {
		const updatedCart = await Cart.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true },
		);
		res.status(200).json(updatedCart);
	} catch (err) {
		res.status(500).json(err);
	}
});

// DELETE

router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
	try {
		await Cart.findByIdAndDelete(req.params.id);
		res.status(200).json('Cart has been deleted...');
	} catch (err) {
		res.status(500).json(err);
	}
});

// //GET PRODUCT

// router.get('/find/:id', async (req, res) => {
// 	try {
// 		const product = await Product.findById(req.params.id);
// 		const { password, ...others } = user._doc;
// 		res.status(200).json(product);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// //GET ALL PRODUCTS

// router.get('/', async (req, res) => {
// 	const qNew = req.query.new;
// 	const qCategory = req.query.category;
// 	try {
// 		let products;

// 		if (qNew) {
// 			products = await Product.find().sort({ createdAt: -1 }).limit(5);
// 		} else if (qCategory) {
// 			products = await Product.find({
// 				categories: {
// 					$in: [qCategory],
// 				},
// 			});
// 		} else {
// 			products = await Product.find();
// 		}

// 		res.status(200).json(products);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

module.exports = router;
