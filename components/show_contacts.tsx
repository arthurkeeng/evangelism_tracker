"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface People {
    name : string , 
    phone : string
}
const ShowContacts = () => {
  const [people, setPeople] = useState<People[]>([]);
  const handleClick = () => {
    const local = JSON.parse(localStorage.getItem("people")!);

    if (local) {
      setPeople(local);
    }
  };

  useEffect(() => {
    console.log("the people are ", people);
  }, [people]);
  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="mb-6">
        <Button onClick={handleClick} variant="outline" className="w-full">
          Show Contacts
        </Button>
      </div>
  
      <div className="space-y-4">
        {people && people.length > 0 ? (
          <>
            {people.map((person) => (
              <div
                key={person?.phone}
                className="p-2 bg-white shadow rounded-lg border border-gray-200"
              >
                <h5 className="text-lg font-semibold text-gray-800">{person.name}</h5>
                <h4 className="text-gray-600">{person.phone}</h4>
              </div>
            ))}
          </>
        ) : (
          <div className="p-2 bg-yellow-50 text-yellow-800 border border-yellow-300 rounded">
            <h4 className="text-center">No Contact Yet</h4>
          </div>
        )}
      </div>
    </div>
  );
  
}

export default ShowContacts;
