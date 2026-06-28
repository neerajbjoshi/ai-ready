import React, { useState, useEffect, useRef } from 'react';
import { searchCities } from '../api';
import { CityResult } from '../types';

interface Props {
  onSelect: (city: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSelect, loading }: Props) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CityResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const results = await searchCities(query);
        setSuggestions(results);
        setShowDropdown(true);
      } catch {
        setSuggestions([]);
      }
    }, 400);
  }, [query]);

  const handleSelect = (city: CityResult) => {
    const label = city.state
      ? `${city.name}, ${city.state}, ${city.country}`
      : `${city.name}, ${city.country}`;
    setQuery(label);
    setShowDropdown(false);
    onSelect(city.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      onSelect(query.trim());
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for any city..."
          className="search-input"
          onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          disabled={loading}
        />
        <button type="submit" className="search-btn" disabled={loading || !query.trim()}>
          {loading ? '...' : '🔍'}
        </button>
      </form>
      {showDropdown && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((city, i) => (
            <li key={i} onMouseDown={() => handleSelect(city)} className="suggestion-item">
              <span className="city-name">{city.name}</span>
              <span className="city-meta">
                {city.state ? `${city.state}, ` : ''}{city.country}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
