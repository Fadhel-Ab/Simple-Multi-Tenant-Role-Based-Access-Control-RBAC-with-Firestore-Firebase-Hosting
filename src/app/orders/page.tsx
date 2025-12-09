"use client";
import { useEffect } from "react";
import { useAppContext } from "../components/UI components/contextTemplate";
import Link from 'next/link';
import AddOrderPopup from "../components/UI components/AddOrderPopup";
import { useState } from "react";
import { collection, orderBy, onSnapshot, query, where, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Timestamp } from "firebase/firestore";
import Button from "../components/UI components/button";


type Order = {
  id: string;
  clientName: string;
  status: string;
  TenantId: string;
  time: Date | null; // JS Date
};
export default function Orders() {

  const { user } = useAppContext();
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState<string>();


  async function LoadOrders() {
    if (!user?.TenantId) return;
    const data = collection(db, "Orders");
    const q = query(
      data,
      where("TenantId", "==", user.TenantId),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const refined: Order[] = snapshot.docs.map(doc => {
        const data = doc.data();

        return {
          id: doc.id,
          clientName: data.CustomerName,
          status: data.OrderStatus,
          TenantId: data.TenantId,
          time: data.createdAt ? data.createdAt.toDate() : null, // firestore have some delay related to timestamp 
        };
      });

      const filtered = refined.filter((o): o is Order & { time: Date } => o.time !== null); // this needed for timestamp/on snapshot method to handle | null
      const sorted = filtered.sort((a, b) => a.time.getTime() - b.time.getTime()); //sorting fetched list based  on time
      setOrders(sorted);
    });
    return () => unsubscribe();
  }

  useEffect(() => {   //apply fetching/function on page load/mount using empty dependency[]
    LoadOrders(); //activation/calling the function
  }, []);


  async function updateOrderStatus(e: React.ChangeEvent<HTMLSelectElement>, id: string) {
    if (!user) return;
    const selected = e.target.value;
    const order = orders.find(o => o.id === id);
    if (!order) return
    if (user?.IsAdmin !== true) {
      if (selected == "completed") return alert("only admins allowed to do that");
      if (order.status === "completed" || order.status === "In progress") return alert(" you cant change that");
    }
    console.log("selected Work?", selected);

    try {
      await updateDoc((doc(db, "Orders", id)),
        { OrderStatus: selected, }
      );
      console.log("Order updated successfully!");

    } catch (error) {
      console.log(error);
      console.log("Error Updating", error);

    }
  }



  async function handleDelete(id: string) {
    if (user?.IsAdmin !== true) return alert("only admins allowed to do that");
    try {
      await deleteDoc(doc(db, "Orders", id));
      setOrders(prev => prev.filter(f => f.id !== id))
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <>
      <div className="p-6 text-2xl flex justify-between bg-gray-100 mb-[12vh]">
        <div>
          <h1>Welcome <span className="text-green-700 font-bold">{user && (user?.IsAdmin == true ?
            "Admin"
            : "Staff")
          } </span> <span className="text-blue-600 text-3xl"> &ensp; {user?.name} </span></h1>
        </div>
        <span className="text-green-700 font-bold text-4xl ml-[-100px]">{user?.tenantName ?? "Not logged In"}</span>
        <div>
          <Link href="/" className="text-red-400 font-semibold">
            logout
          </Link>
        </div>
      </div>
      <div className=" border-b-2 border-blue-300 pb-3 flex justify-between px-5">
        <p className="text-7xl">Orders</p>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add New Order
        </button>
      </div>
      <div className="grid grid-cols-5 gap-4 border-b-2 border-gray-300 pb-2 font-semibold bg-gray-100 px-35 text-[30px] place-items-center ">
        <div>Tenant ID</div>
        <div>Client Name</div>
        <div>Status</div>
        <div>Time</div>
      </div>
      {orders.map((order) => (
        <div
          key={order.id}
          className="grid grid-cols-5 gap-4 border-b border-gray-200 py-2 place-items-center px-35"
        >
          <div>{order.TenantId}</div>
          <div>{order.clientName}</div>
          <div>
            <select
              value={order.status}
              onChange={e => updateOrderStatus(e, order.id)}
              className="border p-2 rounded-lg">
              <option value="pending">Pending</option>
              <option value="In progress">In progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>{order.time ? order.time.toLocaleDateString("en-US", {
            hour: '2-digit',
            minute: '2-digit',
            year: "numeric",
            month: "short",
            day: "2-digit"
          })
            : "pending..."
          }</div>
          <Button variant="delete" onClick={() => handleDelete(order.id)}>
            <p>delete</p>
          </Button>
        </div>
      ))}

      <div className="p-6">
        <AddOrderPopup isOpen={open} onClose={() => setOpen(false)} reLoad={() => LoadOrders} />
      </div>


    </>
  );
}
