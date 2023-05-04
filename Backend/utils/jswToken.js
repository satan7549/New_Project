const sendToken = (res, stausCode, user) => {
  const token = user.getjwtToken();
  //options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // * 24 * 60 * 60
  //   sameSite: "none",
  //   secure: true,
  //   path: "/",

  res.status(stausCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
