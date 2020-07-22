// return random 3 digit numnber
function generateId() {
    return Math.floor(Math.random()*(999-100+1)+100);
};

module.exports = generateId;