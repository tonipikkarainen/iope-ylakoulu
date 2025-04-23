// Import necessary libraries
import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebaseconfig";

// Promisify the exec function from child_process

const openai = new OpenAI();
//console.log(openai);
// This function handles POST requests to the /api/speechToText route
export default async function POST(request, response) {
  // Check if the OpenAI API key is configured
  //console.log(request);
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      {
        error:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
      { status: 500 }
    );
  }
  // Parse the request body
  // Parse the request body
  const { kysymys, msg, difficulty, id } = request.body;
  //const req = await request.json();

  try {
    // Openai call
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Saat ensin tehtävän, sitten oppilaan toivoman aihepiirin, sitten toivotun vaikeustason. \
            Palauta tehtävästä uusi versio, joka liittyy oppilaan toivomaan aihepiiriin. Ota huomioon toivottu vaikeustaso.\
            Älä anna ratkaisua! \
            HUOM! OLE TARKKANA, ETTÄ TEHTÄVÄ ON KÄYTÄNNÖN KANNALTA JÄRKEVÄ JA TEHTÄVÄN MATEMAATTINEN IDEA ON SAMA KUIN ALKUPERÄISESSÄ!\
            Jos vaikeustaso on vaikea, \
            tee tehtävästä sellainen, että se on kuitenkin mahdollista ratkaista. \
            Ole tarkkana, että annat KAIKEN matemaattisen tekstin YHDEN ($) tai KAHDEN ($$) $-merkin sisällä! \
            Älä käytä syntaksia \\(\\) tai \\[\\]",
        },
        { role: "user", content: "Tässä tehtävä: " + kysymys },
        { role: "user", content: "Tässä aihepiiri: " + msg },
        { role: "user", content: "Tässä vaikeustaso: " + difficulty },
      ],
      model: "gpt-4o",
    });

    const responseContent = completion.choices[0].message.content;

    // tallennetaan kantaan
    const docRef = await addDoc(collection(db, "muokatutTehtavat"), {
      alkuperainenKysymysID: id,
      muokattu: responseContent,
      aihepiiri: msg,
      vaikeustaso: difficulty,
    });

    // Return the transcribed text in the response
    return response.status(200).json({
      tehtava: responseContent,
    });
  } catch (error) {
    // Handle any errors that occur during the request
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return NextResponse.json({ error: error.response.data }, { status: 500 });
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return NextResponse.json(
        { error: "An error occurred during your request." },
        { status: 500 }
      );
    }
  }
}
