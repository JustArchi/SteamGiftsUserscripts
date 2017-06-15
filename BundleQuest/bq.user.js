// ==UserScript==
// @name         BundleQuest Helper
// @namespace    http://www.bundlequest.com/
// @version      1.1
// @description  Makes your life easier!
// @author       Archi
// @match        https://www.steamgifts.com/giveaways/new
// @grant        none
// @run-at       document-end
// ==/UserScript==

'use strict';

/* Customization */

// Default giveaway time (in milliseconds, time before the giveaways ends, one hour will be added to prevent SG fuckups)
const BQ_TIME = 2 * 24 * 60 * 60 * 1000; // 2 days recommended

/* END */

const GROUP_ID = 702;

function applyDates() {
	let startingDate = new Date();
	let endingDate = new Date(startingDate.getTime() + BQ_TIME + (60 * 60 * 1000)); // Extra 1 hour
	$("input[name='start_time']").val(formatDate(startingDate));
	$("input[name='end_time']").val(formatDate(endingDate));
}

function applyGroup() {
	$("div[data-checkbox-value='groups']").trigger("click");
	let groupButton = $(`div[data-group-id='${GROUP_ID}']`);
	if (!groupButton.hasClass('is-selected')) {
		groupButton.trigger("click");
	}
}

function applyRegionRestrictions() {
	$("div[data-checkbox-value='0']").trigger("click");
}

function formatDate(date) {
	// Fixed by Archi for all SG weird dates, do not touch

	// Fix hours
	let hours = date.getHours();
	let ampm = '';
	if (hours < 12) {
		ampm = 'am';
		if (hours === 0) {
			hours = 12;
		}
	} else {
		ampm = 'pm';
		if (hours !== 12) {
			hours = hours % 12;
		}
	}

	// Fix minutes
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	// Return result
	return `${$.datepicker.formatDate('M d, yy', date)} ${hours}:${minutes} ${ampm}`;
}


$(".form__time-container").children('div').eq(1).after('<div id="dateBtn" class="form__submit-button js__submit-form"><i class="fa fa-arrow-circle-right"></i> BundleQuest!</div>');
$("#dateBtn").css({
	'height': '32px'
});

$("#dateBtn").click(() => {
	applyDates();
	applyRegionRestrictions();
	applyGroup();
});
