import React, { useState } from "react";

const RegistrationForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare the data to send to the API
    const data = {
      companyName: companyName,
      ownerName: ownerName,
      rollNo: rollNo,
      ownerEmail: ownerEmail,
      accessCode: accessCode,
    };
    try {
      // Make a POST request to the John Doe API
      const response = await fetch("http://20.244.56.144/train/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // You might need to add authentication headers here if required
        },
        body: JSON.stringify(data),
      });

      // Handle the API response
      if (response.ok) {
        setMessage("Company registration successful!");
      } else {
        const errorData = await response.json();
        setMessage(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      setMessage("An error occurred while registering.");
    }
  };
  return (
    <div className="flex items-center gap-y-10  justify-center flex-col">
      <h1>Company Registration</h1>
      <div className="flex flex-col gap-y-2">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-x-2 items-start gap-y-1">
            <label>Company Name:</label>
            <input
              className="border border-black/40 "
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-x-2 items-start gap-y-1">
            <label>Owner Name:</label>
            <input
              className="border border-black/40 "
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-x-2 items-start gap-y-1">
            <label>Roll No:</label>
            <input
              className="border border-black/40 "
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-x-2 items-start gap-y-1">
            <label>Owner Email:</label>
            <input
              className="border border-black/40 "
              type="email"
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-x-2 items-start gap-y-1">
            <label>Access Code:</label>
            <input
              className="border border-black/40 "
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-black px-4 w-full  mt-4 py-2 text-white"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegistrationForm;
