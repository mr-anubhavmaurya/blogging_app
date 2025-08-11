const {Router} = require("express")
const router = Router();

router.get("/add-new", (req,res)=>{
    return res.render("addBlog",{
        user: req.user,
    })
})

router.post("/", (req,res)=>{
    const body = req.body;
    console.log(body);
    return res.redirect("/");
})

module.exports = router;