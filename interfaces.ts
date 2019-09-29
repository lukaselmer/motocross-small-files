import timeline from './2019-timeline.json';
import { Unpacked } from './utils';

export type Timeline = Unpacked<typeof timeline>;
type X = keyof Timeline;

console.log(timeline);
