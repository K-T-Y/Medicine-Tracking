const router = require("express").Router();
const { request } = require("express");
let UserModel = require("../models/userModel");



router.route("/add").post((req, res) => {
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const Email = req.body.Email;
  const Phone = req.body.Phone;
  const District = req.body.District;
  const Address = req.body.Address;
  const Password = req.body.Password;
  const Category=req.body.Category;

  const newUser = new UserModel({
     FirstName ,
     LastName ,
     Email ,
     Phone ,
     District, 
     Address ,
     Password,
     Category
  });

  newUser
    .save()
    .then(() => {
      res.json("User Added");
    })
    .catch((err) => {
      console.log(err);
    });
});


//Get Request
router.route("/").post((req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;
  UserModel.find({Email:Email,Password:Password})
    .then((User) => {
      if(User.length>0)
      {
        res.json(User);
        
      }
      else
      {
        res.json({message:"Incorrect Email or Password"});
      }
      
    })
    .catch((err) => {
      console.log(err);
    });
});

//update
//http://localhost:8090/Answer/update/:id
//Put Request
// router.route("/update/:id").put(async (req, res) => {
//   let userId = req.params.id;
//   const { Content, Question, User, createdAt } = req.body;
//   const updateUser = {
//     Content,
//     Question,
//     User,
//     createdAt,
//   };

//   const update = await AnswerModel.findByIdAndUpdate(userId, updateUser)
//     .then(() => {
//       res.status(200).send({ status: "Answer Updated" });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send({ status: "Error with updating data" });
//     });
// });

//delete Answer
//http://localhost:8050/Answer/delete/:id
//Delete Request
// router.route("/delete/:id").delete(async (req, res) => {
//   let userId = req.params.id;

//   await AnswerModel.findByIdAndDelete(userId)
//     .then(() => {
//       res.status(200).send({ status: "Answer deleted" });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//find one of the Answer
// router.route("/get/:id").get((req, res) => {
//   let id = req.params.id;
//   AnswerModel.findById(id)
//     .then((answer) => {
//       res.json(answer);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//Updateone
// router.route("/updateOne/:id").put(async (req, res) => {
//     let Answer = await AnswerModel.findById(req.params.id);
//     const data = {
//         Name: req.body.Name || Answer.Name,
//         Address: req.body.Address || Answer.Address,
//         PhoneNumber: req.body.PhoneNumber || Answer.PhoneNumber,
//         NICNumber: req.body.NICNumber || Answer.NICNumber,
//         Jobtitle: req.body.Jobtitle || Answer.Jobtitle,
//         Salary: req.body.Salary || Answer.Salary,

//     };
//     Answer = await AnswerModel.findByIdAndUpdate(req.params.id, data, { new: true });
//     res.json(Answer);
// });

module.exports = router;
