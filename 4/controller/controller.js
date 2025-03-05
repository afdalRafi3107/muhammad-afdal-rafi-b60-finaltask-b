const {Sequelize, QueryTypes, DATE, where} = require('sequelize')
const config = require("../config/config.json");

const {User, Provinsi_tb, Kabupaten_tb} = require("../models");

const sequelize = new Sequelize(config.development);

const bcrypt = require("bcrypt");
const { log } = require('handlebars');

const saltRounds = 10;


//-------------------login dan register------------------
async function authregister(req, res) {
    const {username, email, password, confirmPassword} = req.body;
    console.log("yng barusan daftar : ", req.body);

    if (password != confirmPassword){
       return res.render("auth-register", {error: "password tidak sama"})

    }
    console.log(req.body);
    //cek email apakah sudah terpakai

    const user = await User.findOne({
        where : {
            email: email,
        }
    });
    if(user){
        req.flash("error", "email sudah terpakai")
        return res.redirect("/register")
    }


    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create(
        {
        username,
        email,
        password:hashedPassword,
    }
)
console.log("User Baru : ", newUser);

req.flash("success", "Berhasil mendaftar , seilahkan login");
res.redirect("/login");
}
// login
async function authlogin(req, res) {
    const {email, password} = req.body;

    console.log(`yang mau login :  ${email} ${password} `)


    //cek kalau usernya ada
    const user = await User.findOne({
        where : {
            email: email,
        }
    })
    if(!user){
        req.flash("error", "User tidak ditemukan")
        return res.redirect("/login")
    }

    console.log("usernya ada ", user);
    
    //cek kalau ps nya slah
    const isValidated = await bcrypt.compare(password ,user.password); //meriturn sebuah bolean

    if(!isValidated) {
        req.flash("error", "Password tidak sesuai")
        return res.redirect("/login")
    }

    //sembunyi kan password
    let loggedInUser = user.toJSON();//conver objek ke strin
    delete loggedInUser.password;

    console.log("user paswordnya setelah di delete ", loggedInUser);
    req.session.user = loggedInUser;

    req.flash("success", "Berhasil login")
    res.redirect("/index")
}

async function logOut(req, res) {
    //hapus user dari sssion
    req.session.user=null;
    res.redirect("/login")
}
//-------------halaman home render Provinsi--------------
async function renderProvList(req, res) {
    const user= req.session.user;
    console.log("usernya adalah : ", user);
    
    const provinsi = await Provinsi_tb.findAll({
        order: [["createdAt", "DESC"]],
    });

    console.log(provinsi);
    res.render("index", {provinsi: provinsi, user:user})
}
// async function renderProv(req, res){
//     const id = req.params.id;
//     const provinsiList = await Provinsi_tb.findOne({
//         where : {
//             id: id,
//         }
//     });
//     console.log("yan di pilih :", provinsiList);
        
//     res.redirect('index', {provList:provinsiList});
// }

// add prov
async function addProv(req,res) {
    const user = req.session.user;
    const iduser = user.id;

    console.log("usernya adalah : ", user);
    const {nama, diresmikan, pulau} = req.body;
    //const photo = 'https://picsum.photos/200';
    
    const image = req.file.path;
    const newProv= {
        nama,
        diresmikan,
        photo:image,
        pulau,
        user_id:iduser,
    }
    const provAdd = await Provinsi_tb.create(newProv);
    console.log("provinsi Baru : ", provAdd);

    res.redirect("/index", )
    
}
async function renderUpdateProv(req,res) {
    const user = req.session.user;

    console.log("usernya adalah : ", user);
    const id = req.params.id;

    const renderUpdateProv = await Provinsi_tb.findOne({
       where:{
           id:id
       }
    })
    res.render("update-prov",{prov: renderUpdateProv, user:user})      
}
async function UpdateProv(req, res) {
    const id = req.params.id;
    const {nama, diresmikan, pulau, check} = req.body;
    const photo = 'https://picsum.photos/200';
    
    if(check=="1"){

        const image = req.file.path;
        const updateResult = await Provinsi_tb.update(
            {
            nama,
            diresmikan,
            pulau,
            photo:image,
            updatedAt: sequelize.fn("NOW"),
          },
          {
            where :{
                id,
            }
          }
        );
        console.log("provinsi Update : ", updateResult);
    }else{
        const updateResult = await Provinsi_tb.update(
            {
            nama,
            diresmikan,
            pulau,
            updatedAt: sequelize.fn("NOW"),
          },
          {
            where :{
                id,
            }
          }
        );
        console.log("provinsi Update : ", updateResult);

    }

    res.redirect("/index")
}
async function deleteProv(req, res) {
    const id = req.params.id;
    console.log("id yang mau di hapus : ",id);
    const deleteprov = await Provinsi_tb.destroy({
        where : {
            id: id
        }
}); 
const deleteKab = await Kabupaten_tb.destroy({
    where : {
        provinsi_id:id
    }
});
    console.log("prov yang di hapus : ", deleteprov);
    
    res.redirect("/index");
}

//prov detail with kab

async function renderProvDetail(req, res) {
    const user = req.session.user;
    const id = req.params.id;
    const prov = await Provinsi_tb.findOne({
        where : {
            id,
        },
        order: [["createdAt", "DESC"]],
    });
    const kab = await Kabupaten_tb.findAll({
        where : {
            provinsi_id:id
        },
        order: [["createdAt", "DESC"]],
    });
    const getprovid = await Kabupaten_tb.findOne({
        where : {
            provinsi_id:id
        },
        order: [["createdAt", "DESC"]],
    });

    console.log(kab);
    res.render("prov-detail", {kab:kab, getprovid:getprovid, prov:prov, user:user})
    
}

// --------------------kabupaten-------------------------
async function renderIdProv(req, res) {
    const user = req.session.user;
    const id = req.params.id;

    const renderIdProv = await Provinsi_tb.findOne({
        where:{
            id:id,
        }
     })
    console.log("renderAddKap : " , renderIdProv);
    
    res.render('add-kabupaten',{prov: renderIdProv, user:user})
}

async function addKab(req, res) {
    
    const {nama, diresmikan, provinsi_id} = req.body;
    // const photo = 'https://picsum.photos/200';
    console.log("prov id : " , provinsi_id);
    
    const image = req.file.path;

    const newKab= {
        nama,
        diresmikan,
        photo:image,
        provinsi_id,
    }
    
    const kabAdd = await Kabupaten_tb.create(newKab);
    console.log("Kabupaten Baru : ", kabAdd);
    res.redirect("/index")
    
}

async function renderUpdateKab(req, res) {
    const user = req.session.user;
    console.log("usernya adalah : ", user);
    const id = req.params.id;

    const renderUpdateKab = await Kabupaten_tb.findOne({
       where:{
           id:id
       }
    })
    console.log("kabupaten yang mau di edit : ", renderUpdateKab);
    
    res.render("update-kabupaten",{kabupaten: renderUpdateKab, user:user})  
}

async function updateKab(req,res) {
    const id = req.params.id;
    const {nama, diresmikan, check} = req.body;
    //const photo = 'https://picsum.photos/200';
    
    if(check == "1"){
        const image = req.file.path;
        const updateResult = await Kabupaten_tb.update(
            {
            nama,
            diresmikan,
            photo:image,
            updatedAt: sequelize.fn("NOW"),
          },
          {
            where :{
                id,
            }
          }
        );
        console.log("kabupaten Baru : ", updateResult);
    }else{
        const updateResult = await Kabupaten_tb.update(
            {
            nama,
            diresmikan,
            updatedAt: sequelize.fn("NOW"),
          },
          {
            where :{
                id,
            }
          }
        );
        
        console.log("kabupaten Baru : ", updateResult);
    }

    res.redirect("/index")
}
async function deleteKab(req, res) {
    const id = req.params.id;
    console.log("id yang mau di hapus : ",id);
    const deleteKab = await Kabupaten_tb.destroy({
        where : {
            id: id
        }
}); 
    console.log("prov yang di hapus : ", deleteKab);
    
    res.redirect("/index");
}


module.exports={
     renderProvList,
    //  renderProv,
     authregister,
     authlogin,
     addProv,
     renderUpdateProv,
     UpdateProv,
     deleteProv,
     logOut,
     addKab,
     renderProvDetail,
     renderUpdateKab,
     updateKab,
     deleteKab,
     renderIdProv,
}