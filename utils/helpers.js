function format_date(date) {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
};

const eq = function(arg1, arg2, options) {
    return (arg1 == arg2);
}

module.exports = { format_date, eq }