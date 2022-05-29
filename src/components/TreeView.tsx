export interface TreeItem {
  name: string;
  subordinates?: Array<TreeItem>;
}

export interface TreeViewProps {
  items: Array<TreeItem>;
}

function TreeView({ items, ...props }: TreeViewProps) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={`list-${index}`}>
          {item.name}
          {(item.subordinates || []).length > 0 && (
            <TreeView items={item.subordinates || []} {...props} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default TreeView;
