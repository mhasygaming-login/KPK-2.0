import { Pelaku } from '../types.ts';

/**
 * Calculates Levenshtein distance between two strings with early exit
 */
export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const row = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    let prev = i;
    for (let j = 1; j <= b.length; j++) {
      const val = a[i - 1] === b[j - 1] ? row[j - 1] : Math.min(row[j - 1], prev, row[j]) + 1;
      row[j - 1] = prev;
      prev = val;
    }
    row[b.length] = prev;
  }

  return row[b.length];
}

/**
 * Optimized Fuzzy Match Scoring Algorithm
 * Returns a score >= 0. Higher is better. 0 means no match.
 */
export function calculateFuzzyScore(pattern: string, text: string): number {
  if (!pattern) return 1;
  if (!text) return 0;

  const p = pattern.toLowerCase().trim();
  const t = text.toLowerCase().trim();

  // 1. Exact match
  if (t === p) return 1000;

  // 2. Starts with pattern
  if (t.startsWith(p)) {
    return 700 + Math.round((p.length / t.length) * 100);
  }

  // 3. Word boundary starts with pattern (e.g. "sur" in "Surya Darmadi")
  const words = t.split(/\s+/);
  for (const w of words) {
    if (w === p) return 600;
    if (w.startsWith(p)) {
      return 500 + Math.round((p.length / w.length) * 50);
    }
  }

  // 4. Substring match
  const substrIdx = t.indexOf(p);
  if (substrIdx !== -1) {
    const positionPenalty = Math.min(substrIdx * 5, 100);
    return 400 - positionPenalty + Math.round((p.length / t.length) * 40);
  }

  // 5. Sequential character matching (fuzzy subsequence with distance penalties & bonuses)
  let pIdx = 0;
  let score = 0;
  let consecutiveMatches = 0;
  let prevMatchIdx = -1;

  for (let i = 0; i < t.length && pIdx < p.length; i++) {
    if (t[i] === p[pIdx]) {
      // Base match score
      score += 20;

      // Word boundary bonus
      if (i === 0 || t[i - 1] === ' ' || t[i - 1] === '-' || t[i - 1] === '/') {
        score += 35;
      }

      // Consecutive character bonus
      if (prevMatchIdx === i - 1) {
        consecutiveMatches++;
        score += consecutiveMatches * 15;
      } else {
        consecutiveMatches = 0;
        // Gap penalty
        if (prevMatchIdx !== -1) {
          score -= Math.min((i - prevMatchIdx - 1) * 2, 20);
        }
      }

      prevMatchIdx = i;
      pIdx++;
    }
  }

  // If all characters in pattern were matched in order
  if (pIdx === p.length) {
    return Math.max(score, 100);
  }

  // 6. Typo Tolerance via Levenshtein Distance for words with length >= 3
  if (p.length >= 3) {
    for (const w of words) {
      const maxDistance = p.length >= 6 ? 2 : 1;
      const distance = levenshteinDistance(p, w);
      if (distance <= maxDistance) {
        return Math.max(90 - distance * 30, 30);
      }
    }
  }

  return 0;
}

export interface FuzzySearchResult {
  item: Pelaku;
  score: number;
  matchedFields: string[];
}

/**
 * High-performance real-time fuzzy search for Pelaku List
 * Filters and ranks by relevance across name, status, and metadata
 */
export function searchPelakuFuzzy(
  items: Pelaku[],
  rawQuery: string,
  statusFilter: string = 'all'
): Pelaku[] {
  const query = rawQuery.trim();

  // If query is empty and status is 'all', return all original items
  if (!query && (statusFilter === 'all' || !statusFilter)) {
    return items;
  }

  const queryTokens = query.toLowerCase().split(/\s+/).filter(Boolean);

  const scoredResults: FuzzySearchResult[] = [];

  for (const item of items) {
    // Status filter check first (strict or partial)
    if (statusFilter && statusFilter !== 'all') {
      const itemStatus = item.status_hukum.toLowerCase();
      if (!itemStatus.includes(statusFilter.toLowerCase())) {
        continue;
      }
    }

    // If query is empty but status was filtered, include with default score
    if (queryTokens.length === 0) {
      scoredResults.push({
        item,
        score: 100,
        matchedFields: ['status_hukum']
      });
      continue;
    }

    // Fields to inspect with respective weight multipliers
    const fieldsToInspect = [
      { key: 'nama', value: item.nama, weight: 3.5 },
      { key: 'alias', value: item.alias, weight: 2.8 },
      { key: 'status_hukum', value: item.status_hukum, weight: 3.2 },
      { key: 'instansi', value: item.instansi, weight: 2.0 },
      { key: 'kasus', value: item.kasus, weight: 1.5 },
      { key: 'nominal_formatted', value: item.nominal_formatted, weight: 1.2 }
    ];

    let totalScore = 0;
    const matchedFieldsSet = new Set<string>();
    let allTokensMatched = true;

    // Every token in query must match at least one field
    for (const token of queryTokens) {
      let maxTokenScore = 0;
      let matchedTokenField = '';

      for (const field of fieldsToInspect) {
        const fieldScore = calculateFuzzyScore(token, field.value);
        const weightedScore = fieldScore * field.weight;

        if (weightedScore > maxTokenScore) {
          maxTokenScore = weightedScore;
          matchedTokenField = field.key;
        }
      }

      if (maxTokenScore > 0) {
        totalScore += maxTokenScore;
        if (matchedTokenField) matchedFieldsSet.add(matchedTokenField);
      } else {
        // Token didn't match any field
        allTokensMatched = false;
        break;
      }
    }

    if (allTokensMatched && totalScore > 0) {
      scoredResults.push({
        item,
        score: totalScore,
        matchedFields: Array.from(matchedFieldsSet)
      });
    }
  }

  // Sort by score descending (highest relevance first)
  scoredResults.sort((a, b) => b.score - a.score);

  return scoredResults.map(r => r.item);
}
