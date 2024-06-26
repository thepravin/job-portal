const catchAsyncError = require("../middlewares/catchAsyncError");
const { ErrorHandler } = require("../middlewares/error");
const Job = require("../models/job.model");

const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

const postJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker is not allowed to Post Job !!", 400)
    );
  }
  const {
    title,
    skills,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide full job details.", 400));
  }

  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler(
        "Please either provide fixed salary or ranged salary.",
        400
      )
    );
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    return next(
      new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400)
    );
  }
  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    skills,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
  });
  res.status(200).json({
    success: true,
    message: "Job Posted Successfully!",
    job,
  });
});


const myjobs = catchAsyncError(async(req,res,next)=>{
    const{role}=req.user;
    if (role === "Job Seeker") {
        return next(
          new ErrorHandler("Job Seeker is not allowed to Post Job !!", 400)
        );
      }

      const myJobs = await Job.find({postedBy:req.user._id});
      
      res.status(200).json({
        success:true,
        myJobs,
      })

})

const updateJob = catchAsyncError(async(req,res,next)=>{
    const{role}=req.user;
    if (role === "Job Seeker") {
        return next(
          new ErrorHandler("Job Seeker is not allowed to Post Job !!", 400)
        );
      }

    const {id}=req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(
            new ErrorHandler("Oops, Job not found!!",404)
        )
    }

    job=await Job.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        job,
        message:"Job Updated Successfully"
    })
})


const deleteJob = catchAsyncError(async(req,res,next)=>{
    const{role}=req.user;
    if (role === "Job Seeker") {
        return next(
          new ErrorHandler("Job Seeker is not allowed to Post Job !!", 400)
        );
      }

      const {id}=req.params;
      let job = await Job.findById(id);
      if(!job){
        return next(new ErrorHandler("Oops, Job not found !",404))
      }

      await job.deleteOne();
      res.status(200).json({
        success:true,
        message:"Job Deleted Successfully !!"
      })
})

const getSingleJob = catchAsyncError(async(req,res,next)=>{
  const {id} = req.params;
 
  try {
    const job = await Job.findById(id);
  if(!job){
    return next(new ErrorHandler("Job not Found",404));
  }
  res.status(200).json({
    success:true,
    job,
  })
  } catch (error) {
    return next(new ErrorHandler("Invalid Id ",400))
  }
})

module.exports = { getAllJobs, postJob,myjobs ,updateJob,deleteJob,getSingleJob};
