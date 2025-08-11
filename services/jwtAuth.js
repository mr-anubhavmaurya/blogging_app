const jwt = require("jsonwebtoken");
const {randomBytes} = require("crypto")
const secret = randomBytes(16).toString();
// console.log("secret:", secret);



function verifyToken(token){
    const payload = jwt.verify(token,secret);
    return payload;
    
}
function generateToken(user){
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
        profileImageURL: user.profileImageURL
    }
    
    const token = jwt.sign(payload,secret);
    // console.log("token",token)
    return token;
}

module.exports = {generateToken, verifyToken}