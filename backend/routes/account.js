const express=require("express");
const router=express.Router();
const {authMiddleware} = require("./middleware");
const {User,Account}=require("../db");
const { default: mongoose } = require("mongoose");

// To get current balance of a user
router.get("/balance",authMiddleware, async (req,res)=>{
    console.log(req.userId);
    const account=await Account.findOne({
        userId: req.userId
    })

    if(!account){
        return res.status(404).send({
            "error":"Account not found"
        })
    }

    console.log(account);

    return res.status(200).send({
        "balance": account.balance
    })
})

// Transfer money from one user to another
router.post("/transfer", authMiddleware, async (req,res) => {
  

    const session= await mongoose.startSession();
    session.startTransaction()
    let {amount , to} = req.body;
    const account = await Account.findOne({
        userId: req.userId
    }).session(session);

    // Check if sender exists
    if(!account){
        await session.abortTransaction();
        session.endSession();
        return res.status(404).send({
            "msg": "Account not found"
        })
    }

    // Check if the sender has sufficient balance
    if(account.balance<amount){
        await session.abortTransaction();
        session.endSession();
        return res.status(404).send({
            "msg": "insufficient balance"
        })
    }

    // check if receiver exists
    const toAccount=await Account.findOne({
        userId: to
    }).session(session);

    if(!toAccount){
        await session.abortTransaction();
        session.endSession();
        return res.status(404).send({
            "msg": "invalid user"
        })
    }

    // perform transaction
    await Account.updateOne({
        userId: req.userId
    },{ $inc:{
        balance: -amount
    }}).session(session);

    await Account.updateOne({
        userId: to
    },{$inc:{
        balance: amount
    }}).session(session);

    await session.commitTransaction();
    session.endSession();
    return res.status(200).send({
        "msg": "Transaction Successfull"
    })
})
module.exports=router;