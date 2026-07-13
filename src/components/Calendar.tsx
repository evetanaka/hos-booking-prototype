import { useState, useMemo } from 'react';

interface Props {
  selectedDate: Date | null;
  onSelect: (d: Date) => void;
  maxAdvanceDays: number;
}

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

function isSameDay(a: Date, b: Date) {
  return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}

export function Calendar({ selectedDate, onSelect, maxAdvanceDays }: Props) {
  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);
  const maxDate = useMemo(() => { const d = new Date(today); d.setDate(d.getDate() + maxAdvanceDays); return d; }, [today, maxAdvanceDays]);
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  // Simulate some "almost full" days and blackout days
  const almostFullDays = useMemo(() => [5, 12, 19, 26], []);
  const blackoutDays = useMemo(() => [8, 15], []);

  const firstDay = new Date(viewYear, viewMonth, 1);
  const startDow = (firstDay.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const canPrev = viewYear > today.getFullYear() || viewMonth > today.getMonth();
  const canNext = new Date(viewYear, viewMonth + 1, 1) <= maxDate;

  return (
    <div className="calendar">
      <div className="calendar__header">
        <button className="calendar__nav" onClick={prevMonth} disabled={!canPrev} style={{ opacity: canPrev ? 1 : 0.3 }}>
          ‹
        </button>
        <div className="calendar__month">{MONTHS[viewMonth]} {viewYear}</div>
        <button className="calendar__nav" onClick={nextMonth} disabled={!canNext} style={{ opacity: canNext ? 1 : 0.3 }}>
          ›
        </button>
      </div>
      <div className="calendar__grid">
        {DAYS.map(d => <div key={d} className="calendar__dow">{d}</div>)}
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;
          const date = new Date(viewYear, viewMonth, day);
          const isPast = date < today;
          const isBeyond = date > maxDate;
          const isBlackout = blackoutDays.includes(day);
          const isDisabled = isPast || isBeyond || isBlackout;
          const isToday = isSameDay(date, today);
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
          const isAlmost = almostFullDays.includes(day) && !isDisabled;

          let cls = 'calendar__day';
          if (isToday) cls += ' calendar__day--today';
          if (isSelected) cls += ' calendar__day--selected';
          if (isDisabled) cls += ' calendar__day--disabled';
          if (isAlmost && !isSelected) cls += ' calendar__day--almost';

          return (
            <button
              key={day}
              className={cls}
              onClick={() => !isDisabled && onSelect(date)}
              disabled={isDisabled}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
