const checkAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
}

// Pretty basic right now, but might eventually expand to allow content editors other than the creator to make changes
function checkPermissions(user, contentCreator) {
    if (user == contentCreator) return true;
    else throw new Error({ message: 'Unauthorized'});
}

module.exports = { checkAuth, checkPermissions };