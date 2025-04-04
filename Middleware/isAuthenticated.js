// Middleware to check if the user is authenticated
export const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/auth/login");  // Redirect to login if not authenticated
    }
    next();  // Proceed if authenticated
};
