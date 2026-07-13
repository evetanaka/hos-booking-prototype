import type { Service } from '../data/venues';

interface Props {
  services: Service[];
  selected: { service: string; time: string } | null;
  onSelect: (s: { service: string; time: string }) => void;
}

// Simulate availability
const SLOT_AVAILABILITY: Record<string, number> = {
  '12:00': 8, '12:15': 6, '12:30': 4, '12:45': 2, '13:00': 3, '13:15': 5, '13:30': 7,
  '19:30': 6, '19:45': 4, '20:00': 1, '20:15': 3, '20:30': 0, '20:45': 5, '21:00': 7, '21:15': 8,
};

export function TimeSlots({ services, selected, onSelect }: Props) {
  return (
    <div className="slots">
      {services.map((service) => (
        <div key={service.id} className="slots__service">
          <div className="slots__service-name">{service.label} · {service.startTime} – {service.endTime}</div>
          <div className="slots__grid">
            {service.slots.map((time) => {
              const remaining = SLOT_AVAILABILITY[time] ?? 5;
              const isFull = remaining === 0;
              const isAlmost = remaining > 0 && remaining <= 2;
              const isSelected = selected?.service === service.id && selected?.time === time;

              let cls = 'slot';
              if (isSelected) cls += ' slot--selected';
              if (isFull) cls += ' slot--disabled';
              if (isAlmost && !isSelected) cls += ' slot--almost';

              return (
                <button
                  key={time}
                  className={cls}
                  onClick={() => !isFull && onSelect({ service: service.id, time })}
                  disabled={isFull}
                >
                  <span>{time}</span>
                  {isFull && <span className="slot__remaining">Complet</span>}
                  {isAlmost && !isSelected && <span className="slot__remaining">{remaining} restant{remaining > 1 ? 's' : ''}</span>}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
