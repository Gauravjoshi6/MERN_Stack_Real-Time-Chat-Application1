import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainForm = () => {
    const navigate = useNavigate();
  const [store, setStore] = useState({ name: "", room: "" });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    console.log(e.target.value, e.target.value)
    setStore({
      ...store,
      [e.target.name]: e.target.value
    });
  };

  const validation = () => {
    if(!store.name) {
      setError("Please Enter name")
      return false
    }
    if(!store.room) {
      setError("Please select room")
      return false
    }
    setError("")
    return true
  };

  const handleSubmit =(e) =>{
        e.preventDefault()
        const isValid = validation()
        console.log("hello")
        console.log(error);
        if (isValid) {
            navigate(`/chat/${store.room}`,{state: store})
        }
  }
  return (
    <div className="flex justify-center items-center bg-sky-500 min-h-[100vh]">
    <div className=" m-auto shadow-lg group group relative transform transition-transform duration-500 hover:scale-110 bg-slate-300 bg-blend-lighten   flex flex-col justify-center border-yellow-300 border-2 items-center shadow-black rounded-md w-[350px] h-[350px]">
      <form className="" onSubmit={handleSubmit}>
        <div className="mb-4">
          <strong className=" text-2xl">Welcome to Chatclub</strong>
        </div>

        <div className="mb-4 ">
          <input
            type="text"
            className="w-full h-8 p-2 rounded-md"
            name="name"
            placeholder="Enter name"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 ">
          <select className="w-full h-8 rounded-md" onChange={handleChange} name="room">
            <option value=''>Select Room</option>
            <option value="Gaming">Gaming</option>
            <option value="Coding">Coding</option>
            <option value="SocialMedia">Social Media</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-green-600 h-8 rounded-md text-white text-lg font-semibold hover:bg-green-500">
          Submit
        </button>
        {error && <small className="text-red-900">{error}</small>}
      </form>
    </div>
    </div>
  );
};

export default MainForm;
