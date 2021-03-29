import {atom} from 'recoil';

export const globalTotalPoints = atom<number>({
    key: 'globalTotalPoints', // unique ID (with respect to other atoms/selectors)
    default: 0, // default value (aka initial value)
});