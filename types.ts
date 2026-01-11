export enum Matrix {
  VITALITY = 'VITALITY',
  POWER = 'POWER',
  LAW = 'LAW',
  MASTERY = 'MASTERY',
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  REACTION = 'REACTION',
  MECHANICAL = 'MECHANICAL',
  PROTOCOLS = 'PROTOCOLS',
  OBSERVER = 'OBSERVER',
  MANIFESTO = 'MANIFESTO',
}

export interface ProtocolEntry {
  id: string;
  trigger: string;
  response: string;
  createdAt: number;
}

export interface StatMetric {
  label: string;
  value: string | number;
  matrix: Matrix;
}

export interface ReactionStats {
  average: number;
  best: number;
  total: number;
}