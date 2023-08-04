import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { db } from "./firebase.config";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

const App = () => {
  const [data, setdata] = useState({
    name: "",
    number: "",
  });

  const [getUser, setgetUser] = useState([]);

  useEffect(() => {
    // Sample initial contacts data

    getContacts();
  }, []);

  useEffect(() => {
    const contactDataElem = document.querySelector(".contact-data");

    contactDataElem && getUser.length > 4
      ? contactDataElem.classList.add("pb")
      : contactDataElem.classList.remove("pb");
  }, [getUser]);

  const userCollectionRef = collection(db, "contacts");

  const createContact = async () => {
    await addDoc(userCollectionRef, {
      name: data.name,
      number: data.number,
    });

    setdata({
      name: "",
      number: "",
    });

    getContacts();
  };

  const getContacts = async () => {
    const Data = await getDocs(userCollectionRef);
    setgetUser(Data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "contacts", id);
    await deleteDoc(userDoc);
    getContacts();
  };

  const updateContact = async (id) => {
    const userDoc = doc(db, "contacts", id);
    await updateDoc(userDoc, {
      name: data.name,
      number: data.number,
    });

    setdata({
      name: "",
      number: "",
      id: "",
    });

    getContacts();
  };

  const clearAll = async () => {
    const contactSnapshot = await getDocs(userCollectionRef);

    console.log(contactSnapshot);

    const deletePromise = contactSnapshot.docs.map((doc) => deleteDoc(doc.ref));

    // contactSnapshot.docs.map((value) => {
    //   console.log(value.ref); //? the value.ref is what that tell the firebase firestore to delete a particular document according to its reference each document has a unique reference
    // });

    await Promise.all(deletePromise); //? this line wait until all the document is deleted successfully
    getContacts();
  };

  // "lf5b9idFEf5nsbHnRL8F"

  return (
    <div className="container">
      <div className="contact-section">
        <div className="contactApp">
          <div className="top">
            <h2> Contact App</h2>
            <input
              type="text"
              className="input margin"
              placeholder="Contact Name"
              value={data.name}
              onChange={(e) => {
                setdata({ ...data, name: e.target.value });
              }}
            />
            <input
              type="text"
              className="input"
              placeholder="Enter Number"
              value={data.number}
              onChange={(e) => {
                setdata({ ...data, number: e.target.value });
              }}
            />
            <div className="button-parent">
              <button
                className="add-btn"
                onClick={() =>
                  data.id ? updateContact(data.id) : createContact()
                }
              >
                {data.id ? "Update Contact" : "Create Contact"}
              </button>
              <button onClick={clearAll} className="add-btn">
                Clear All Contact
              </button>
            </div>
          </div>
          <div className="contact-data">
            <ul className="inner-data">
              {getUser.map((value, index) => {
                return (
                  <div className="listItem" key={index}>
                    <p>{value.name}</p>
                    <div className="list">
                      <li>{value.number}</li>
                      <div className="icons">
                        <AiFillDelete
                          className="icon-delete"
                          onClick={() => deleteUser(value.id)}
                        />
                        <BsPencilFill
                          className="icon-update"
                          onClick={() => setdata(value)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
