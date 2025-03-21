import Item from "./Item";

const ItemList = ({ items, onDelete }) => {
  return (
    <ul>
      {items.map((item) => (
        <Item key={item.id} item={item} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default ItemList;