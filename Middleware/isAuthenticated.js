export const isAuthenticated = (req, res, next) => {
    console.log("Session check:", req.session);
    if (req.session && req.session.user) {
      console.log("✅ User is authenticated:", req.session.user.username);
      return next();
    } else {
      console.log("❌ Not authenticated — redirecting to login");
      res.redirect("/auth/login");
    }
  };
  