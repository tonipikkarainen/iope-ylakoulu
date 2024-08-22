// Import necessary libraries
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

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
  const { kysymys, msg } = request.body;
  //const req = await request.json();
  console.log(request.body);

  try {
    // Openai call
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Saat ensin tehtävän sitten oppilaan toivoman aihepiirin. \
            Luo ja palauta tehtävästä uusi versio, joka liittyy oppilaan toivomaan aihepiiriin.\
            Anna matemaattinen teksti \
            yhden ($) tai kahden($$) $-merkin sisällä.",
        },
        { role: "user", content: "Tässä kysymys: " + kysymys },
        { role: "user", content: "Tässä aihe: " + msg },
      ],
      model: "gpt-4o", //"gpt-3.5-turbo-0125",
    });
    console.log("completion täälllä" + completion.choices[0].message.content);

    // Return the transcribed text in the response
    return response.status(200).json({
      result: completion.choices[0].message.content,
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
