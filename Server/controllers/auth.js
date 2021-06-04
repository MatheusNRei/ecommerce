
  const User = require  ('../models/user')
exports.createOrUpdateUser = async (req,res) => {
const {name,picture,email} = req.user;
const user = await User.findOneAndUpdate({email}, {name: email.split('@') [0],picture} ,{new: true})

if (user) {
   res.json (user)
   console.log ("usuario atualizado", user)
}else {
  const newUser = await new User({email,name: user.email.split('@') [0],picture}).save();
res.json(newUser);
console.log ("usuario criado", newUser)
}
};

exports.currentUser = async (req,res) => {
  User.findOne({email: req.user.email}).exec((err, user)=> {
    if (err) throw new Error(err);
    res.json(user);
  })
}