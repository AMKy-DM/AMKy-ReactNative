import {RangeModel} from "../models/RangeModel";
import {RangeCollapsedModel} from "../models/RangeCollapsedModel";

export class RangeHelpers {

    static sortAscending(ranges: RangeModel[]): RangeModel[] {
        return ranges.sort((a: RangeModel, b: RangeModel) => {
            if (a.start < b.start) {
                return -1;
            } else if (a.start === b.start) {
                return 0;
            } else {
                return 1;
            }
        });
    }

    static collapse(ranges: RangeModel[], maxLimit: number, isInclusive: boolean): RangeModel[] {

        ranges = RangeHelpers.merge(
            RangeHelpers.sortAscending(ranges)
        );

        return RangeHelpers.collapseUnsafe(ranges, maxLimit, isInclusive);
    }

    static collapseUnsafe(ranges: RangeModel[], maxLimit: number, isInclusive: boolean): RangeCollapsedModel[] {

        const result: RangeCollapsedModel[] = [];

        let left: number = -1;
        let boundary: number;

        for (const range of ranges) {

            boundary = range.start - (isInclusive ? 0 : 1);
            const calculatedLeft = left + (isInclusive ? 0 : 1);

            if (calculatedLeft < boundary) {

                result.push({
                    start: calculatedLeft,
                    end: boundary,
                    isFilled: false,
                });

                result.push({
                    start: range.start,
                    end: range.end,
                    isFilled: true
                });

                left = range.end;

            } else if (calculatedLeft === boundary) {

                result.push({
                    start: range.start,
                    end: range.end,
                    isFilled: true
                });

                left = range.end

            } else {

                if (range.end > calculatedLeft) {

                    result.push({
                        start: calculatedLeft,
                        end: range.end,
                        isFilled: true
                    });

                    left = range.end;

                }
            }
        }

        boundary = maxLimit - (isInclusive ? 0 : 1);

        if (left < boundary) {
            result.push({
                start: left,
                end: boundary,
                isFilled: false
            })
        }

        return result;
    }


    static merge(ranges: RangeModel[]): RangeModel[] {

        ranges = RangeHelpers.sortAscending(ranges);

        return RangeHelpers.mergeUnsafe(ranges);
    }

    static mergeUnsafe(ranges: RangeModel[]): RangeModel[] {

        const result: RangeModel[] = [];

        let prev: RangeModel | null = null;

        for (const range of ranges) {

            if (prev === null) {
                prev = range;
                continue;
            }

            if (prev.end < range.start) {

                result.push(prev);

                prev = range;

            } else if (prev.end - range.start >= -1) {

                prev = {
                    start: prev.start,
                    end: range.end
                };

            } else {

            }
        }

        if (prev !== null) {

            result.push(prev);

        }

        return result;
    }


    static reverse(ranges: RangeModel[]): RangeModel[] {

        return ranges;
    }

}