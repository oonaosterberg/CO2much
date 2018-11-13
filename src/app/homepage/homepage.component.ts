import {Component, OnInit} from '@angular/core';
import { Reveal } from 'foundation-sites/js/foundation.reveal';
import { Foundation } from 'foundation-sites/js/foundation.core';

Foundation.addToJquery($);

Foundation.plugin(Reveal, 'Reveal');

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

 percents = 0;
    progress = 0;
    time: any;
    hours: any;
    day: any;
    month: any;
    year: any;
    ddmmyy: any;

    previousDate: any;
    previousMonth: any;
    previousYear: any;
    currentDate: any;
    currentMonth: any;
    currentYear: any;
    daysInMonth: any;
    monthPercents = 0;
    barHeight: any;

    progresstext = 'Your daily progress:';

    hideThis: any;
    daysCompleted: any;
    daysInaRow: any;
    lastCompletedDay: any;
    clicks = 0;

    dmy: any;


    constructor() {

    }


    // get the information of progress made in a month

   getMonthProgress() {

        const getDaysInMonth = function (month, year) {
            return new Date(year, month, 0).getDate();
        };

        console.log(getDaysInMonth(this.currentMonth, this.currentYear));
        this.daysInMonth = getDaysInMonth(this.currentMonth, this.currentYear);

        if (localStorage.monthprogress) {
            localStorage.monthprogress = Number(localStorage.monthprogress) + 1;
        } else {
            localStorage.monthprogress = 1;
        }

        this.monthPercents = localStorage.monthprogress / this.daysInMonth * 100;
        console.log(this.monthPercents);

        this.barHeight = this.monthPercents.toString();

        $('#' + this.currentMonth).css('height', this.barHeight + '%');
        localStorage.setItem(this.currentMonth.toString(), this.barHeight);

        this.getMonthBars();

    }

    // build the bars to show the progress

    getMonthBars() {

        console.log(this.previousMonth);
        console.log(this.currentMonth);

        $('#1').css('height', localStorage.getItem('1') + '%');
        $('#2').css('height', localStorage.getItem('2') + '%');
        $('#3').css('height', localStorage.getItem('3') + '%');
        $('#4').css('height', localStorage.getItem('4') + '%');
        $('#5').css('height', localStorage.getItem('5') + '%');
        $('#6').css('height', localStorage.getItem('6') + '%');
        $('#7').css('height', localStorage.getItem('7') + '%');
        $('#8').css('height', localStorage.getItem('8') + '%');
        $('#9').css('height', localStorage.getItem('9') + '%');
        $('#10').css('height', localStorage.getItem('10') + '%');
        $('#11').css('height', localStorage.getItem('11') + '%');
        $('#12').css('height', localStorage.getItem('12') + '%');

        if (this.currentMonth > this.previousMonth) {
            localStorage.removeItem('monthprogress');
        }

        if (this.currentYear > this.previousYear) {
            localStorage.removeItem('monthprogress');
            localStorage.removeItem('1');
            localStorage.removeItem('2');
            localStorage.removeItem('3');
            localStorage.removeItem('4');
            localStorage.removeItem('5');
            localStorage.removeItem('6');
            localStorage.removeItem('7');
            localStorage.removeItem('8');
            localStorage.removeItem('9');
            localStorage.removeItem('10');
            localStorage.removeItem('11');
            localStorage.removeItem('12');

        }


    }


    // count how many times in a day task-buttons are clicked and show the stats when it gets to five

    counter() {

        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount) + 1;
        } else {
            localStorage.clickcount = 1;
        }
        if (localStorage.clickcount === '5') {
       
          this.getMonthProgress();
            const date = new Date();
            this.day = date.getDate();
            localStorage.setItem('dayCompleted', this.day);

            if (localStorage.daycount) {
                localStorage.daycount = Number(localStorage.daycount) + 1;
            } else {
                localStorage.daycount = 1;

                const firstdate = new Date();
                this.day = firstdate.getDate();

                if (this.month !== 12) {
                    this.month = firstdate.getMonth() + 1;
                } else {
                    this.month = 1;
                }

                this.year = firstdate.getFullYear();
                this.ddmmyy = this.day + '.' + this.month + '.' + this.year;
                localStorage.setItem('firstday', this.ddmmyy);
            }

            if (localStorage.daysinarow) {
                localStorage.daysinarow = Number(localStorage.daysinarow) + 1;
            } else {
                localStorage.daysinarow = 1;
            }
        }

        if (localStorage.clickcount <= 5) {
            this.hideButtons(event);
        }

        localStorage.setItem('clicks', localStorage.clickcount);
        localStorage.setItem('days', localStorage.daycount);
        localStorage.setItem('daysPlus', localStorage.daysinarow);
    }

    hideButtons(event) {

        this.hideThis = event.target.id;
        console.log(event.target.id);

        // $('#' + this.hideThis).hide(500);
        localStorage.setItem(this.hideThis, 'hidden');
    }


    getHiddenButtons() {

        console.log(localStorage.getItem(this.hideThis));

        if (localStorage.getItem('task1') === 'hidden') {
            $('#task1').hide(500);
        }

        if (localStorage.getItem('task2') === 'hidden') {
            $('#task2').hide(500);
        }

        if (localStorage.getItem('task3') === 'hidden') {
            $('#task3').hide(500);
        }

        if (localStorage.getItem('task4') === 'hidden') {
            $('#task4').hide(500);
        }

        if (localStorage.getItem('task5') === 'hidden') {
            $('#task5').hide(500);
        }

        if (localStorage.getItem('task6') === 'hidden') {
            $('#task6').hide(500);
        }
        if (localStorage.getItem('task7') === 'hidden') {
            $('#task7').hide(500);
        }

        if (localStorage.getItem('task8') === 'hidden') {
            $('#task8').hide(500);
        }

        if (localStorage.getItem('task9') === 'hidden') {
            $('#task9').hide(500);
        }

        if (localStorage.getItem('task10') === 'hidden') {
            $('#task10').hide(500);
        }

        if (localStorage.getItem('task11') === 'hidden') {
            $('#task11').hide(500);
        }

        if (localStorage.getItem('task12') === 'hidden') {
            $('#task12').hide(500);
        }
        if (localStorage.getItem('task13') === 'hidden') {
            $('#task13').hide(500);
        }

    }



    // store progress to localStorage

    doTask(event) {
    
        console.log(event);
        this.counter();

        const date = new Date();
        this.day = date.getDate();

        if (this.month !== 12) {
            this.month = date.getMonth() + 1;
        } else {
            this.month = 1;
        }

        this.year = date.getFullYear();

        localStorage.setItem('prevday', this.day);
        localStorage.setItem('prevmonth', this.month);
        localStorage.setItem('prevyear', this.year);

        this.progress = this.percents + 20;

        if (localStorage.value) {
            if (localStorage.value < 100) {
                localStorage.value = Number(localStorage.value) + this.progress;
            } else {
                localStorage.value = 100;
            }
        } else {
            localStorage.value = 20;
        }

        localStorage.setItem('progress', localStorage.value);
        //console.log(localStorage.getItem('progress'));

        setTimeout(() => {
            this.getProgress();
        }, 100);

        //console.log(localStorage.getItem('prevday'));
    }


    // get progress from localStorage and show it in progress bar

    getProgress() {

        this.getToday();

        $('#winButton').hide();
        this.getHiddenButtons();

        if (localStorage.getItem('progress') === null) {
            $('#circle').find('.circle-graph-percents-number').html(0 + '%');
            $('#circle').find('.circle-graph-progress-fill').css('transform', 'rotate(' + 0 + 'deg)');

        } else {

            // console.log(localStorage.getItem('progress'));
            // $('#circle').attr('data-percent', localStorage.getItem('progress'));

            setTimeout(() => {

                $('[data-circle-graph]').each(function () {
                    const $graph = $(this),
                        percent = parseInt(localStorage.getItem('progress'), 10),
                        deg = 360 * percent / 100;
                    // console.log($('#circle'));
                    if (percent > 50) {
                        $graph.addClass('gt-50');
                    }
                    $graph.find('.circle-graph-progress-fill').css('transform', 'rotate(' + deg + 'deg)');
                    $graph.find('.circle-graph-percents-number').html(percent + '%');
                    // console.log($graph.find('.circle-graph-progress-fill'));
                });

            }, 500);

            if (localStorage.getItem('progress') === '100') {
                this.progresstext = 'Good job!';
                $('#winButton').show();
            }

        }
    }

    // get the stats of this year

    getToday() {

        this.dmy = localStorage.getItem('firstday');

        this.daysCompleted = localStorage.getItem('days');

        this.lastCompletedDay = localStorage.getItem('dayCompleted');

        //console.log(this.lastCompletedDay);

        this.previousDate = localStorage.getItem('prevday');
        this.previousMonth = localStorage.getItem('prevmonth');
        this.previousYear = localStorage.getItem('prevyear');
        //console.log(this.previousDate);

        const date = new Date();
        this.currentDate = date.getDate();

        if (this.currentMonth !== 12) {
            this.currentMonth = date.getMonth() + 1;
        } else {
            this.currentMonth = 1;
        }

        this.currentYear = date.getFullYear();

        /* const getDaysInMonth = function (month, year) {
            return new Date(year, month, 0).getDate();
        };

        console.log(this.currentMonth);
        console.log(getDaysInMonth(this.currentMonth, this.currentYear)); */


        //  console.log(this.currentDate);
        //console.log(this.currentDate);

        // when the year changes, empty the localStorage

        if (this.currentDate > this.previousDate || this.currentMonth > this.previousMonth || this.currentYear > this.previousYear) {
            localStorage.removeItem('progress');
            localStorage.removeItem('value');
            localStorage.removeItem('clickcount');

            localStorage.removeItem('task1');
            localStorage.removeItem('task2');
            localStorage.removeItem('task3');
            localStorage.removeItem('task4');
            localStorage.removeItem('task5');
            localStorage.removeItem('task6');
            localStorage.removeItem('task7');
            localStorage.removeItem('task8');
            localStorage.removeItem('task9');
            localStorage.removeItem('task10');
            localStorage.removeItem('task11');
            localStorage.removeItem('task12');
            localStorage.removeItem('task13');

        }

        if (this.lastCompletedDay === this.currentDate.toString() || this.lastCompletedDay === (this.currentDate - 1).toString()) {
            this.daysInaRow = localStorage.getItem('daysPlus');
        } else {
            localStorage.removeItem('daysinarow');
            this.daysInaRow = 0;
        }

    }


    ngOnInit() {

      // localStorage.clear();
        $('#winModal').foundation();
        $('#settings-modal').foundation();

        this.getProgress();
        this.getMonthBars();

    }
}
