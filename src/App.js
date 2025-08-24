import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItem={handleToggleItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🎋 Far Away 🌴</h1>;
}

function Form({ onAddItem }) {
  const [description, setDecsription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItem(newItem);

    setDecsription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🌳 trip ?</h3>
      <select
        id="my-selection"
        name="selection-name"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={description}
        onChange={(e) => setDecsription(e.target.value)}
        placeholder="item..."
      />
      <button>ADD</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            detail={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ detail, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        name="checkbox"
        id="checkbox"
        value={detail.packed}
        onChange={() => onToggleItem(detail.id)}
      />
      <span style={detail.packed ? { textDecoration: "line-through" } : {}}>
        {detail.quantity} {detail.description}
      </span>
      <button onClick={() => onDeleteItem(detail.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list! 😊</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const numPercentage =
    numItems === 0 ? 0 : Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {numPercentage === 100
          ? "You got everything! You are ready to go ✈️"
          : `You have ${numItems} items on your list, and you already packed${" "}
        ${numPacked} (${numPercentage}%)`}
      </em>
    </footer>
  );
}
