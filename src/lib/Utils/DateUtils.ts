import dayjs from 'dayjs';
// import dayjsParser from 'dayjs/plugin/customParseFormat';
// @ts-ignore
// import jalali from 'jalali-dayjs';

// dayjs.extend(jalali);
// dayjs.extend(dayjsParser);

const DateUtils = {
	secondsToTime(sec: number) {
		if (!sec) return '00:00';

		const remainingSeconds = sec % 3600;

		const hours = Math.floor(sec / 3600);
		const minutes = Math.floor(remainingSeconds / 60);
		const seconds = Math.floor(remainingSeconds % 60);

		const h = String(hours).padStart(2, '0');
		const m = String(minutes).padStart(2, '0');
		const s = String(seconds).padStart(2, '0');

		return hours > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
	},

	convertDate(dateString: string, targetFormat: string = 'MMM D YYYY, HH:mm:ss') {
		const date = dayjs(dateString).format(targetFormat);
		return date;
	},

	diff(date1: string, date2: string) {
		const d1 = dayjs(date1);
		const d2 = dayjs(date2);

		if (d1.isBefore(d2)) {
			return 0;
		}

		return Math.abs(d1.diff(d2, 's')); // absolute difference in seconds
	},

	getElapsedTime(startDate: Date) {
		const now = new Date();
		const elapsed = parseInt(((now.getTime() - startDate.getTime()) / 1000).toFixed(0), 10);

		return elapsed;
	},
};

export default DateUtils;
