import { useState, useEffect } from "react";

// Component Definitions tik Dashboard ekn eliyt dgtt
const Button = ({ title, btnColor }) => {
    return <button type="submit" className={btnColor}>{title}</button>;
};

const TextField = ({ placeholder, type, name, value, handleChange }) => {
    if (type === 'file') {
        return (
            <div className="p-3">
                <label htmlFor={name} className="form-label">{placeholder}</label>
                <input type="file" name={name} className="form-control" id={name} onChange={handleChange} />
            </div>
        );
    }
    return (
        <div className="p-3">
            <input type={type} name={name} value={value} className="form-control" placeholder={placeholder} onChange={handleChange} />
        </div>
    );
};

// Dashboard Component 
const Dashboard = () => {
    const [formData, setFormData] = useState({ title: '', description: '', price: '', image: null });
    
    const [preview, setPreview] = useState(null);
    useEffect(() => {
        // cleanup function
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const file = files[0];
            setFormData({ ...formData, image: file });

            if (file) {
                if (preview) {
                    URL.revokeObjectURL(preview);
                }
                setPreview(URL.createObjectURL(file));
            } else {
                setPreview(null);
            }

        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('image', formData.image);

        try {
            const res = await fetch("http://localhost:5000/api/products/create", {
                method: "POST",
                body: data
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || 'Something went wrong on the server');
            }

            alert(result.message);
            setFormData({ title: '', description: '', price: '', image: null });
            setPreview(null);

        } catch (error) {
            console.error("Error from frontend:", error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card col-md-8 col-lg-6 mx-auto">
                <div className="card-header"><h1 className="text-center card-title">Add New Product</h1></div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <TextField placeholder="Product Title" type="text" name="title" value={formData.title} handleChange={handleChange} />
                        <TextField placeholder="Description" type="text" name="description" value={formData.description} handleChange={handleChange} />
                        <TextField placeholder="Price" type="number" name="price" value={formData.price} handleChange={handleChange} />
                        <TextField placeholder="Product Image" type="file" name="image" handleChange={handleChange} />
                        
                        {/* image preview*/}
                        {preview && (
                            <div className="p-3 text-center">
                                <p className="mb-2">Image Preview:</p>
                                <img
                                    src={preview}
                                    alt="Selected Preview"
                                    className="img-thumbnail"
                                    style={{ maxHeight: "200px", maxWidth: "100%", objectFit: "contain" }}
                                />
                            </div>
                        )}
                        
                        <div className="p-3">
                            <Button title="Save Product" btnColor="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;