const express = require('express');
const { getAllJobs, postJob, myjobs, updateJob, deleteJob } = require('../controllers/job.controller');
const isAuthorized = require('../middlewares/auth');
const router = express.Router();


router.get("/getall",getAllJobs)
router.post("/post",isAuthorized,postJob)
router.get("/getmyjobs",isAuthorized,myjobs)
router.put("/update/:id",isAuthorized,updateJob)
router.delete("/delete/:id",isAuthorized,deleteJob)



module.exports = router