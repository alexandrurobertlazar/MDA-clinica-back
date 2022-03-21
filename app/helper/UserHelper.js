
function userHelper(user) {
    return {
        "id": user._id,
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "role": user.role
    }
}

module.exports = { userHelper };