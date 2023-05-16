// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Admin.scss";
// import { useQuery } from "@tanstack/react-query";
// import newRequest from "../../utils/newRequest";
// import axios from "axios";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, {useState} from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Admin.scss";
import moment from "moment";

const Admin = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   const [verify, setVerify] = useState(false)

//   const navigate = useNavigate();
//   const { isLoading, error, data } = useQuery({
//     queryKey: ["orders"],
//     queryFn: () =>
//       newRequest.get(`/orders`).then((res) => {
//         return res.data;
//       }),
//   });

//   const handleContact = async (order) => {
//     const sellerId = order.sellerId;
//     const buyerId = order.buyerId;
//     const id = sellerId + buyerId;

//     try {
//       const res = await newRequest.get(`/conversations/single/${id}`);
//       navigate(`/message/${res.data.id}`);
//     } catch (err) {
//       if (err.response.status === 404) {
//         const res = await newRequest.post(`/conversations/`, {
//           to: currentUser.seller ? buyerId : sellerId,
//         });
//         navigate(`/message/${res.data.id}`);
//       }
//     }
//   };

//   const handleAccept = async (order) => {
//     console.log(`Accept order ${order._id}`)
//   }
const [users, setUsers] = useState([])

const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      newRequest.get(`/admin`).then((res) => {
        setUsers(res.data)
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/admin/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleVerification = (id) => {
    mutation.mutate(id);
  };
  return (
    <div className="orders">
      
        <div className="container">
          <div className="title">
            <h1>Users</h1>
          </div>
          <table>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Identity</th>
              <th>Email</th>
              <th>Aadhar number</th>
              <th>Type</th>
              <th>verification</th>
            </tr>
            {users.map((user)=> (
                <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.username}</td>
                    <td><a href={user.idcard}>click to see</a></td>
                    <td>{user.email}</td>
                    <td>{user.aadhar}</td>
                    <td>{user.isAdmin ? 'admin' : user.isSeller ? 'worker' : 'customer'}</td>
                    <td><button onClick={() => handleVerification(user._id)} disabled={user.isVerified}>{user.isVerified ? 'verified': 'pending'}</button></td>
                </tr>
            ))}
              
            
          </table>
        </div>
    </div>
  );
};

export default Admin;
