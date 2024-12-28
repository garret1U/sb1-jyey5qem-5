import { useState } from 'react';
import type { Gun } from '../types/gun';

export function useGuns() {
  const [guns, setGuns] = useState<Gun[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addGun = (gun: Omit<Gun, 'id'>) => {
    const newGun = { ...gun, id: crypto.randomUUID() };
    if (newGun.isPrimary) {
      // Remove primary status from other guns
      setGuns(guns.map(g => ({ ...g, isPrimary: false })));
    }
    setGuns([...guns, newGun as Gun]);
  };

  const updateGun = (updatedGun: Gun) => {
    if (updatedGun.isPrimary) {
      // Remove primary status from other guns
      setGuns(guns.map(g => 
        g.id === updatedGun.id ? updatedGun : { ...g, isPrimary: false }
      ));
    } else {
      setGuns(guns.map(g => 
        g.id === updatedGun.id ? updatedGun : g
      ));
    }
  };

  const deleteGun = (gunId: string) => {
    setGuns(guns.filter(gun => gun.id !== gunId));
  };

  const togglePrimary = (gunId: string) => {
    setGuns(guns.map(gun => ({
      ...gun,
      isPrimary: gun.id === gunId ? !gun.isPrimary : false
    })));
  };

  return {
    guns,
    isLoading,
    error,
    addGun,
    updateGun,
    deleteGun,
    togglePrimary
  };
}