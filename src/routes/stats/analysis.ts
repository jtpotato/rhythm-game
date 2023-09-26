import { ScaleTypes, type LineChartOptions, ChartTheme } from "@carbon/charts-svelte";

class Analysis {
    gameLength: number;
    clickTimes: number[];

    constructor(gameLength: number, clickTimes: number[]) {
        this.gameLength = gameLength;
        // remove first [0] item
        clickTimes.shift();
        this.clickTimes = clickTimes;
    }

    getDeltas() {
        const deltas = [];
        for (let i = 0; i < this.clickTimes.length - 1; i++) {
            deltas.push(this.clickTimes[i + 1] - this.clickTimes[i]);
        }

        // Convert to line chart form
        const data = []

        for (let i = 0; i < deltas.length; i++) {
            data.push({
                group: "Time Between Taps",
                x: i,
                y: deltas[i]
            });
            data.push({
                group: "Beat",
                x: i,
                y: this.getProperDelta()
            })
        }

        // Generate Chart Options
        const options: LineChartOptions = {
            title: "Time Between Taps",
            axes: {
                bottom: {
                    title: "Tap #",
                    mapsTo: "x",
                    scaleType: ScaleTypes.LINEAR,

                },
                left: {
                    title: "Time (ms)",
                    mapsTo: "y",
                    scaleType: ScaleTypes.LINEAR,
                    includeZero: false
                }
            },
            theme: ChartTheme.G100
        }

        return {
            deltas: deltas,
            data: data,
            options: options
        };
    }

    getTotalGameTime() {
        return this.clickTimes[this.clickTimes.length - 1] - this.clickTimes[0];
    }

    getBpm() {
        // diff between first and last clickTime is total length of time.
        const totalTime = this.getTotalGameTime()

        // gameLength taps in totalTime ms
        const bpm = (60000 / totalTime) * (this.gameLength - 1);

        return bpm
    }

    getProperDelta() {
        const bpm = this.getBpm();
        const properDelta = 60000 / bpm;

        return properDelta;
    }

    getAverageError() {
        const deltas = this.getDeltas().deltas;
        const properDelta = this.getProperDelta();

        let sum = 0;
        for (let i = 0; i < deltas.length; i++) {
            sum += Math.abs(deltas[i] - properDelta);
        }

        return sum / deltas.length;
    }

    getAverageErrorPercentage() {
        const deltas = this.getDeltas().deltas;
        const properDelta = this.getProperDelta();

        let sum = 0;
        for (let i = 0; i < deltas.length; i++) {
            sum += Math.abs(deltas[i] - properDelta) / properDelta;
        }

        return sum / deltas.length;
    }
}

export default Analysis;