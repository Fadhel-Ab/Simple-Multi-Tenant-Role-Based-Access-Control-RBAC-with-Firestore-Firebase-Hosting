



First, clone repo, then navigate to the file,install npm, then run the development server:

```bash

git clone <repo-url>

cd multi_tenant_role_based_c

npm install

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The Firebase config is already included in firebaseConfig.ts. You do not need .env.local for this demo.  

<br>
<br>

Firestore Data Structure

Collections:

Tenants

Document ID: auto-generated

Fields:

Name (string) — Tenant name  
  

<br>
 <br>
Orders

Document ID: auto-generated

Fields:

TenantId (string) — References tenant

CustomerName (string)

OrderStatus (string, e.g., "pending", "complete")

createdAt (timestamp)  

<br>
<br>
How you implemented: 
<br>
<br>

Tenant Separation: making sure choosen Tenant ID at login page matches the  Orders tenant ID fetched using a condition

Orders are queried with a filter on TenantId:

const data = collection(db, "Orders");
    const q = query(
      data,
      where("TenantId", "==", user.TenantId),
    );  
  <br>
<br>

Role-Based Permissions

Implemented on the client side: if statements to check the Role of the user before allowing him to perform actions 

 if (user?.IsAdmin !== true) {
      if (selected == "completed") return alert("only admins allowed to do that");
      if (order.status === "completed" || order.status === "In progress") return alert(" you cant change that");
    }
    Admins have full access. Staff is limited.  
  <br>
<br>

Limitations & Improvements:

Add Firebase Authentication for secure user login.

Move role & tenant info to Firestore to enforce rules server-side.

Enhance UI with filtering and pagination.



