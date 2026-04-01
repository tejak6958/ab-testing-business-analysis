// =======================================
// Ticket Automation using Google Apps Script
// =======================================
// Description:
// Automates ticket creation from Google Sheets data
// Includes validation checks and duplicate handling
// =======================================

function createTickets() {
  var sheetNames = ['Sheet1', 'Sheet2']; // Generic sheet names

  for (var k = 0; k < sheetNames.length; k++) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetNames[k]);
    var data = sheet.getDataRange().getValues();
    var headers = data[0];

    var statusCol = headers.indexOf('Status');
    var validationCol = headers.indexOf('Validation');

    // Validation check
    for (var i = 1; i < data.length; i++) {
      if (data[i][validationCol] === false) {
        Logger.log("Validation failed. Stopping execution.");
        return;
      }
    }

    // Process rows
    for (var i = 1; i < data.length; i++) {
      var status = data[i][statusCol];

      if (status === "") {
        var subject = data[i][headers.indexOf('subject')];

        // Simulated API payload
        var payload = {
          "subject": subject,
          "description": "Automated ticket creation"
        };

        // Simulated API call (no real endpoint)
        Logger.log("Ticket created for: " + subject);

        sheet.getRange(i + 1, statusCol + 1).setValue('Done');
      }
    }
  }
}
