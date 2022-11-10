const checkAuth = (req, res, next) => {
    console.log('logged in status:', req.session.logged_in);
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = checkAuth;