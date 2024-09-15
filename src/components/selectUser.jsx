import React, {useEffect, useState} from "react";

function SelectUser({ onUserSelect}) {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState('')

    useEffect(() => {
        const fetchUsers = async() => {
            try {
                const response = await fetch('http://localhost:8080/users');
                if (response.ok) {
                    const userData = await response.json();
                    setUsers(userData)
                } else {
                    console.error('Failed to fetch users')
                }
            } catch (error) {
                console.error('Error:', error)
                }
        }
        fetchUsers()
    }, []);

    const handleUserChange = (user) => {
        setUser(user.target.value);

        if(onUserSelect) {
            onUserSelect(user.target.value)
        }
    }

    return (
        <div>
            <h3>Select a User</h3>
            <select value={user} onChange={handleUserChange}>
                <option value="">-- Select a User --</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.username}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectUser;
