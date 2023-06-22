/* eslint-env browser */
/* eslint
   semi: ["error", "always"],
   indent: [2, "tab"],
   no-tabs: 0,
   no-multiple-empty-lines: ["error", {"max": 2, "maxEOF": 1}],
   one-var: ["error", "always"] */
/* global REDIPS */

/* enable strict mode */
'use strict';

// create redips container
let redips = {};


// redips initialization
redips.init = function () {
	// reference to the REDIPS.drag library and message line
	
	let	rd = REDIPS.drag,
		msg = document.getElementById('message'),
		clonedDIV = false;	// cloned flag set in event.moved
		
	// how to display disabled elements
	rd.style.borderDisabled = 'solid';	// border style for disabled element will not be changed (default is dotted)
	rd.style.opacityDisabled = 60;		// disabled elements will have opacity effect
	REDIPS.drag.dropMode = 'switch';
	// initialization
	rd.init();
	// only "smile" can be placed to the marked cell
	rd.mark.exception.d8 = 'smile';
	// prepare handlers
	rd.event.clicked = function () {
		msg.innerHTML = 'Clicked';
	};
	rd.event.dblClicked = function () {
		msg.innerHTML = 'Dblclicked';
	};
	rd.event.moved = function () {
		msg.innerHTML = 'Moved';
	};
	rd.event.notMoved = function () {
		msg.innerHTML = 'Not moved';
	};
	rd.event.dropped = function () {
		msg.innerHTML = 'Dropped';
	};
	rd.event.switched = function () {
		msg.innerHTML = 'Switched';
	};
	rd.event.clonedEnd1 = function () {
		msg.innerHTML = 'Cloned end1';
	};
	rd.event.clonedEnd2 = function () {
		msg.innerHTML = 'Cloned end2';
	};
	rd.event.notCloned = function () {
		msg.innerHTML = 'Not cloned';
	};
	rd.event.deleted = function (cloned) {
		// if cloned element is directly moved to the trash
		if (cloned) {
			// set id of original element (read from redips property)
			// var id_original = rd.obj.redips.id_original;
			msg.innerHTML = 'Deleted (c)';
		}
		else {
			msg.innerHTML = 'Deleted';
		}
	};
	rd.event.undeleted = function () {
		msg.innerHTML = 'Undeleted';
	};
	rd.event.cloned = function () {
		// display message
		msg.innerHTML = 'Cloned';
		// append 'd' to the element text (Clone -> Cloned)
		rd.obj.innerHTML += 'd';
	};
	rd.event.changed = function () {
		// get target and source position (method returns positions as array)
		let pos = rd.getPosition();
		// display current row and current cell
		msg.innerHTML = 'Changed: ' + pos[1] + ' ' + pos[2];
	};

	rd.event.droppedBefore = function (targetCell) {
		// test if target cell is occupied and set reference to the dragged DIV element
		let empty = rd.emptyCell(targetCell, 'test');
		// if target cell is not empty
		if (!empty) {
			// open dialog should be wrapped in setTimeout because of
			// removeChild and return false below
			setTimeout(function () {
				$('#dialog').dialog('open');
			}, 50);
			// remove dragged DIV from from DOM (node still exists in memory)
			rd.obj.parentNode.removeChild(rd.obj);
			// this will disable DIV elements in target cell (DIV element will be somehow marked)
			rd.enableDrag(false, targetCell);
			// return false (deleted DIV will not be returned to source cell)
			return false;
		}
	};

	$('#dialog').dialog({
		autoOpen: false,
		resizable: false,
		modal: true,
		width: 400,
		height: 170,
		// define Shift, Switch and Overwrite buttons
		buttons: {
			'Switch': function () {
				// enable elements in target cell (return solid border) in both cases
				rd.enableDrag(true, rd.td.target);
				// switch elements only if current DIV element is not cloned
				if (!clonedDIV) {
					// relocate target and source cells
					rd.relocate(rd.td.target, rd.td.source);
					// append previously removed DIV to the target cell
					rd.td.target.appendChild(rd.obj);
				}
				// close dialog
				$(this).dialog('close');
			},
			'Overwrite': function () {
				// empty target cell
				rd.emptyCell(rd.td.target);
				// append previously removed DIV to the target cell
				rd.td.target.appendChild(rd.obj);
				// close dialog
				$(this).dialog('close');
			}
		},
		// action when dialog is closed
		close: function (event, ui) {
			// return dragged DIV element to the source cell only if X button is clicked
			// (in this case event.which property exists)
			if (event.which) {
				// enable elements in target cell (return solid border)
				rd.enableDrag(true, rd.td.target);
				// if and DIV element is not cloned then return in to source cell
				if (!clonedDIV) {
					// append previously removed DIV to the target cell
					rd.td.source.appendChild(rd.obj);
				}
			}
		}
	});
};


// toggles trash_ask parameter defined at the top
redips.toggleConfirm = function (chk) {
	if (chk.checked === true) {
		REDIPS.drag.trash.question = 'Are you sure you want to delete DIV element?';
	}
	else {
		REDIPS.drag.trash.question = null;
	}
};


// toggles delete_cloned parameter defined at the top
redips.toggleDeleteCloned = function (chk) {
	REDIPS.drag.clone.drop = !chk.checked;
};


// enables / disables dragging
redips.toggleDragging = function (chk) {
	REDIPS.drag.enableDrag(chk.checked);
};


// function sets drop_option parameter defined at the top
redips.setMode = function (radioButton) {
	REDIPS.drag.dropMode = radioButton.value;
};


// show prepared content for saving
redips.save = function (type) {
	// define tableContent variable
	let tableContent;
	// prepare table content of first table in JSON format or as plain query string (depends on value of "type" variable)
	tableContent = REDIPS.drag.saveContent('table1', type);
	// if content doesn't exist
	if (!tableContent) {
		alert('Table is empty!');
	}
	// display query string
	else if (type === 'json') {
		// window.open('/my/multiple-parameters-json.php?p=' + tableContent, 'Mypop', 'width=350,height=260,scrollbars=yes');
		window.open('multiple-parameters-json.php?p=' + tableContent, 'Mypop', 'width=360,height=260,scrollbars=yes');
	}
	else {
		// window.open('/my/multiple-parameters.php?' + tableContent, 'Mypop', 'width=350,height=160,scrollbars=yes');
		window.open('multiple-parameters.php?' + tableContent, 'Mypop', 'width=360,height=260,scrollbars=yes');
	}
};


// add onload event listener
if (window.addEventListener) {
	window.addEventListener('load', redips.init, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', redips.init);
}
