import Editor from "../components/editor";


export default function UsingEd() {
  const db = process.env.DB_HOST;
  console.log("ttää333 "+db)
    return (
      < div>
        
        <Editor/>
      </div>
    );
  }