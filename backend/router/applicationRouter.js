const express = require("express");
const {
  jobSeekerGetAllApplications,
  employerGetAllApplications,
  jobSeekerDeleteApplication,
  postApplication,
} = require("../controllers/application.controller");
const isAuthorized = require("../middlewares/auth");
const router = express.Router();

router.get("/jobseeker/getall", isAuthorized, jobSeekerGetAllApplications);
router.get("/employer/getall", isAuthorized, employerGetAllApplications);
router.delete("/delete/:id", isAuthorized, jobSeekerDeleteApplication);
router.post("/post", isAuthorized, postApplication);

module.exports = router;
