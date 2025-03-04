const express = require('express');
const app = express();
const port = 3000;
const hbs = require("hbs")
const path = require("path");
const flash = require("express-flash");
const methodOverride = require('method-override')
const session = require('express-session');
const upload = require("./middlewares/upload-file");

app.set('view engine', 'hbs');
app.set("views" ,path.join(__dirname, './views'))
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use(methodOverride("_method"))
app.use(express.static('assets'))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(flash());
app.use(
  session({
    name :"my-session",
    secret:"asdasda",
    resave:false,
    saveUninitialized: true
  })
)


hbs.registerPartials(__dirname + "/views/partials", function (err) {})
hbs.registerHelper("equal", function (a, b){
    return a===b;
});


const{
    renderProvList,
    //renderProv,
    authregister,
    authlogin,
    addProv,
    deleteProv,
    renderUpdateProv,
    UpdateProv,
    logOut,
    addKab,
    renderProvDetail,
    renderUpdateKab,
    updateKab,
    deleteKab,
    renderIdProv,
    }= require("./controller/controller");
//----------------------render auth login dan register----------
app.get('/login', (req, res)=>{
  res.render('auth-login')
})
app.get('/register', (req, res)=>{
  res.render('auth-register')
})
app.post("/register", authregister)
app.post("/login", authlogin)
app.get("/logout", logOut)
//--------------------render halaman prov list----------
app.get('/index', renderProvList);
//render halaman prov list all
// app.get('/:id', renderProv);
// -------------------------------provinsi------------------
app.get('/addProv', (req, res) => {
  const user = req.session.user;
  console.log("usernya adalah : ", user);
  if(user){
    res.render('add-prov', {user:user})
  }else{
    res.redirect("/login")
  }
})
app.post('/addProv', upload.single("image"), addProv);
app.delete("/index/:id", deleteProv);
app.get("/updateProv/:id", renderUpdateProv);
app.post("/updateProv/:id", upload.single("image"), UpdateProv);

app.get("/provDetail/:id", renderProvDetail)
// -------------------------------kabupaten------------------
app.get('/addKab/:id', renderIdProv)

app.post('/addKab/', upload.single("image"), addKab);
app.get('/updateKab/:id', renderUpdateKab)
app.post('/updateKab/:id', upload.single("image"), updateKab)
app.delete("/provDetail/:id", deleteKab);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})