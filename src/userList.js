import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../userService';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await getUsers();
        setUsers(response.data.data);
    };

    const handleDelete = async (nik) => {
        await deleteUser(nik);
        fetchUsers();
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>NIK</th>
                        <th>Nama</th>
                        <th>Alamat</th>
                        <th>Golongan</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.nik}>
                            <td>{user.nik}</td>
                            <td>{user.nama}</td>
                            <td>{user.alamat}</td>
                            <td>{user.golongan}</td>
                            <td>
                                <button onClick={() => handleDelete(user.nik)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
