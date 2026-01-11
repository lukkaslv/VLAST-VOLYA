import { ProtocolEntry, ReactionStats } from '../types';

const STORAGE_KEY_PROTOCOLS = 'point_of_assembly_protocols';
const STORAGE_KEY_REACTIONS = 'point_of_assembly_reactions';

// Protocols
export const getProtocols = (): ProtocolEntry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_PROTOCOLS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load protocols', e);
    return [];
  }
};

export const saveProtocol = (protocol: ProtocolEntry) => {
  const current = getProtocols();
  const updated = [protocol, ...current];
  localStorage.setItem(STORAGE_KEY_PROTOCOLS, JSON.stringify(updated));
  return updated;
};

export const deleteProtocol = (id: string) => {
  const current = getProtocols();
  const updated = current.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY_PROTOCOLS, JSON.stringify(updated));
  return updated;
};

// Reactions
export const saveReactionResult = (ms: number) => {
  try {
    const currentData = localStorage.getItem(STORAGE_KEY_REACTIONS);
    const results: number[] = currentData ? JSON.parse(currentData) : [];
    // Keep last 100 results to keep storage clean
    const updated = [ms, ...results].slice(0, 100); 
    localStorage.setItem(STORAGE_KEY_REACTIONS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save reaction', e);
  }
};

export const getReactionStats = (): ReactionStats => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_REACTIONS);
    const results: number[] = data ? JSON.parse(data) : [];
    
    if (results.length === 0) {
      return { average: 0, best: 0, total: 0 };
    }

    const total = results.length;
    const best = Math.min(...results);
    const sum = results.reduce((a, b) => a + b, 0);
    const average = Math.round(sum / total);

    return { average, best, total };
  } catch (e) {
    return { average: 0, best: 0, total: 0 };
  }
};