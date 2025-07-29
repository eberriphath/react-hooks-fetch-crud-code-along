import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // Fetch items on mount
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then(setItems)
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  // Add new item to state
  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  // Update an existing item in state
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
  }

  // Remove deleted item from state
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      {/* Pass onAddItem prop to ItemForm */}
      <ItemForm onAddItem={handleAddItem} />

      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <ul className="Items">
        {itemsToDisplay.map((item) => (
          // Pass onUpdateItem and onDeleteItem props to Item
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
