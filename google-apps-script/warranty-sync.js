
/**
 * Google Apps Script to sync Firestore warranty registrations to Google Sheets
 * 
 * Setup Instructions:
 * 1. Create a new Google Apps Script project at script.google.com
 * 2. Enable Firestore API in Google Cloud Console for your project
 * 3. Create a service account and download the JSON key
 * 4. Add the service account email to your Firestore security rules
 * 5. Update the configuration below with your project details
 * 6. Run setupSheet() once to create headers
 * 7. Set up time-driven triggers for automatic sync
 */

// Configuration - Update these with your Firebase project details
const FIREBASE_PROJECT_ID = 'account-siamtech';
const COLLECTION_NAME = 'warranty_submissions'; // Updated to match the actual collection name
const SHEET_NAME = 'Warranty Submissions';

// Service account credentials (store these in PropertiesService for security)
function getServiceAccountKey() {
  // Store your service account JSON key in Script Properties
  const key = PropertiesService.getScriptProperties().getProperty('FIREBASE_SERVICE_ACCOUNT_KEY');
  return JSON.parse(key);
}

function getAccessToken() {
  const serviceAccount = getServiceAccountKey();
  const jwt = Utilities.computeHmacSha256Signature(
    Utilities.base64Encode(JSON.stringify({
      "alg": "RS256",
      "typ": "JWT"
    })) + "." +
    Utilities.base64Encode(JSON.stringify({
      "iss": serviceAccount.client_email,
      "scope": "https://www.googleapis.com/auth/datastore",
      "aud": "https://oauth2.googleapis.com/token",
      "exp": Math.floor(Date.now() / 1000) + 3600,
      "iat": Math.floor(Date.now() / 1000)
    })),
    serviceAccount.private_key,
    Utilities.Charset.UTF_8
  );
  
  const response = UrlFetchApp.fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    payload: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${Utilities.base64EncodeWebSafe(jwt)}`
  });
  
  return JSON.parse(response.getContentText()).access_token;
}

function fetchFirestoreData() {
  const accessToken = getAccessToken();
  const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/${COLLECTION_NAME}`;
  
  try {
    const response = UrlFetchApp.fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = JSON.parse(response.getContentText());
    return data.documents || [];
  } catch (error) {
    console.error('Error fetching Firestore data:', error);
    throw error;
  }
}

function setupSheet() {
  const sheet = getOrCreateSheet();
  
  // Clear existing content
  sheet.clear();
  
  // Set up headers - Updated to match the actual field names from our web app
  const headers = [
    'ID',
    'User ID',
    'Full Name',
    'Email',
    'Phone Number',
    'Product Name',
    'Order Number',
    'Purchase Date',
    'Source of Purchase',
    'Submitted At',
    'Last Updated'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
}

function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  
  return sheet;
}

function syncWarrantyData() {
  try {
    const documents = fetchFirestoreData();
    const sheet = getOrCreateSheet();
    
    // Clear existing data (keep headers)
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clear();
    }
    
    if (documents.length === 0) {
      console.log('No warranty submissions found');
      return;
    }
    
    const rows = documents.map(doc => {
      const data = doc.fields;
      const docId = doc.name.split('/').pop();
      
      return [
        docId,
        data.user_id?.stringValue || '',
        data.full_name?.stringValue || '',
        data.email?.stringValue || '',
        data.phone_number?.stringValue || '',
        data.product_name?.stringValue || '',
        data.order_number?.stringValue || '',
        data.purchase_date?.stringValue || '',
        data.source_of_purchase?.stringValue || '',
        data.submitted_at?.timestampValue ? new Date(data.submitted_at.timestampValue) : '',
        new Date() // Last updated timestamp
      ];
    });
    
    if (rows.length > 0) {
      sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
      sheet.autoResizeColumns(1, rows[0].length);
    }
    
    console.log(`Successfully synced ${rows.length} warranty submissions`);
    
  } catch (error) {
    console.error('Error syncing warranty data:', error);
    throw error;
  }
}

// Manual sync function that can be called from a button
function manualSync() {
  try {
    syncWarrantyData();
    SpreadsheetApp.getUi().alert('Sync completed successfully!');
  } catch (error) {
    SpreadsheetApp.getUi().alert('Sync failed: ' + error.toString());
  }
}

// Set up automatic sync every 5 minutes
function createTimeTrigger() {
  ScriptApp.newTrigger('syncWarrantyData')
    .timeBased()
    .everyMinutes(5)
    .create();
}

// Delete all existing triggers
function deleteAllTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
}

// One-time setup function
function initialSetup() {
  setupSheet();
  createTimeTrigger();
  console.log('Initial setup completed. Sheet created and trigger set for 5-minute sync.');
}
