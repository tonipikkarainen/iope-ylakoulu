import React, { useState, useEffect } from "react";
import { BiBoltCircle, BiMenu, BiX } from "react-icons/bi";
import { db } from "../../firebaseconfig";
import Link from "next/link";
import { collection, query, getDocs } from "firebase/firestore";

const Navbar = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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

        newData.sort((a, b) => a.otsikko.localeCompare(b.otsikko));

        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <nav className="fixed bg-purple-700 text-white p-4 w-full md:w-56 md:h-full">
        <div className="flex items-center justify-between md:block">
          <h1 className="text-3xl font-bold">LaskijanAI</h1>
          <button
            onClick={toggleMenu}
            className="text-3xl focus:outline-none md:hidden"
          >
            {isOpen ? <BiX /> : <BiMenu />}
          </button>
        </div>

        <ul className={`mt-4 md:block ${isOpen ? "block" : "hidden"}`}>
          <li className=" hover:underline">
            <Link href="/">Koti</Link>
          </li>
          <li className="text-sm ">Tehtävät:</li>
          {data.map((item) => (
            <li key={item.id} className="mt-2">
              <Link href="/[id]" as={`/${item.id}`}>
                <div className="flex text-sm items-center hover:underline">
                  <BiBoltCircle className="mr-2" />
                  {item.otsikko}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Padding for mobile view navbar height */}
      <div className="md:hidden h-16"></div>
    </>
  );
};

export default Navbar;
