import React, { useState, useEffect } from "react";
import Adminmenu from "./Adminmenu";
import axios from "axios";
import { toast } from "react-toastify";
import Categoryform from "./Categoryform";
import { Modal } from "antd";

const Createcategory = () => {
  const [listofcategories, setListofcategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedname, setupdatedName] = useState("");




  // create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = axios.post("http://localhost:5000/create-category", { name })
        .then((res) => {
          if (data) {
            toast.success(`${name} is created`);
            getallcategories();
          } else {
            toast.error(data.message);
          }
        });
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Input Form");
    }
  };

  //get all categories

  const getallcategories = async () => {
    try {
      const categorydata = await axios.get("http://localhost:5000/get-category")
        .then((res) => {
          console.log( res);

          if (res) {
    setListofcategories(res.data.findcategory);

          }

        });

      } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }


  };

  useEffect(() => {
    getallcategories();

  });

  // update category function

  const handleupdate = async (e) => {
    e.preventDefault();
    try {
      const data = axios.put(`http://localhost:5000/update-category/${selected._id}`, 
        {name: updatedname,}
          )
        .then((res) => {
          console.log(data);
          if (res.data.success) {
            toast.success(`${updatedname} is updated`);
            setSelected(null);
            setupdatedName("");
            setVisible(false);
            getallcategories();
          } else {
            toast.error(data.message);
          }
        });
    } catch {
      toast.error("Something Went Wrong");
    }
  };

  // delete category function

  const handledelete = async (id) => {
    try {
      const data = axios
        .put(`http://localhost:5000/delete-category/${id}`, {
          name: updatedname,
        })
        .then((res) => {
          if (data.success) {
            toast.success(`Category is Deleted`);

            getallcategories();
          } else {
            toast.error(data.message);
          }
        });
    } catch {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Adminmenu />
          </div>

          <div className="col-md-9">
            <h1>MANAGE CATEGORY</h1>
            <div className="p-3 w-50">
              <Categoryform
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listofcategories.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>

                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setupdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handledelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>

            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <Categoryform
                value={updatedname}
                setValue={setupdatedName}
                handleSubmit={handleupdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Createcategory;
