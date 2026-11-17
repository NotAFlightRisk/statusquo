import { describe, expect, it } from 'vitest';
import { splitFeedItems } from '../src/lib/server/adapters/feed';

const item = (title: string, body: string) => ({
  id: title,
  title,
  body,
  at: '2026-11-01T10:00:00Z'
});

describe('splitFeedItems', () => {
  it('never grades an incident as operational', () => {
    const { incidents } = splitFeedItems([
      item('Server Not Available Error', '[Resolved] The connectivity issue is resolved'),
      item('Cloud API Fails', 'Status: Resolved. Everything is back to normal')
    ]);
    expect(incidents.map((incident) => incident.level)).toEqual(['unknown', 'unknown']);
  });

  it('still reads the severity when the feed gives one', () => {
    const { incidents } = splitFeedItems([
      item('API down', '[Resolved] We fixed it'),
      item('Resolved: Heroku Service Degradation', 'Incident resolved.')
    ]);
    expect(incidents.map((incident) => incident.level)).toEqual(['major', 'degraded']);
  });
});
