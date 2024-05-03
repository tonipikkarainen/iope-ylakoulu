import React from "react";
import { useState, useEffect } from "react";
import { BiBoltCircle } from "react-icons/bi";
import { db } from "../../firebaseconfig";
import Link from "next/link";

import { collection, query, getDocs } from "firebase/firestore";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [data, setData] = useState([]);

  const handleMouseEnter = async () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "kysymykset"));

      try {
        const querySnapshot = await getDocs(q);
        const newData = [];
        querySnapshot.forEach((doc) => {
          newData.push({ id: doc.id, ...doc.data() });
        });
        setData(newData);
        console.log("kys:");
        console.log(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div
      className="fixed h-full bg-purple-700 text-white p-4 transition-all duration-300 w-56"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-4">LaskijanAI</h1>
      </div>

      <ul>
        <li className=" whitespace-nowrap">
          <a
            href="/"
            className="inline-block py-2 hover:underline whitespace-nowrap"
          >
            Home
          </a>
        </li>
        {data.map((item) => (
          <li key={item.id} className=" whitespace-nowrap">
            <BiBoltCircle className="mr-2 inline-block" />
            <Link href="/[id]" as={`/${item.id}`}>
              <div className="inline-block py-2 hover:underline whitespace-nowrap">
                {item.otsikko}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
