import timeline from '../2019-timeline.json';
import { Unpacked } from './utils';

export type TimelineEntry = Unpacked<typeof timeline>;
