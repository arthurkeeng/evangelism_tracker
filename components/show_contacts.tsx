"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface People {
  name: string;
  phone: string;
}

const ShowContacts = ({person } : {person : People[]}) => {
  const [isClient, setIsClient] = useState(false);
  const [people, setPeople] = useState<People[]>([]);
  
  const handleClick = () => {
    console.log('clicked')
    const local = JSON.parse(localStorage.getItem("people") || "[]");

    if (local && local.length > 0) {
      setPeople(local);
    }
  };

  const handleClear = () => {
    if (confirm("Would you like to clear the contacts you spoke to?")) {
      localStorage.removeItem("people"); // Just remove the specific item, not the entire localStorage
      setPeople([]); // Clear the people state
    }
  };


  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if(!isClient)return
    // Initialize people from localStorage when the component mounts
    const local = JSON.parse(localStorage.getItem("people") || "[]");
    setPeople(local);
  }, [person , isClient]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("people");
      if (stored) {
        try {
          console.log('stored')
          setPeople(JSON.parse(stored));
        } catch (err) {
          console.log("not stored")
          console.error("Invalid JSON in localStorage", err);
        }
      }
    }
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="mb-6 flex gap-3">
        <Button onClick={handleClick} variant="outline" className="flex-1">
          Show Contacts
        </Button>
        <Button
          onClick={handleClear}
          variant="outline"
          className="flex-1"
        >
          Clear Contacts
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
                <h5 className="text-lg font-semibold text-gray-800">
                  {person.name}
                </h5>
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
};

export default ShowContacts;
