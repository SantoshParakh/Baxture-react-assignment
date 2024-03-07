'use client'
import { useState, useEffect } from "react";
import { Card, Text, Avatar } from "@mantine/core";
import { IconAt, IconPhoneCall, IconWorldWww, IconUserPlus,IconUserMinus, IconTrash,IconStar } from '@tabler/icons-react';

interface User {
  name: string;
  email: string;
  phone: string;
  website: string;
}

interface UserCardProps {
  user: User;
  onDelete: (name: string) => void;
}

const getRandomColor = () => {
  const colors = ["red", "purple", "blue", "orange"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  const [followed, setFollowed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(getRandomColor());
  const [starredUsers, setStarredUsers] = useState<string[]>([]);

  const isStarred = starredUsers.includes(user.name);

  const handleFollow = () => {
    if (isStarred) {
      setStarredUsers(starredUsers.filter((name) => name !== user.name)); 
    } else {
      setStarredUsers([...starredUsers, user.name]); 
    }
  };

  const fullName = `${user.name}`;
  const names = fullName.split(" ");
  const initials =
    names.length === 1
      ? names[0][0]
      : `${names[0][0]}${names[names.length - 1][0]}`;

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Card
      radius="lg"
      shadow="xl"
      padding="lg"
      withBorder
      style={{ marginBottom: 30, width: 350, height: 425,  }}
    >
      <div>{hovered && <div style={{position:"absolute", display:"flex",justifyContent:"center",alignItems:"center", height:50, width:"50%", backgroundColor:"black", color:"white", borderRadius:10}}><Text>{user.name}</Text></div>}</div>
      <div style={{display:"flex", justifyContent:"center",alignItems:"center", flexDirection:"column"}}>
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: '150px',
            height: '150px',
            borderRadius: '100%',
            fontSize: 80,
            backgroundColor: backgroundColor,
            color: "#fff",
            border: "none",
            cursor: "pointer",
            marginBottom: 10
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {initials}
        </button>
        <Text style={{display:"flex",justifyContent:"center",alignItems:"center", fontSize:25, fontWeight:'bold'}} size="lg">{user.name}{isStarred && <IconStar />}</Text>
      </div> 
      <div style={{ display: "flex", alignItems: "center",padding:5 }}>
        <IconAt /> <span style={{padding:2}}> <Text><a href="#" target="_blank"style={{textDecoration:"none", color:"black", }}>{user.email}</a></Text></span>
      </div>
      <div style={{ display: "flex", alignItems: "center",padding:5 }}>
        <IconPhoneCall /> <span style={{padding:2}}><Text><a href="#" target="_blank" style={{textDecoration:"none", color:"black", }}>{user.phone}</a></Text></span>
      </div>
      <div style={{ display: "flex", alignItems: "center", padding:5 }}>
        <IconWorldWww /> <span style={{padding:2}}><Text><a href="#" target="_blank"style={{textDecoration:"none", color:"black", }}>{user.website}</a></Text></span>
      </div>
      <div style={{ fontWeight: 30,padding: 10, display:"flex", alignItems:"center", justifyContent:"space-evenly", height:"100vh", marginBottom:10}}>
        <button onClick={handleFollow} style={{ cursor: "pointer", width:"150px", padding:5, backgroundColor:"#3d46c3", color:"#fff" , borderRadius:10}}>
          <span>{isStarred ? <IconUserMinus/>: <IconUserPlus/>}</span>
          <span style={{margin:10}}>{isStarred ? "Unfollow" : "Follow"}</span>
        </button>
        <button style={{ cursor: "pointer",width:"150px", margin:5,padding:5,borderRadius:10,  }} onClick={() => onDelete(user.name)}><span style={{margin:10,padding:5, color:"#3d46c3", borderColor:"#3d46c3"}}><IconTrash /> Delete</span></button>
      </div>
    </Card>
  );
};

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = (name: string) => {
    const updatedUsers = users.filter(user => user.name !== name);
    setUsers(updatedUsers);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 15, margin: 20, }}>
      {users.map((user, index) => (
        <UserCard key={index} user={user} onDelete={handleDelete} />
      ))}
    </div>
  );
}

