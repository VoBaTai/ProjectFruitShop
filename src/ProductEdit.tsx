import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProducts } from "./ProductList";
import { firestoreDb, storage } from "./firebase-config"; // Import storage
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import các hàm storage
import Input from "./components/Input";

const defaultProductValue = {
  id: "",
  name: "",
  description: "",
  price: "",
  image: "",
};

const ProductEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProducts>(defaultProductValue);
  const [file, setFile] = useState<File | null>(null); // State để lưu file ảnh
  const navigate = useNavigate();

  const handleBack = (e: any) => {
    e.preventDefault();
    navigate("/admin/product");
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]); // Lưu file ảnh vào state
    }
  };

  const handleSave = async () => {
    const { id: productId, ...data } = product;

    // Upload ảnh lên Firebase Storage
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`); // Đường dẫn lưu file
      await uploadBytes(storageRef, file); // Tải file lên
      const downloadURL = await getDownloadURL(storageRef); // Lấy URL của ảnh
      data.image = downloadURL; // Cập nhật URL ảnh vào data
    }

    if (productId === "") {
      await addDoc(collection(firestoreDb, "products"), data);
    } else {
      await setDoc(doc(firestoreDb, "products", productId), data);
    }
    navigate("/admin/product");
  };

  useEffect(() => {
    if (id !== "0") {
      getDoc(doc(collection(firestoreDb, "products"), id)).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as IProducts;
          data.id = snapshot.id;
          setProduct(data);
        } else {
          setProduct(defaultProductValue);
        }
      });
    }
  }, [id, navigate]);

  return (
    <>
      <div className="content-wrapper">
        <section className="content">
          <div className="content">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">
                  Product
                  <small className="text-muted">
                    {Number(id) === 0 ? "new" : "edit"}
                  </small>
                </h5>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <Input
                        label="Name"
                        id="txtName"
                        name="name"
                        onChange={handleChange}
                        value={product.name}
                      />
                    </div>
                    <div className="col-md-6">
                      <Input
                        label="Description"
                        id="txtDescription"
                        name="description"
                        onChange={handleChange}
                        value={product.description}
                      />
                    </div>
                    <div className="col-md-6">
                      <Input
                        label="Price"
                        id="txtPrice"
                        name="price"
                        onChange={handleChange}
                        value={product.price}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="txtImage">Image</label>
                      <input
                        type="file"
                        id="txtImage"
                        name="image"
                        className="form-control"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-footer text-end">
                <a
                  href="/#"
                  className="btn btn-secondary me-2"
                  onClick={(e) => handleBack(e)}
                >
                  Back
                </a>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductEdit;
