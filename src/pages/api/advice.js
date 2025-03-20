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
  const { kysymys } = request.body;
  //const req = await request.json();
  console.log(request.body);
  try {
    // Openai call
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Saat kysymyksen, johon sinun pitää antaa neuvoja yläkouluikäiselle oppilaalla \
            Älä kerro vastausta! Anna pedagogisesti hyviä neuvoja.\
            Ole tarkkana, että annat matemaattisen tekstin yhden ($) tai kahden($$) $-merkin sisällä!",
        },
        { role: "user", content: "Tässä kysymys: " + kysymys },
      ],
      model: "gpt-4o",
    });

    console.log("completion täälllä" + completion.choices[0].message.content);

    const responseContent = completion.choices[0].message.content;

    // Return the transcribed text in the response
    return response.status(200).json({
      advice: responseContent,
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
