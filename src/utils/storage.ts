export interface UserUsage {
  analysesCount: number;
  lastAnalysisDate: string;
  hasPaid: boolean;
}

export const getUserUsage = (): UserUsage => {
  if (typeof window === 'undefined') {
    return { analysesCount: 0, lastAnalysisDate: '', hasPaid: false };
  }
  
  const stored = localStorage.getItem('reality-check-usage');
  if (stored) {
    return JSON.parse(stored);
  }
  
  return { analysesCount: 0, lastAnalysisDate: '', hasPaid: false };
};

export const incrementUsage = (): void => {
  if (typeof window === 'undefined') return;
  
  const current = getUserUsage();
  const updated = {
    ...current,
    analysesCount: current.analysesCount + 1,
    lastAnalysisDate: new Date().toISOString(),
  };
  
  localStorage.setItem('reality-check-usage', JSON.stringify(updated));
};

export const unlockPremium = (): void => {
  if (typeof window === 'undefined') return;
  
  const current = getUserUsage();
  const updated = {
    ...current,
    hasPaid: true,
  };
  
  localStorage.setItem('reality-check-usage', JSON.stringify(updated));
};

export const canAnalyze = (): boolean => {
  const usage = getUserUsage();
  return usage.hasPaid || usage.analysesCount === 0;
};
