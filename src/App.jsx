import { useState, useEffect } from "react";
import ItemList from "./components/ItemList";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

export default function App() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(API_URI)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);
        setItems(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(`Error fetching items: ${err.message}`);
      });
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URI}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete item");
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Door List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ItemList items={items} onDelete={handleDelete} />
    </div>
  );
}