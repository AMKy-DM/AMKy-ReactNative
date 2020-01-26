export class TextHelpers {

    private static KiB = 1024;
    private static MiB = TextHelpers.KiB * 1024;
    private static GiB = TextHelpers.MiB * 1024;
    private static TiB = TextHelpers.GiB * 1024;

    private static Minute = 60;
    private static Hours = TextHelpers.Minute * 60;
    private static Days = TextHelpers.Minute * 24;
    private static Weeks = TextHelpers.Days * 7;


    static formatSize(size: number): string {

        if (size < 0) {
            return 'Error';
        }

        if (size < 1000) {
            return size + 'B';
        }

        if (size >= TextHelpers.TiB) {
            return (size / TextHelpers.TiB).toFixed(2) + 'TiB';
        }

        if (size >= TextHelpers.GiB) {
            return (size / TextHelpers.GiB).toFixed(2) + 'GiB';
        }

        if (size >= TextHelpers.MiB) {
            return (size / TextHelpers.MiB).toFixed(2) + 'MiB';
        }

        return (size / TextHelpers.KiB).toFixed(2) + 'KiB';
    }

    static formatTime(seconds: number): string {

        if (seconds < 0) {
            return 'Error';
        }

        if (seconds < TextHelpers.Minute) {
            return seconds + ' Seconds';
        }

        if (seconds >= TextHelpers.Minute) {
            return (seconds / TextHelpers.Minute).toFixed(1) + ' Minutes';
        }

        if (seconds >= TextHelpers.Hours) {
            return (seconds / TextHelpers.Hours).toFixed(1) + ' Hours';
        }

        if (seconds >= TextHelpers.Days) {
            return (seconds / TextHelpers.Days).toFixed(1) + ' Days';
        }

        return (seconds / TextHelpers.Weeks).toFixed(1) + ' Weeks';
    }

}