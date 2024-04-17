const express = require("express");
const {
  jobSeekerGetAllApplications,
  employerGetAllApplications,
  jobSeekerDeleteApplication,
  postApplication,
  updateApplicationStatus,
  acceptApplication,
  rejectedApplication,
} = require("../controllers/application.controller");
const isAuthorized = require("../middlewares/auth");

const router = express.Router();

router.get("/jobseeker/getall", isAuthorized, jobSeekerGetAllApplications);
router.get("/employer/getall", isAuthorized, employerGetAllApplications);
router.delete("/delete/:id", isAuthorized, jobSeekerDeleteApplication);
router.post("/post", isAuthorized, postApplication);
router.put("/status/approve/:id",isAuthorized,acceptApplication)
router.put("/status/rejected/:id",isAuthorized,rejectedApplication)


module.exports = router;
