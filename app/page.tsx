"use client";

import Link from "next/link";
import { useEffect, useState } from "react";


type VehicleMake = {
  MakeId: number;
  MakeName: string;
};

export default function Home() {
  const [makes, setMakes] = useState<VehicleMake[]>([]);
   const [selectCar, setSelectCar]= useState<string | null>("")
  const [modelYear, setModelYear] = useState("");
  const [makeId,setMakeId] = useState<number>()
  



  
  const year = modelYear
  const currentYear = new Date().getFullYear();
  const yearsSelcted= Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i);

  const fetchVehicleMakes = async () => {
    try {
      const response = await fetch(
        "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
      );
      const data = await response.json();
      setMakes(data.Results)
     
    } catch (error) {
      console.error("Failed to fetch vehicle makes:", error);
    }
  };

  useEffect(()=>{
    fetchVehicleMakes()
    

  },[])
  const hendlerForCurrenSelect=(e: React.ChangeEvent<HTMLSelectElement>)=>{
    const id = Number(e.target.value)
    setMakeId(id)
    const currenId = makes.find((m)=>m.MakeId===makeId)

 setSelectCar(currenId?.MakeName || null)
  }
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg">
        

      {makes.length > 0 && (
          <select className="border border-gray-300 rounded px-4 py-2"
         
          onChange={hendlerForCurrenSelect}
          >
            <option value="">Select Make
            
            </option>
            {makes.map((make) => (
              <option key={make.MakeId} value={make.MakeId} >
                {make.MakeName} 
              </option>

            ))}
          </select>
          )}
        
      </div>
      <div className="bg-white p-8 rounded shadow-lg">
        

        {makes.length > 0 && (
          <select className="border border-gray-300 rounded px-4 py-2"
          value={modelYear} onChange={(e)=>setModelYear(e.target.value)}>
            <option value=""> Model year  </option>
            {yearsSelcted.map((year)=>
            (<option key={year} value={year}>
              {year}

            </option>)
            )}
          
          </select>
          
        )}
      </div>
      <Link href={`/result/${makeId}/${year}`}>
      <button 
      className={`px-8 py-2 rounded-lg text-white font-large  ${
         selectCar && modelYear
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        >
        Next
      </button>
      </Link>
     
     
      
    </div>
  );
  
  

}


