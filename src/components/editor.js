import Head from "next/head";
import { useEffect, useState } from "react";
import { Button } from "./button";
import Spinner from "./spinner";
import MathText from "./MathText";

export default function Editor({ data }) {
  //const { isAuthenticated, user } = useAuth();

  const [selectedOption, setSelectedOption] = useState("jalkapallo");
  const [difficulty, setDifficulty] = useState("keskitaso");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [msg, setMsg] = useState("");
  const [apiTehtava, setApiTehtava] = useState("");
  const [apiRatkaisu, setApiRatkaisu] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [apiAdvice, setApiAdvice] = useState("");
  const id = data
    ? data.id
    : "Mitkä ovat funktion $f\\left(x\\right)=x^2-4$ nollakohdat?";
  const kysymys = data
    ? data.kysymys
    : "Mitkä ovat funktion $f\\left(x\\right)=x^2-4$ nollakohdat?";

  useEffect(() => {
    // Create script elements

    const mathjaxConfigScript = document.createElement("script");
    mathjaxConfigScript.src = "/mathjax-config.js";
    mathjaxConfigScript.async = true;

    // Append script elements to the document body
    document.body.appendChild(mathjaxConfigScript);

    // Clean up function to remove the script elements when component unmounts
    return () => {
      document.body.removeChild(mathjaxConfigScript);
      //document.body.removeChild(mathjaxScript);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //const message = handleClick();
    setApiTehtava("");
    setApiAdvice("");
    setApiRatkaisu("");
    //setMsg(result);
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kysymys: kysymys,
          msg: selectedOption,
          difficulty: difficulty,
        }),
      });
      const data1 = await response.json();
      if (response.status !== 200) {
        throw (
          data1.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      // Tässä tallennus tietokantaan data ja message ja kysymys ja käyttäjä!
      // Add a new document with a generated id.

      setApiTehtava(data1.tehtava);

      //console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.log(e);
      setApiTehtava({
        tehtava: "Something is going wrong, Please try again.",
      });
    }
    setLoading(false);
  };

  const handleAdviceRequest = async () => {
    setLoading2(true);
    setApiAdvice("");
    console.log("grsg" + apiTehtava);

    try {
      const response = await fetch("/api/advice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kysymys: apiTehtava,
        }),
      });
      const data1 = await response.json();
      if (response.status !== 200) {
        throw new Error(
          data1.error || `Request failed with status ${response.status}`
        );
      }
      setApiAdvice(data1.advice);
    } catch (e) {
      console.log(e);
      setApiAdvice("Could not fetch advice, please try again.");
    }
    setLoading2(false);
  };

  const handleSolutionRequest = async () => {
    setLoading3(true);
    setApiRatkaisu("");
    try {
      const response = await fetch("/api/solution", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kysymys: apiTehtava,
        }),
      });
      const data1 = await response.json();
      if (response.status !== 200) {
        throw new Error(
          data1.error || `Request failed with status ${response.status}`
        );
      }
      setApiRatkaisu(data1.solution);
    } catch (e) {
      console.log(e);
      setApiRatkaisu("Could not fetch solution, please try again.");
    }
    setLoading3(false);
  };

  return (
    <>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>

      <div>
        <div>{"Tehtävä: "}</div>
        <MathText text={kysymys} />
        <form className="text-black" onSubmit={handleSubmit}>
          <div>
            <label>
              <input
                type="radio"
                value="jalkapallo"
                checked={selectedOption === "jalkapallo"}
                onChange={handleOptionChange}
              />
              Jalkapallo
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="jääkiekko"
                checked={selectedOption === "jääkiekko"}
                onChange={handleOptionChange}
              />
              Jääkiekko
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="uinti"
                checked={selectedOption === "uinti"}
                onChange={handleOptionChange}
              />
              Uinti
            </label>
          </div>
          <hr className="my-2" />

          <div>
            <label>
              <input
                type="radio"
                value="helppo"
                checked={difficulty === "helppo"}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              Helppo
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="keskitaso"
                checked={difficulty === "keskitaso"}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              Keskitaso
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="vaikea"
                checked={difficulty === "vaikea"}
                onChange={(e) => setDifficulty(e.target.value)}
              />
              Vaikea
            </label>
          </div>
        </form>
        <Button
          type="submit"
          onClick={handleSubmit}
          text="Tilaa uusi tehtävä"
        />
        {loading && <Spinner />}
        <div>Tehtävä:</div>
        <MathText text={apiTehtava} />
        <div>
          {apiTehtava && (
            <Button
              type="button"
              onClick={handleAdviceRequest}
              text="Pyydä neuvoa"
            />
          )}
          {loading2 && <Spinner />}
          <div>{apiAdvice && <MathText text={apiAdvice} />}</div>
        </div>
        <div>
          {apiAdvice && (
            <Button
              type="button"
              onClick={handleSolutionRequest}
              text="Näytä ratkaisu - muista yrittää ensin itse!"
            />
          )}
          {loading3 && <Spinner />}
          <div>{apiRatkaisu && <MathText text={apiRatkaisu} />}</div>
        </div>
      </div>
    </>
  );
}
