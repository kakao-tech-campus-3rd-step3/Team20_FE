import { FOOTER_CATEGORIES } from '../model/constants';
import { FOOTER_TITLES } from '../model/messages';

export function FooterContentCategories() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">{FOOTER_TITLES.CATEGORIES}</h3>
      <ul className="space-y-3">
        {FOOTER_CATEGORIES.map((cat) => (
          <li key={cat.label}>
            <a href="#" className="group block">
              <div className="text-gray-300 transition-colors duration-200 hover:text-white">
                <div className="text-sm font-medium transition-transform duration-200 group-hover:translate-x-1">
                  {cat.label}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
