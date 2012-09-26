function leadingZero (val) {
            var str = val.toString();
            if(str.length == 1)
            {
                str = '0' + str;
            }
 
            return str;
}

function todaysDate() {
    return this.futureDateDays(0);
}

function tomorrowsDate(){
    return this.futureDateDays(1);
}

function futureDateDays(days) {
    var futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);
    var output = this.leadingZero(futureDate.getDate()) +'/'+ this.leadingZero(futureDate.getMonth() + 1) +'/'+ this.leadingZero(futureDate .getFullYear());
    document.getElementById('dateRes').innerHTML = output; 
    return this.leadingZero(futureDate.getDate()) +'/'+ this.leadingZero(futureDate.getMonth() + 1) +'/'+ this.leadingZero(futureDate .getFullYear());
}