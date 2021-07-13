const Date = (date) => {
    const months = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec"
    };
    const dateArr = date.split("-");
    const newDate = `${dateArr[2]} ${months[dateArr[1]]} ${dateArr[0]}`;

    return newDate;
}

export default Date;