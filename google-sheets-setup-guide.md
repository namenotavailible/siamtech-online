
# Google Sheets Integration Setup Guide

## Prerequisites
1. Firebase project with Firestore enabled
2. Google Cloud Console access
3. Google Sheets and Google Apps Script access

## Step 1: Create Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your Firebase project (`account-siamtech`)
3. Navigate to "IAM & Admin" > "Service Accounts"
4. Click "Create Service Account"
5. Name it "sheets-sync-service"
6. Grant it "Firestore Service Agent" role
7. Create and download the JSON key file

## Step 2: Enable APIs

1. In Google Cloud Console, go to "APIs & Services" > "Library"
2. Enable these APIs:
   - Cloud Firestore API
   - Google Sheets API

## Step 3: Set up Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Create a new project
3. Copy the code from `google-apps-script/warranty-sync.js`
4. Update the configuration variables with your project details

## Step 4: Configure Service Account Credentials

1. In Apps Script, go to "Project Settings" > "Script Properties"
2. Add a new property:
   - Key: `FIREBASE_SERVICE_ACCOUNT_KEY`
   - Value: Paste the entire JSON content from your downloaded service account key

## Step 5: Create Google Sheet

1. Create a new Google Sheet
2. Open the Apps Script editor for that sheet
3. Run the `initialSetup()` function once

## Step 6: Set up Firestore Security Rules

1. Go to Firebase Console > Firestore > Rules
2. Update with the rules from `firestore-security-rules.txt`
3. Replace the service account email with your actual service account email

## Step 7: Test the Integration

1. Submit a warranty registration through your website
2. Run `manualSync()` in Apps Script to test
3. Check that data appears in your Google Sheet

## Automatic Sync

The script will automatically sync every 5 minutes. You can also:
- Add a "Sync Now" button to your sheet that calls `manualSync()`
- Modify the trigger frequency in `createTimeTrigger()`

## Troubleshooting

- Check Apps Script logs for errors
- Verify service account permissions
- Ensure Firestore rules allow service account access
- Test Firebase authentication in your web app
