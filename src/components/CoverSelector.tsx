interface Props {
  covers: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
}

export function CoverSelector({ covers, onChange, min, max }: Props) {
  return (
    <div className="covers">
      <button
        className="covers__btn"
        onClick={() => onChange(Math.max(min, covers - 1))}
        disabled={covers <= min}
      >
        −
      </button>
      <div>
        <div className="covers__value">{covers}</div>
        <div className="covers__label">{covers > 1 ? 'personnes' : 'personne'}</div>
      </div>
      <button
        className="covers__btn"
        onClick={() => onChange(Math.min(max, covers + 1))}
        disabled={covers >= max}
      >
        +
      </button>
    </div>
  );
}
