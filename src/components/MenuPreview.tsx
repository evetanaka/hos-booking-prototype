import type { MenuCategory } from '../data/venues';

interface Props { menu: MenuCategory[]; }

export function MenuPreview({ menu }: Props) {
  return (
    <div className="menu-preview fade-in">
      {menu.map((cat) => (
        <div key={cat.name} className="menu-category">
          <div className="menu-category__title">{cat.name}</div>
          {cat.items.map((item) => (
            <div key={item.name} className="menu-item">
              <div>
                <div className="menu-item__name">{item.name}</div>
                <div className="menu-item__desc">{item.description}</div>
              </div>
              <div className="menu-item__price">{item.price}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
