const router = require("express").Router();
const { request } = require("express");
let MedicineModel = require("../models/medicineModel");

//add data to Medicine table
//./Medicine/add
//Post request
//http://localhost:8050/Medicine/add

router.route("/add").post((req, res) => {
  const Name = req.body.Name;
  const Description = req.body.Description;
  const Category = req.body.Category;
  const Quantity = req.body.Quantity;
  const MFD = req.body.MFD;
  const ExpDate = req.body.ExpDate;
  const User = req.body.User;

  const newMedicine = new MedicineModel({
   Name,
   Description,
   Category,
   Quantity,
   MFD,
   ExpDate,
   User
  });

  newMedicine
    .save()
    .then(() => {
      res.json("Medicine Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//search Medicine
//http://localhost:8050/Medicine/
//Get Request
router.route("/").get((req, res) => {
  MedicineModel.find()
    .then((Medicine) => {
      res.json(Medicine);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update
//http://localhost:8090/Medicine/update/:id
//Put Request
router.route("/update/:id").put(async (req, res) => {
  let MedicineId = req.params.id;
  const { Content, User, createdAt } = req.body;
  const updateMedicine = {
    Content,
    User,
    createdAt,
  };

  const update = await MedicineModel.findByIdAndUpdate(
    MedicineId,
    updateMedicine
  )
    .then(() => {
      res.status(200).send({ status: "Medicine Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with updating data" });
    });
});

//delete Medicine
//http://localhost:8050/Medicine/delete/:id
//Delete Request
router.route("/delete/:id").delete(async (req, res) => {
  let MedicineId = req.params.id;

  await MedicineModel.findByIdAndDelete(MedicineId)
    .then(() => {
      res.status(200).send({ status: "Medicine deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//find one of the Medicine
router.route("/get/:id").get((req, res) => {
  let id = req.params.id;
  MedicineModel.findById(id)
    .then((Medicine) => {
      res.json(Medicine);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Updateone
// router.route("/updateOne/:id").put(async (req, res) => {
//     let Medicine = await MedicineModel.findById(req.params.id);
//     const data = {
//         Name: req.body.Name || Medicine.Name,
//         Address: req.body.Address || Medicine.Address,
//         PhoneNumber: req.body.PhoneNumber || Medicine.PhoneNumber,
//         NICNumber: req.body.NICNumber || Medicine.NICNumber,
//         Jobtitle: req.body.Jobtitle || Medicine.Jobtitle,
//         Salary: req.body.Salary || Medicine.Salary,

//     };
//     Medicine = await MedicineModel.findByIdAndUpdate(req.params.id, data, { new: true });
//     res.json(Medicine);
// });

module.exports = router;
