
import axios from "axios";
import { useForm } from "react-hook-form";
const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset // Added reset function to clear form after submission
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email", data.email);
      formData.append("image", data.image[0]); // file

      const res = await axios.post("https://school-1b6n.onrender.com/api/schools", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ School added successfully!");
      console.log(res.data);
      reset(); // Reset form after successful submission
    } catch (err) {
      console.error("❌ Error submitting form:", err);
      alert("Failed to add school");
    }
  };

  return (
   
    <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="school-form">
        <h1 className="form-title">School Details</h1>
        
        <div className="form-group">
          <input 
            {...register("name", { required: "School name is required" })} 
            placeholder="School Name" 
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <span className="error-message">{errors.name.message}</span>}
        </div>
        
        <div className="form-group">
          <input 
            {...register("address", { required: "Address is required" })} 
            placeholder="Address" 
            className={errors.address ? "input-error" : ""}
          />
          {errors.address && <span className="error-message">{errors.address.message}</span>}
        </div>
        
        <div className="form-group">
          <input 
            {...register("city", { required: "City is required" })} 
            placeholder="City" 
            className={errors.city ? "input-error" : ""}
          />
          {errors.city && <span className="error-message">{errors.city.message}</span>}
        </div>
        
        <div className="form-group">
          <input 
            {...register("state", { required: "State is required" })} 
            placeholder="State" 
            className={errors.state ? "input-error" : ""}
          />
          {errors.state && <span className="error-message">{errors.state.message}</span>}
        </div>
        
        <div className="form-group">
          <input 
            {...register("contact", { 
              required: "Contact number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit contact number"
              }
            })} 
            placeholder="Contact Number" 
            className={errors.contact ? "input-error" : ""}
          />
          {errors.contact && <span className="error-message">{errors.contact.message}</span>}
        </div>
        
        <div className="form-group">
          <input 
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address"
              }
            })} 
            placeholder="Email" 
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>
        
        <div className="form-group">
          <label className="file-label">
            School Image
            <input 
              type="file" 
              {...register("image", { required: "Image is required" })} 
              className="file-input"
            />
          </label>
          {errors.image && <span className="error-message">{errors.image.message}</span>}
        </div>
        
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Form;
