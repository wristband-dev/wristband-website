import { useState } from 'react';

export type AccordionItem = {
  id: string;
  title: string;
  icon?: string;
  content: string | string[];
};

type Props = {
  items: AccordionItem[];
  allowMultiple?: boolean;
};

export default function Accordion({ items, allowMultiple = false }: Props) {
  const [open, setOpen] = useState<string[]>(items[0] ? [items[0].id] : []);

  const toggle = (id: string) => {
    setOpen((prev) => {
      const isOpen = prev.includes(id);
      if (allowMultiple) {
        return isOpen ? prev.filter((x) => x !== id) : [...prev, id];
      }
      return isOpen ? [] : [id];
    });
  };

  return (
    <div className="acc">
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        return (
          <div className={`acc-item${isOpen ? ' open' : ''}`} key={item.id}>
            <button
              type="button"
              className="acc-trigger"
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
            >
              <span className="acc-title">
                {item.icon && <img src={item.icon} alt="" width={28} height={28} />}
                {item.title}
              </span>
              <span className="acc-icon" aria-hidden>
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen && (
              <div className="acc-content">
                {Array.isArray(item.content) ? (
                  <ul>
                    {item.content.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{item.content}</p>
                )}
              </div>
            )}
          </div>
        );
      })}
      <style>{`
        .acc {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .acc-item {
          background: #fff;
          border: 1px solid #e8e8ed;
          border-radius: 12px;
          overflow: hidden;
        }
        .acc-trigger {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          background: none;
          border: 0;
          text-align: left;
          font-size: 1.15rem;
          font-weight: 700;
        }
        .acc-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .acc-icon {
          font-size: 1.4rem;
          color: #3635c0;
          line-height: 1;
        }
        .acc-content {
          padding: 0 24px 24px;
          color: #333;
          font-size: 0.98rem;
        }
        .acc-content ul {
          margin: 0;
          padding-left: 1.1em;
          list-style: disc;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .acc-content p {
          margin: 0;
        }
      `}</style>
    </div>
  );
}
