  //TODO: change method to accept Locale + add extracting Locale from metadata
  export function FormatAMPM(d: string): string {
    let date = new Date(parseInt(d) / 1000000);
    let day = date.toLocaleDateString("en-US", { weekday: "long" }).slice(0, 3);
    const time = new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return day + " " + time;
  }