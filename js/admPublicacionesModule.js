const productsdb = (dbname, table) => {
  const db = new Dexie(dbname);
  db.version(1).stores(table);
  db.version(2).stores(table);
  db.open();

  return db;
  /**
       * const db = new Dexie('myDb');
          db.version(1).stores({
          friends: `name, age`
      });
       */
};

const bulkcreate = (dbtable, data) => {
  let flag = empty(data);
  if (flag) {
    dbtable.bulkAdd([data]);
    console.log("data inserted successfully...!");
  } else {
    console.log("Please provide data...!");
  }
  return flag;
};

// create dynamic elements
const createEle = (tagname, appendTo, fn) => {
  const element = document.createElement(tagname);
  if (appendTo) appendTo.appendChild(element);
  if (fn) fn(element);
};

// check textbox validation
const empty = object => {
  let flag = false;
  for (const value in object) {
    if (object[value] != "" && object.hasOwnProperty(value)) {
      flag = true;
    } else {
      flag = false;
    }
  }
  return flag;
};

// getData from the database
const getData = (dbname, fn) => {
  let index = 0;
  let obj = {};
  dbname.count(count => {
    // count rows in the table using count method
    if (count) {
      dbname.each(table => {
        // table => return the table object data
        // to arrange order we are going to create for in loop
        obj = SortObj(table);
        fn(obj, index++); // call function with data argument
      });
    } else {
      fn(0);
    }
  });
};

const SortObj = (sortobj) => {
  let obj = {};
  obj = {
    id: sortobj.id,
    title: sortobj.title,
    type: sortobj.type,
    description: sortobj.description,
    qty: sortobj.qty,
    price: sortobj.price,
    location: sortobj.location,
    state: sortobj.state,
    user: sortobj.user,
    img: sortobj.img
  };
  return obj;
}

// getData from the database
const getDataUser = (dbname, fn) => {
  let index = 0;
  let obj = {};
  dbname.count(count => {
    // count rows in the table using count method
    if (count) {
      dbname.each(table => {
        // table => return the table object data
        // to arrange order we are going to create for in loop
        obj = SortObjUser(table);
        fn(obj, index++); // call function with data argument
      });
    } else {
      fn(0);
    }
  });
};

const SortObjUser = (sortobj) => {
  let obj = {};
  obj = {
    id: sortobj.id,
    name: sortobj.name,
    email: sortobj.email,
    password: sortobj.password
  };
  return obj;
}


export default productsdb;
export {
  bulkcreate,
  createEle,
  getData,
  SortObj,
  getDataUser,
  SortObjUser
};