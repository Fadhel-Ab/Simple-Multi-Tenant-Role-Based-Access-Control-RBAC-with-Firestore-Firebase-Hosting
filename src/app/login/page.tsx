"use client";
import React, { useEffect, useState } from "react";

import Input from "../components/UI components/input";
import Button from "../components/UI components/button";
import FlexCcenter from "../components/UI components/layout";
import Toggle from "../components/UI components/toggle";
import Card from "../components/UI components/card";
import { useRouter } from "next/navigation";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAppContext } from "../components/UI components/contextTemplate";

type  dataType={ // for data retrieval 
  Name:string;
  Id:string;
}

export default function LoginPage() {
  const { setUser } = useAppContext(); // global state 
  const [tenantsList, setTenantList] = useState<dataType[]>([]);  // list of tenants 

  const [userName, setUserName] = useState<string>("");
  const [tenantId, setTenantId] = useState<string>(""); //default value if no change in tenant list/dropdown taken from first item on database
  // const [password, setPassword] = useState(""); no need for password 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isAdmin, setIsAdmin] = useState(false); // for toggle
  const router = useRouter(); // for page navigation


  useEffect(() => {   //apply fetching/function on page load/mount using empty dependency[]
    async function LoadListOfTenants() {
      const q = query(
        collection(db, "Tenant"),
        orderBy("Name", "asc")
      );
      const snapshot = await getDocs(q);
      const tenData = snapshot.docs.map(doc => ({Id:doc.id,Name:doc.data().Name}));  //retrieve data as object type User
      setTenantList(tenData);
      if (tenData.length > 0) setTenantId(tenData[0].Id);
      console.log(`printed, ${tenData}`);
    }
    LoadListOfTenants(); //activation/calling the function
  }
    , []);


  async function handleSubmit(e: React.FormEvent) {  //submit button event
    e.preventDefault(); //prevent default behavior of refreshing and submitting
    setLoading(true);
    setError(null);
    setUser({
      name: userName,
      tenantName: tenantsList.find(item=>item.Id === tenantId)?.Name ?? "",
      TenantId: tenantId,
      IsAdmin: isAdmin
    });  // setting the global state
    console.log(`${userName}  ${loading} ${error} ${tenantId} ${isAdmin}`);// for debugging
    try {
      router.push("/orders"); //open another page
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error occurred");
      }
    }
    setLoading(false);
  }


  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => { // for changes in dropdownlist/selector
    const selected = e.target.value;
    setTenantId(selected);
  }

  return (
    <>
      <FlexCcenter className="h-[100vh] bg-gray-50">
        <Card >

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 h-[320px] w-[350px]">

            <label htmlFor="Tenants"><b>Choose a Tenant:</b></label>
            <select id="Tenants" value={tenantId} onChange={handleSelect} className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500">

              {tenantsList.map((item,index) => (  //auto generate for list of items on the dropdown
                <option key={index} value={item.Id}>{item.Name}</option>
              ))} </select>

            <Input
              name="user"
              type="text"
              placeholder="Username"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            {/* password input but not needed for this project
            <Input
              name="password"
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />*/}

            <p className="mb-[-10]">Admin?: {isAdmin ? "yes" : "no"}</p>  {/* toggle for deciding if account is admin or not */}
            <Toggle checked={isAdmin} onChange={setIsAdmin} />

            <div className="w-auto bg-red-200 flex flex-col mt-3">
              <Button variant="primary">
                {loading ? "Signing In...." : "Login"}
              </Button></div>
          </form>
        </Card>
      </FlexCcenter>
    </>
  );
}
