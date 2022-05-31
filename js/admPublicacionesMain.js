import prodb, {
  bulkcreate,
  createEle,
  getData,
  SortObj,
  getDataUser,
  SortObjUser
} from "./admPublicacionesModule.js";


let db = prodb("Productdb", {
  articulos: `++id, tipo, nombre, usuario, descripcion, cantidad, precio, ubicacion, img, estado`, 
  usuario: `++id, email, nombre, telefono, password`
});



// input tags
const itemid = document.getElementById("itemid");
const itemtitle = document.getElementById("itemtitle");
const itemtype = document.getElementById("itemtype");
const itemdescription = document.getElementById("itemdescription");
const itemqty = document.getElementById("itemqty");
const itemprice = document.getElementById("itemprice");
const itemlocation = document.getElementById("itemlocation");
const itemstate = document.getElementById("itemstate");
const itemuser = document.getElementById("itemuser");
const itemimg = document.getElementById("image-input");


// create button
const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

//print table from load up

table();

// user data

// event listerner for create button
btncreate.onclick = event => {
  // insert values
  let flag = bulkcreate(db.articulos, {
    title: itemtitle.value,
    type: itemtype.value,
    description: itemdescription.value,
    qty: itemqty.value,
    price: itemprice.value,
    location: itemlocation.value,
    state: itemstate.value,
    user: itemuser.value,
    img: itemimg.value
  });
  // reset textbox values
  //proname.value = "";
  //seller.value = "";
  // price.value = "";
  itemtitle.value = itemtype.value = itemdescription.value = itemqty.value = itemprice.value = itemlocation.value = itemstate.value = itemuser.value = itemimg.value = "";

  // set id textbox value
  getData(db.articulos, data => {
    itemid.value = data.id + 1 || 1;
  });
  
  let insertmsg = document.querySelector(".insertmsg");
  getMsg(flag, insertmsg);
  table();
};
//inserting an image
const image_input = document.querySelector("#image-input");
var uploaded_image = "";

image_input.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0].name);
});

// event listerner for create button
btnread.onclick = table;

// button update
btnupdate.onclick = () => {
  const id = parseInt(itemid.value || 0);
  if (id) {
    // call dexie update method
    db.articulos.update(id, {
      title: itemtitle.value,
      type: itemtype.value,
      description: itemdescription.value,
      qty: itemqty.value,
      price: itemprice.value,
      location: itemlocation.value,
      state: itemstate.value,
      user: itemuser.value,
      img: itemimg.value
    }).then((updated) => {
      // let get = updated ? `data updated` : `couldn't update data`;
      let get = updated ? true : false;

      // display message
      let updatemsg = document.querySelector(".updatemsg");
      getMsg(get, updatemsg);

      itemtitle.value = itemtype.value = itemdescription.value = itemqty.value = itemprice.value = itemlocation.value = itemstate.value = itemuser.value = itemimg.value ="";
      //console.log(get);
      table();
    })
  } else {
    console.log(`Please Select id: ${id}`);
  }
}

// delete button
btndelete.onclick = () => {
  db.delete();
  db = prodb("Productdb", {
    articulos: `++id, tipo, nombre, usuario, descripcion, cantidad, precio, ubicacion, img, estado`, 
  });
  db.open();
  table();
  textID(userid);
  // display message
  let deletemsg = document.querySelector(".deletemsg");
  getMsg(true, deletemsg);
}

window.onload = event => {
  //load dropdown list
  listUsers();
  // set id textbox value
  textID(itemid);
};


//dropdown users population 
function listUsers(){
  const userList = document.getElementById("itemuser");
  getDataUser(db.usuario, (data, index) => {
    if(data){
      console.log(data);
      createEle("option", userList, option => {
        console.log(option);
        option.textContent = option.value = data.name;
      })
    }else{
      console.log("No users in the database")
    };
  });
};

// create dynamic table
function table() {
  const tbody = document.getElementById("tbody");
  const notfound = document.getElementById("notfound");
  notfound.textContent = "";
  // remove all childs from the dom first
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }


  getData(db.articulos, (data, index) => {
    if (data) {
      createEle("tr", tbody, tr => {
        for (const value in data) {
          createEle("td", tr, td => {
            td.textContent = data.price === data[value] ? `$ ${data[value]}` : data[value];
            console.log()
          });
        }
        createEle("td", tr, td => {
          createEle("i", td, i => {
            i.className += "fas fa-edit btnedit";
            i.setAttribute(`data-id`, data.id);
            // store number of edit buttons
            i.onclick = editbtn;
          });
        })
        createEle("td", tr, td => {
          createEle("i", td, i => {
            i.className += "fas fa-trash-alt btndelete";
            i.setAttribute(`data-id`, data.id);
            // store number of edit buttons
            i.onclick = deletebtn;
          });
        })
      });
    } else {
      notfound.textContent = "No record found in the database...!";
    }

  });
}

const editbtn = (event) => {
  let id = parseInt(event.target.dataset.id);
  db.articulos.get(id, function (data) {
    let newdata = SortObj(data);
    itemid.value = newdata.id || 0;
    itemtitle.value = newdata.title || "";
    itemtype.value = newdata.type || "";
    itemdescription.value = newdata.description || "";
    itemqty.value = newdata.qty || "";
    itemprice.value = newdata.price || "";
    itemlocation.value = newdata.location || "";
    itemstate.value = newdata.state || "";
    itemuser.value = newdata.user || "";
  });
}

// delete icon remove element 
const deletebtn = event => {
  let id = parseInt(event.target.dataset.id);
  db.articulos.delete(id);
  table();
}

// textbox id
function textID(textboxid) {
  getData(db.articulos, data => {
    textboxid.value = data.id + 1 || 1;
  });
}

// function msg
function getMsg(flag, element) {
  if (flag) {
    // call msg 
    element.className += " movedown";

    setTimeout(() => {
      element.classList.forEach(classname => {
        classname == "movedown" ? undefined : element.classList.remove('movedown');
      })
    }, 4000);
  }
}