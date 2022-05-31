import prodb, {
  bulkcreate,
  createEle,
  getData,
  SortObj
} from "./PublicacionesModule.js";


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
const btnread = document.getElementById("btn-read");

//print table from load up

table();

// user data


// event listerner for create button
btnread.onclick = table;

// create dynamic table
function table() {
  const items = document.getElementById("products-available");
  const notfound = document.getElementById("notfound");
  notfound.textContent = "";

  // remove all childs from the dom first
  // while (items.hasChildNodes()) {
  //   items.removeChild(items.firstChild);
  // }


  getData(db.articulos, (data, index) => {
    if (data) {
      createEle("div", items, div0 =>{
        div0.className += "element-main"
        createEle("div",div0, div =>{
          console.log(div);
          div.className += "element-info";
          createEle("h1", div, h1 =>{
            h1.className += "element-title"
            h1.textContent = data.title;
          });
          createEle("p", div, p =>{
            p.className += "element-type"
            p.textContent =`${data.type} ` 
          });
          createEle("p", div, p =>{
            p.className += "element-price"
            p.textContent =`$${data.price} ` 
          });
          createEle("p", div, p =>{
            p.className += "element-description"
            p.textContent =`${data.description} ` 
          });
          createEle("h4", div, h4 =>{
            h4.className += "element-location"
            h4.textContent =`${data.location} ` 
          });
          createEle("h3", div, h3 =>{
            h3.className += "element-state"
            h3.textContent =`${data.state} ` 
          });
          createEle("p", div, p =>{
            p.className += "element-user"
            p.textContent =`${data.user} ` 
          });
          createEle("div", div, div1 =>{
            div1.className += "element-space"
            createEle("a", div1, a =>{
              a.className += "whatsapp"
              a.href = `whatsapp://send/?phone=77234855&text=Me+interesa+este+producto: ${String(data.title)}!+Porfavor+contactarse+conmigo+a+este+numero`
              createEle("img", a, img =>{
                img.src = 'https://cdn-icons-png.flaticon.com/512/226/226757.png'
              });
            });
          })
        });
        createEle("div", div0, div =>{
          div.className += "image-div"
          createEle("img", div, img =>{
            img.className += "element-image"
            img.alt =`${data.img}`
            img.src = `../images/${String(data.img)}`
          });
        })
      })
      
      // createEle("tr", tbody, tr => {
      //   for (const value in data) {
      //     createEle("td", tr, td => {
      //       td.textContent = data.price === data[value] ? `$ ${data[value]}` : data[value];
      //     });
      //   }
      //   createEle("td", tr, td => {
      //     createEle("i", td, i => {
      //       i.className += "fas fa-edit btnedit";
      //       i.setAttribute(`data-id`, data.id);
      //       // store number of edit buttons
      //       i.onclick = editbtn;
      //     });
      //   })
      //   createEle("td", tr, td => {
      //     createEle("i", td, i => {
      //       i.className += "fas fa-trash-alt btndelete";
      //       i.setAttribute(`data-id`, data.id);
      //       // store number of edit buttons
      //       i.onclick = deletebtn;
      //     });
      //   })
      // });
    } else {
      notfound.textContent = "No record found in the database...!";
    }

  });
}