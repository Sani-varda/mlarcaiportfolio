const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const HOST = 'www.portfolio.mlarcai.com';
const URLS = [
  `https://${HOST}/`,
];

// 1. Setup IndexNow Key
const INDEXNOW_KEY = '52ebf3a8b44a49c2a0db10b43f9a7c36';
const INDEXNOW_KEY_FILE = `${INDEXNOW_KEY}.txt`;
const publicDir = path.join(__dirname, '../public');
const keyFilePath = path.join(publicDir, INDEXNOW_KEY_FILE);

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write the IndexNow key file
fs.writeFileSync(keyFilePath, INDEXNOW_KEY, 'utf8');
console.log(`[IndexNow] Key file written to: public/${INDEXNOW_KEY_FILE}`);

// Helper to make HTTPS POST requests
function postRequest(url, headers = {}, body) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    
    // Set content length if body is a string
    const requestBody = typeof body === 'string' ? body : JSON.stringify(body);
    const contentLen = Buffer.byteLength(requestBody);

    const options = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'POST',
      headers: {
        'Content-Type': typeof body === 'string' ? 'application/x-www-form-urlencoded' : 'application/json',
        'Content-Length': contentLen,
        ...headers,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data,
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(requestBody);
    req.end();
  });
}

// 2. Submit to IndexNow (Bing, Yandex, etc.)
async function submitIndexNow() {
  console.log('\n[IndexNow] Initiating submission to IndexNow (Bing/Yandex)...');
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY_FILE}`,
    urlList: URLS,
  };

  try {
    const response = await postRequest('https://api.indexnow.org/IndexNow', { Accept: 'application/json' }, payload);
    if (response.statusCode === 200 || response.statusCode === 202) {
      console.log(`[IndexNow] Submission successful! Status: ${response.statusCode} - ${response.data || 'Accepted'}`);
    } else {
      console.error(`[IndexNow] Submission failed with status: ${response.statusCode}`);
      console.error(`Response details: ${response.data}`);
    }
  } catch (err) {
    console.error('[IndexNow] Request failed:', err.message);
  }
}

// 3. Submit to Google Indexing API (using service account JWT)
async function submitGoogle() {
  console.log('\n[Google Indexing API] Checking for service account key...');
  const keyPath = path.join(__dirname, '../service_account.json');
  
  if (!fs.existsSync(keyPath)) {
    console.log('[Google Indexing API] service_account.json not found in root. Skipping.');
    console.log('To enable Google Indexing API submissions:');
    console.log('1. Go to Google Cloud Console and create a project.');
    console.log('2. Enable the Indexing API.');
    console.log('3. Create a Service Account, generate a JSON key, and save it as "service_account.json" in your project root.');
    console.log('4. Add the service account email (e.g. indexer@project.iam.gserviceaccount.com) as an Owner of the property in Google Search Console.');
    return;
  }

  try {
    const keyFileContent = fs.readFileSync(keyPath, 'utf8');
    const credentials = JSON.parse(keyFileContent);
    
    console.log('[Google Indexing API] Generating JWT assertion...');
    const now = Math.floor(Date.now() / 1000);
    
    const header = {
      alg: 'RS256',
      typ: 'JWT',
    };
    
    const claimSet = {
      iss: credentials.client_email,
      scope: 'https://www.googleapis.com/auth/indexing',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };
    
    const base64Encode = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
    const signatureInput = `${base64Encode(header)}.${base64Encode(claimSet)}`;
    
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(signatureInput);
    const signature = signer.sign(credentials.private_key, 'base64url');
    
    const jwt = `${signatureInput}.${signature}`;
    
    console.log('[Google Indexing API] Requesting OAuth2 access token...');
    
    const tokenResponse = await postRequest(
      'https://oauth2.googleapis.com/token',
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`
    );
    
    let tokenData;
    try {
      tokenData = JSON.parse(tokenResponse.data);
    } catch (e) {
      console.error('[Google Indexing API] Failed to parse token response:', tokenResponse.data);
      return;
    }
    
    if (!tokenData.access_token) {
      console.error('[Google Indexing API] Access token not returned:', tokenData);
      return;
    }

    const accessToken = tokenData.access_token;
    console.log('[Google Indexing API] Access token acquired successfully. Publishing URLs...');

    for (const url of URLS) {
      console.log(`[Google Indexing API] Notifying update for: ${url}`);
      const apiResponse = await postRequest(
        'https://indexing.googleapis.com/v3/urlNotifications:publish',
        {
          Authorization: `Bearer ${accessToken}`,
        },
        {
          url: url,
          type: 'URL_UPDATED',
        }
      );
      
      if (apiResponse.statusCode === 200) {
        console.log(`[Google Indexing API] Notification sent for: ${url} (Status 200)`);
      } else {
        console.error(`[Google Indexing API] Failed to notify for: ${url} (Status ${apiResponse.statusCode})`);
        console.error(`Response details: ${apiResponse.data}`);
      }
    }
  } catch (err) {
    console.error('[Google Indexing API] Request failed:', err);
  }
}

async function main() {
  await submitIndexNow();
  await submitGoogle();
  console.log('\n[Indexing Utility] Finished processing submissions.');
}

main();
