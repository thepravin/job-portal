const catchAsyncError = require("../middlewares/catchAsyncError");
const { ErrorHandler } = require("../middlewares/error");
const Application = require("../models/application.model");
const cloudinary = require("cloudinary");
const Job = require("../models/job.model");

const employerGetAllApplications = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker is not allowed to access !!", 400)
    );
  }

  const { _id } = req.user;
  const applications = await Application.find({ "employerID.user": _id });
  res.status(200).json({
    success: true,
    applications,
  });
});

const jobSeekerGetAllApplications = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(new ErrorHandler("Employer is not allowed to access !!", 400));
  }

  const { _id } = req.user;
  const applications = await Application.find({ "applicantID.user": _id });
  res.status(200).json({
    success: true,
    applications,
  });
});

const jobSeekerDeleteApplication = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(new ErrorHandler("Employer is not allowed to access !!", 400));
  }

  const { id } = req.params;
  const application = await Application.findById(id);
  if (!application) {
    return next(new ErrorHandler("Oops, application not found !!", 404));
  }

  await application.deleteOne();

  res.status(200).json({
    success: true,
    message: "Application Deleted Successfully",
  });
});

const postApplication = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer not allowed to access this resource.", 400)
    );
  }

  const { resume } = req.files;

  if (!resume || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Required !", 400));
  }

  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(resume.mimetype)) {
    return next(new ErrorHandler("Invalid file type."));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.log(
      "Cloudinary Error : ",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Falied to upload Resume to cloudinary", 500));
  }

  const { name, email, jobTitle, phone, address, jobId } = req.body;
  const applicantID = {
    user: req.user._id,
    role: "Job Seeker",
  };
  if (!jobId) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  const employerID = {
    user: jobDetails.postedBy,
    role: "Employer",
  };
  if (
    !name ||
    !email ||
    !jobTitle ||
    !phone ||
    !address ||
    !applicantID ||
    !employerID ||
    !resume
  ) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }
  const application = await Application.create({
    name,
    email,
    jobTitle,
    phone,
    address,
    applicantID,
    employerID,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
});

const acceptApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;

    // Find the application by ID
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Update the status
    application.employerID.status = "Accepted";
    await application.save();
    console.log(application.employerID.status)
    res
      .status(200)
      .json({ message: "Status updated successfully", application });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const rejectedApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;

    // Find the application by ID
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Update the status
    application.employerID.status = "Rejected";
    await application.save();

    res
      .status(200)
      .json({ message: "Status updated successfully", application });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  employerGetAllApplications,
  jobSeekerDeleteApplication,
  jobSeekerGetAllApplications,
  postApplication,
  acceptApplication,
  rejectedApplication
};
