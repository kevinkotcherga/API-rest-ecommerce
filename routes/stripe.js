const router = require('express').Router();
const stripe = require('stripe')(
	'sk_test_51KbMuMGV1UkxUwjyTjzMSHgDW291WpBmgLCq8lpefbAWP4Ne6Xd0yuUdrRmJnEuNBhU3vofwpMcKxkv05bUeRQwA00wFOv8rB7',
);

router.post('/payment', (req,res)=>{
  stripe.charges.create({
    source: req.body.tokenId,
    amount: req.body.amount,
    currency: 'usd',
  },
  (stripeErr, stripeRes)=>{
    if(stripeErr){
      res.status(500).json(stripeErr)
    }else{
      res.status(200).json(stripeRes);
    }
  });
});

module.exports = router;
