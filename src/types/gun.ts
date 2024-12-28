export interface Gun {
  id: string;
  name: string;
  brand: string;
  gauge: '12' | '20' | '28' | '.410';
  // Optional attributes
  model?: string;
  barrelLength?: number;
  choke?: 'Cylinder (Cyl)' | 'Skeet (Skt)' | 'Improved Cylinder (IC)' | 'Light Modified (LM)' | 'Modified (Mod)' | 'Improved Modified (IM)' | 'Full (F)' | 'Extra Full (XF/SF)';
  action?: 'Break Action' | 'Semi-Auto' | 'Pump' | 'Bolt Action' | 'Lever Action';
  stock?: 'Standard' | 'Pistol Grip' | 'Adjustable';
  stockMaterial?: 'Wood' | 'Synthetic';
  weight?: number;
  sights?: 'Bead' | 'Ribbed' | 'Red Dot' | 'Scope';
  finish?: 'Blued' | 'Stainless' | 'Camo';
  notes?: string;
  isPrimary?: boolean;
}