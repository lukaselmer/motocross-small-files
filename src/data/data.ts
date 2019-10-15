import { parseISO } from 'date-fns';
import { Unpacked } from '../utils';
import { timeline2019 } from './2019-timeline';

export const timeline = timeline2019.map(entry => ({
  type: entry.type,
  title: entry.title as string,
  desc: entry.desc as string,
  date: parseISO(entry.date),
  link: 'link' in entry ? entry.link : '',
  result: 'result' in entry ? parseResult(entry.result) : ''
}));

function parseResult(result: string) {
  const all = result.split('-').map(str => parseInt(str, 10));
  if (all.length !== 3) throw new Error(`Unexpected result ${result}`);
  const [first, second, overall] = all;
  return { first, second, overall };
}

export const timelineEntryTypes = [
  ...new Set(timeline.map(({ type }) => type))
].sort();

export type TimelineEntry = Unpacked<typeof timeline>;
export type TimelineEntryType = Unpacked<typeof timelineEntryTypes>;
