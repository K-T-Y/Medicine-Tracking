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
  const Picture = req.body.Picture;

  const newMedicine = new MedicineModel({
   Name,
   Description,
   Category,
   Quantity,
   MFD,
   ExpDate,
   User,
   Picture
  });

  newMedicine
    .save()
    .then(() => {
      res.json({msg:"Medicine Added"});
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
router.route("/update/").post(async (req, res) => {
  
  const {id, Quantity } = req.body;
  const updateMedicine = {
   Quantity: Quantity
  };

  const update = await MedicineModel.findByIdAndUpdate(
    id,
    updateMedicine
    
  )
    .then(() => {
      res.status(200).send({ msg: "Medicine Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ msg: "Error with updating data" });
    });
});

//delete Medicine
//http://localhost:8050/Medicine/delete/:id
//Delete Request
router.route("/delete/:id").delete(async (req, res) => {
  let MedicineId = req.params.id;

  await MedicineModel.findByIdAndDelete(MedicineId)
    .then(() => {
      res.status(200).send({ msg: "Medicine deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//find one of the Medicine
router.route("/get/:keyword").get((req, res) => {
  let keyword = req.params.keyword;
  MedicineModel.findById({Name:keyword})
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
