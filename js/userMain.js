import prodb, { bulkcreate, createEle, getData, SortObj } from "./userModule.js";

let db = prodb("Productdb", {
  articulos: `++id, tipo, nombre, usuario, descripcion, cantidad, precio, ubicacion, img, estado`,
  usuario: `++id, email, nombre, telefono, password`
});

// input tags
const userid = document.getElementById("userid");
const username = document.getElementById("username");
const userphone = document.getElementById("userphone");
const useremail = document.getElementById("useremail");
const userpassword = document.getElementById("userpassword");

// create button
const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

//print table from load up

table();

// user data

// event listerner for create button
btncreate.onclick = (event) => {
  // insert values
  let flag = bulkcreate(db.usuario, {
    name: username.value,
    phone: userphone.value,
    email: useremail.value,
    password: userpassword.value,
  });
  // reset textbox values
  //proname.value = "";
  //seller.value = "";
  // price.value = "";
  username.value = userphone.value = useremail.value = userpassword.value = "";

  // set id textbox value
  getData(db.usuario, (data) => {
    userid.value = data.id + 1 || 1;
  });
  
  table();

  let insertmsg = document.querySelector(".insertmsg");
  getMsg(flag, insertmsg);
};

// event listerner for create button
btnread.onclick = table;

// button update
btnupdate.onclick = () => {
  const id = parseInt(userid.value || 0);
  if (id) {
    // call dexie update method
    db.usuario
      .update(id, {
        name: username.value,
        phone: userphone.value,
        email: useremail.value,
        password: userpassword.value,
      })
      .then((updated) => {
        // let get = updated ? `data updated` : `couldn't update data`;
        let get = updated ? true : false;

        // display message
        let updatemsg = document.querySelector(".updatemsg");
        getMsg(get, updatemsg);

        username.value = userphone.value = useremail.value = userpassword.value = "";
        //console.log(get);
      });
  } else {
    console.log(`Please Select id: ${id}`);
  }
  table();
};

// delete button
btndelete.onclick = () => {
  db.delete();
  db = prodb("Productdb", {
    usuario: `++id, email, nombre, telefono, password`,
  });
  db.open();
  table();
  textID(userid);
  // display message
  let deletemsg = document.querySelector(".deletemsg");
  getMsg(true, deletemsg);
};

window.onload = (event) => {
  // set id textbox value
  textID(userid);
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

  getData(db.usuario, (data, index) => {
    if (data) {
      createEle("tr", tbody, (tr) => {
        for (const value in data) {
          createEle("td", tr, (td) => {
            td.textContent =
              data.phone === data[value] ? `+505${data[value]}` : data[value];
          });
        }
        createEle("td", tr, (td) => {
          createEle("i", td, (i) => {
            i.className += "fas fa-edit btnedit";
            i.setAttribute(`data-id`, data.id);
            // store number of edit buttons
            i.onclick = editbtn;
          });
        });
        createEle("td", tr, (td) => {
          createEle("i", td, (i) => {
            i.className += "fas fa-trash-alt btndelete";
            i.setAttribute(`data-id`, data.id);
            // store number of edit buttons
            i.onclick = deletebtn;
          });
        });
      });
    } else {
      notfound.textContent = "No record found in the database...!";
    }
  });
}

const editbtn = (event) => {
  let id = parseInt(event.target.dataset.id);
  db.usuario.get(id, function (data) {
    let newdata = SortObj(data);
    userid.value = newdata.id || 0;
    username.value = newdata.name || "";
    userphone.value = newdata.phone || "";
    useremail.value = newdata.email || "";
    userpassword.value = newdata.password || "";
  });
};

// delete icon remove element
const deletebtn = (event) => {
  let id = parseInt(event.target.dataset.id);
  db.usuario.delete(id);
  table();
};

// textbox id
function textID(textboxid) {
  getData(db.usuario, (data) => {
    textboxid.value = data.id + 1 || 1;
  });
}

// function msg
function getMsg(flag, element) {
  if (flag) {
    // call msg
    element.className += " movedown";

    setTimeout(() => {
      element.classList.forEach((classname) => {
        classname == "movedown"
          ? undefined
          : element.classList.remove("movedown");
      });
    }, 4000);
  }
}
