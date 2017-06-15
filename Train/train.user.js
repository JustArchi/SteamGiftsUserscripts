// ==UserScript==
// @name         ArchiTrain
// @namespace    ArchiTrain
// @version      0.2
// @description  Makes your life easier!
// @author       Archi
// @match        https://www.steamgifts.com/giveaways/new
// @grant        none
// @run-at       document-end
// ==/UserScript==

'use strict';

/* Customization */

// Default giveaway time (in milliseconds, time before the giveaways ends, one hour will be added to prevent SG fuckups)
const TRAIN_TIME = 1 * 24 * 60 * 60 * 1000; // 1 day recommended

/* END */

function applyDates() {
	let startingDate = new Date();
	let endingDate = new Date(startingDate.getTime() + TRAIN_TIME + (60 * 60 * 1000)); // Extra 1 hour
	$("input[name='start_time']").val(formatDate(startingDate));
	$("input[name='end_time']").val(formatDate(endingDate));
}

function applyDescription() {
	let descarea = $("textarea[name='description']");
	let description = '### **[Next]()**\n';
	let newDesc = description + descarea.val().replace(description, "");
	descarea.val(newDesc);
}

function applyGroup() {
	$("div[data-checkbox-value='invite_only']").trigger("click");
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


$(".form__time-container").children('div').eq(1).after('<div id="trainBtn" class="form__submit-button js__submit-form"><i class="fa fa-arrow-circle-right"></i> Train!</div>');
$("#trainBtn").css({
	'height': '32px'
});

$("#trainBtn").click(() => {
	applyDates();
	applyDescription();
	applyRegionRestrictions();
	applyGroup();
});
