import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from "react";
import axios from "axios";
//import logo from '../public/round-sun.gif';



export default function IndexPage() {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [step, setStep] = useState("form");
  const [error, setError] = useState(null);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleReset = () => {
    setStep("form");
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("submit address:", address);
    setLoading(true);

    await sleep(1000);

    try {
      const response = await axios.request({
        method: "post",
        url: "http://localhost:3000/api/submit",
        data: {
          address
        }
      });

      setAddress("");
      setStep("submitted");

      console.log("result: ", response.data);
    } catch (e) {
      setStep("error");
      if (e.response && e.response.data && e.response.data.error) {
        setError(e.response.data.error);
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
       <h1 className="text-bold">
       Hello, we want an address. 
       </h1>
       {address}
      <div>
        {loading ? <div>loading...</div> : null}
        {step === "form" ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button type="submit">Send it</button>
          </form>
        ) : null}
        {step === "submitted" ? (
          <div>Thanks for submitting your address!</div>
        ) : null}
        {step === "error" ? (
          <div>
            You've done something wrong: {error}
            <div>
              <button type="button" onClick={handleReset}>
                Try again
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
