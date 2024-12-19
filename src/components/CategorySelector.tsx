import React, { useEffect, useState } from "react";
import { Tag, Dropdown, Menu } from "antd";
import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import { Category } from "../types/category.type";

export interface SelectedCategory {
  lv0: string;
  lv1?: string;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategories: SelectedCategory;
  setSelectedCategories: React.Dispatch<React.SetStateAction<SelectedCategory>>;
  onChange?: (value: SelectedCategory) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategories = { lv0: "" },
  setSelectedCategories,
  onChange,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {}, [selectedCategories]);

  const handleSelectParent = (parentName: string) => {
    const updatedCategories =
      selectedCategories.lv0 === parentName
        ? { lv0: "" }
        : { lv0: parentName };
    setSelectedCategories(updatedCategories);
    onChange?.(updatedCategories);
    setDropdownVisible(false);
  };

  const handleSelectChild = (parentName: string, childName: string) => {
    const updatedCategories = {
      lv0: parentName,
      lv1: selectedCategories.lv1 === childName ? undefined : childName,
    };
    setSelectedCategories(updatedCategories);
    onChange?.(updatedCategories);
    setDropdownVisible(false);
  };

  const handleRemove = (parentName: string, childName?: string) => {
    const updatedCategories: SelectedCategory = childName
      ? { lv0: parentName, lv1: undefined }
      : { lv0: "" };
    setSelectedCategories(updatedCategories);
    onChange?.(updatedCategories);
  };

  const renderSubcategoriesMenu = (parentName: string, subcategories: Category[]) => (
    <Menu>
      {subcategories.map((subcategory) => (
        <Menu.Item
          key={`${parentName}-${subcategory.name}`}
          onClick={() => handleSelectChild(parentName, subcategory.name)}
        >
          {subcategory.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const renderParentCategoriesMenu = () => (
    <Menu>
      {categories.map((category) => (
        <Menu.SubMenu
          key={category.name}
          title={category.name}
          popupOffset={[0, 0]}
          onTitleClick={() => handleSelectParent(category.name)}
        >
          {category.subcategories?.length ? (
            renderSubcategoriesMenu(category.name, category.subcategories)
          ) : (
            <Menu.Item
              key={category.name}
              onClick={() => handleSelectParent(category.name)}
            >
              {category.name}
            </Menu.Item>
          )}
        </Menu.SubMenu>
      ))}
    </Menu>
  );

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        {selectedCategories?.lv0 && (
          <span key={selectedCategories.lv0}>
            <Tag
              color="blue"
              closable
              onClose={() => handleRemove(selectedCategories.lv0)}
              closeIcon={<CloseOutlined />}
            >
              {selectedCategories.lv0}
            </Tag>
            {selectedCategories?.lv1 && (
              <Tag
                key={selectedCategories.lv1}
                color="green"
                closable
                onClose={() => handleRemove(selectedCategories.lv0, selectedCategories.lv1)}
                closeIcon={<CloseOutlined />}
                style={{ marginLeft: 4 }}
              >
                {selectedCategories.lv1}
              </Tag>
            )}
          </span>
        )}
      </div>

      <Dropdown
        overlay={renderParentCategoriesMenu()}
        trigger={["click"]}
        open={dropdownVisible}
        onOpenChange={setDropdownVisible}
      >
        <Tag
          style={{
            cursor: "pointer",
            border: "1px dashed gray",
            background: "#fff",
          }}
        >
          Thêm danh mục <DownOutlined />
        </Tag>
      </Dropdown>
    </div>
  );
};

export default CategorySelector;
