function datetime()
{
    const dt= new Date();

    const date=("0" + dt.getDate()).slice(-2);

    const month = ("0" + (dt.getMonth() + 1)).slice(-2);

    const year = dt.getFullYear();

    const hours = dt.getHours();

    const Minutes = dt.getMinutes();

    const output = year + "년" + month + "월" + date + "일" + hours + "시" + Minutes + "분";
    return output; 
}
module.exports={datetime};