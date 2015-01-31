

//bdlist = bdlist.sort('mm', { order: "asc" }).sort('dd', { order: "asc" });

// listObj.filter(function(item) {
//    if (item.values().id > 1) {
//        return true;
//    } else {
//        return false;
//    }
// }); // Only items with id > 1 are shown in list

// listObj.filter(); 

window.onload = function(){
   init();
};
 
// The "onload" handler. Run after the page is fully loaded.
function init() {
   // Attach "onsubmit" handler
   document.getElementById("submit").onclick = function(){
      createBD(
         document.getElementById("firstname"),
         document.getElementById("lastname"),
         document.getElementById("month"),
         document.getElementById("date"),
         document.getElementById("year")
      );
   };
   // Attach "onclick" handler to "reset" button
   document.getElementById("reset").onclick = function(){
      clearDisplay();
   };
   // Set initial focus
   document.getElementById("firstname").focus();
}
 
/* The "onsubmit" handler to validate the input fields.
 * Most of the input validation functions take 2 arguments:
 * inputId or inputName: the "id" of the <input> element to be validated
 *   or "name" for checkboxes and radio buttons.
 * errorMsg: the error message to be displayed if validation fails.
 *   The message shall be displayed on an element with id of
 *   inputID+"Error" if it exists; otherwise via an alert().
 */

//Form validation
function validateForm() {
   return (isNotEmpty("lastname", "Please enter the last name!")
   		&& isNotEmpty("firstname", "Please enter the first name!")
        && isNumeric("month", "Please enter a valid month")
        && isNumeric("date", "Please enter a valid month")
        && isNumeric("year", "Please enter a valid month")
        && isLengthMinMax("month", "Please enter a two-digit month!", 2, 2)
        && isLengthMinMax("date", "Please enter a two-digit date!", 2, 2)
        && isLengthMinMax("year", "Please enter a four-digit year!", 4, 4));
}
 
// Return true if the input value is not empty
function isNotEmpty(inputId, errorMsg) {
   var inputElement = document.getElementById(inputId);
   var errorElement = document.getElementById(inputId + "Error");
   var inputValue = inputElement.value.trim();
   var isValid = (inputValue.length !== 0);  // boolean
   showMessage(isValid, inputElement, errorMsg, errorElement);
   return isValid;
}
 
/* If "isValid" is false, print the errorMsg; else, reset to normal display.
 * The errorMsg shall be displayed on errorElement if it exists;
 *   otherwise via an alert().
 */
function showMessage(isValid, inputElement, errorMsg, errorElement) {
   if (!isValid) {
      // Put up error message on errorElement or via alert()
      if (errorElement !== null) {
         errorElement.innerHTML = errorMsg;
      } else {
         alert(errorMsg);
      }
      // Change "class" of inputElement, so that CSS displays differently
      if (inputElement !== null) {
         inputElement.className = "error";
         inputElement.focus();
      }
   } else {
      // Reset to normal display
      if (errorElement !== null) {
         errorElement.innerHTML = "";
      }
      if (inputElement !== null) {
         inputElement.className = "";
      }
   }
}
 
// Return true if the input value contains only digits (at least one)
function isNumeric(inputId, errorMsg) {
   var inputElement = document.getElementById(inputId);
   var errorElement = document.getElementById(inputId + "Error");
   var inputValue = inputElement.value.trim();
   var isValid = (inputValue.search(/^[0-9]+$/) !== -1);
   showMessage(isValid, inputElement, errorMsg, errorElement);
   return isValid;
}
 
// Return true if the input value contains only letters (at least one)
function isAlphabetic(inputId, errorMsg) {
   var inputElement = document.getElementById(inputId);
   var errorElement = document.getElementById(inputId + "Error");
   var inputValue = inputElement.value.trim();
   var isValid = inputValue.match(/^[a-zA-Z]+$/);
   showMessage(isValid, inputElement, errorMsg, errorElement);
   return isValid;
}
 
// Return true if the input value contains only digits and letters (at least one)
function isAlphanumeric(inputId, errorMsg) {
   var inputElement = document.getElementById(inputId);
   var errorElement = document.getElementById(inputId + "Error");
   var inputValue = inputElement.value.trim();
   var isValid = inputValue.match(/^[0-9a-zA-Z]+$/);
   showMessage(isValid, inputElement, errorMsg, errorElement);
   return isValid;
}
 
// Return true if the input length is between minLength and maxLength
function isLengthMinMax(inputId, errorMsg, minLength, maxLength) {
   var inputElement = document.getElementById(inputId);
   var errorElement = document.getElementById(inputId + "Error");
   var inputValue = inputElement.value.trim();
   var isValid = (inputValue.length >= minLength) && (inputValue.length <= maxLength);
   showMessage(isValid, inputElement, errorMsg, errorElement);
   return isValid;
}

 
// The "onclick" handler for the "reset" button to clear the display
function clearDisplay() {
   var elms = document.getElementsByTagName("*");  // all tags
   for (var i = 0; i < elms.length; i++) {
      if ((elms[i].id).match(/Error$/)) {  // no endsWith() in JS?
         elms[i].innerHTML = "";
      }
      if (elms[i].className === "error") {  // assume only one class
         elms[i].className = "";
      }
   }
   // Set initial focus
   document.getElementById("firstname").focus();
}



// var options = {
// valueNames: [ "First Name",  "Last Name", "Month", "Date", "Year"]};

var values = [];
//var bdlist = new List('users', options, values);


function createBD(fname, lname, mm, dd, yyyy){
   // if (mm.length != 2 || date.length != 2 || yyyy.length != 4) {
   //    console.log("the input should be in correct form!");
   //    return false;
   // }
   validateForm();
   values.push({fn: fname, ln: lname, m: mm, d: dd, y: yyyy});
   updateTable();
}

function updateTable(){
   var scope = this;
   

}

//Table Sorting
function SortableTableCtrl() {
    var scope = this;
    scope.body = values;
    // data
    scope.head = {
        fn: "First Name",
        ln: "Last Name",
        m: "Month",
        d: "Date",
        y: "Year"
    };
    
    scope.sort = {
        column: 'b',
        descending: false
    };

    scope.selectedCls = function(column) {
        return column == scope.sort.column && 'sort-' + scope.sort.descending;
    };
    
    scope.changeSorting = function(column) {
        var sort = scope.sort;
        if (sort.column == column) {
            sort.descending = !sort.descending;
        } else {
            sort.column = column;
            sort.descending = false;
        }
    };
}

