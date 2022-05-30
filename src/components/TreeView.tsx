import Button from "./Button";
import "./TreeView.css";

export interface TreeItem {
  name: string;
  subordinates?: Array<TreeItem>;
}

export interface TreeViewProps {
  items: Array<TreeItem>;
  onItemEdit?: Function;
  onItemDelete?: (item: any, index: number) => void;
}

function TreeView({
  items,
  onItemDelete,
  onItemEdit,
  ...props
}: TreeViewProps) {
  return (
    <ul className="tree-view">
      {items.map((item, index) => (
        <li key={`list-${index}`} className="node">
          <div>
            <span className="label">{item.name}</span>
            <div className="actions">
              <Button
                label="Edit"
                variant="warning"
                onClick={() => (onItemEdit ? onItemEdit(item, index) : null)}
              />
              <Button
                label="Delete"
                variant="danger"
                onClick={() =>
                  onItemDelete ? onItemDelete(item, index) : null
                }
              />
            </div>
          </div>
          {(item.subordinates || []).length > 0 && (
            <TreeView
              items={item.subordinates || []}
              onItemDelete={onItemDelete}
              onItemEdit={onItemEdit}
              {...props}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default TreeView;
