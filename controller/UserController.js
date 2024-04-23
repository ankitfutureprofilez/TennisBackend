const catchAsync = require("../utils/catchAsync");

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    // console.log("email",email)
    if (!email || !password) {
      return next(new AppError("Email and password is required !!", 401));
    }
    // Logic for checking data with details in env will be placed here
    if(email!=process.env.email){
        return next(new AppError("Invalid email", 401));
    }
    if(password!=process.env.password){
        return next(new AppError("Wrong password", 401));
    }  
    res.json({
      status: true,
      message: "Login Successfully !!",
      user: user,
      token,
    });
  });