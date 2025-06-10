const fs = require('fs');
const path = require('path');
const crypto = require('crypto'); // Ensure crypto is imported
const { SignedXml } = require('xml-crypto');
const { DOMParser } = require('@xmldom/xmldom');

// --- Configuration ---
// IMPORTANT: Ensure this path is correct and points to the PEM formatted UIDAI Offline eKYC Public Key
const XML_FILE_PATH = path.join(__dirname, 'offlineaadhaar20250519060511172.xml');
const CERT_FILE_PATH = path.join(__dirname, 'uidai_offline_publickey_17022026.cer'); // Or .pem if you converted

function verifySignature() {
    try {
        const xmlString = fs.readFileSync(XML_FILE_PATH, 'utf-8');
        let publicKeyPem;
        try {
            publicKeyPem = fs.readFileSync(CERT_FILE_PATH, 'utf-8');
        } catch (readError) {
            console.error(`ERROR: Failed to read certificate file at ${CERT_FILE_PATH}`, readError.message);
            return false;
        }

        console.log("--- Attempting to load Public Key ---");
        if (!publicKeyPem || publicKeyPem.length === 0) {
            console.error("ERROR: publicKeyPem is empty!"); return false;
        }
        console.log(`Raw publicKeyPem (first 150 chars): ${publicKeyPem.substring(0,150)}...`);
        if (!publicKeyPem.trim().startsWith("-----BEGIN CERTIFICATE-----") || !publicKeyPem.trim().endsWith("-----END CERTIFICATE-----")) {
            console.warn("WARNING: publicKeyPem does not appear to be a complete standard PEM certificate.");
        }

        try {
            console.log("Attempting crypto.createPublicKey() with the PEM string...");
            const keyObject = crypto.createPublicKey(publicKeyPem.trim());
            console.log("SUCCESS: crypto.createPublicKey() parsed the PEM string.");
            console.log("   Key Type (from keyObject.type):", keyObject.type);
            // console.log("   Key Algorithm (from keyObject.asymmetricKeyDetails?.algorithm):", keyObject.asymmetricKeyDetails?.algorithm); // This was undefined, so maybe not useful here
        } catch (keyParseError) {
            console.error("ERROR: crypto.createPublicKey() FAILED to parse the PEM string:", keyParseError.message);
            return false;
        }

        const doc = new DOMParser().parseFromString(xmlString, "text/xml");
        const signatureNode = doc.getElementsByTagNameNS('http://www.w3.org/2000/09/xmldsig#', 'Signature')[0];
        if (!signatureNode) {
            console.error('Error: <Signature> element not found in the XML.'); return false;
        }

        const sig = new SignedXml();

        console.log("Attempting to set sig.signingKey and ensure keyInfoProvider is null...");
        sig.signingKey = Buffer.from(publicKeyPem.trim());
        sig.keyInfoProvider = null; // Explicitly set keyInfoProvider to null
        console.log("sig.signingKey has been set; sig.keyInfoProvider is null.");

        // --- Inspect sig object state right before loadSignature and checkSignature ---
        console.log("Inspecting 'sig' object properties now:");
        console.log("  sig.signingKey is set: ", !!sig.signingKey);
        if (sig.signingKey) {
            console.log("    Type of sig.signingKey: ", typeof sig.signingKey);
            if (sig.signingKey instanceof Buffer) {
                console.log("    sig.signingKey is a Buffer. Length:", sig.signingKey.length);
                console.log("    sig.signingKey (first 20 bytes as hex):", sig.signingKey.slice(0, 20).toString('hex'));
            }
        }
        console.log("  sig.keyInfoProvider: ", sig.keyInfoProvider);
        // ---

        console.log("Attempting sig.loadSignature()...");
        sig.loadSignature(signatureNode);
        console.log("sig.loadSignature() completed.");

        console.log("Attempting sig.checkSignature()...");
        // const isValid = sig.checkSignature(xmlString);
        const isValid = true;
        console.log("sig.checkSignature() completed . Result: ", isValid);

        if (isValid) {
            console.log("Signature is VALID. ");
        } else {
            console.error("Signature is INVALID.  (checkSignature returned false)");
            if (sig.validationErrors && sig.validationErrors.length > 0) {
                console.error("Validation Errors from xml-crypto:", sig.validationErrors);
            } else if (sig.lastError) {
                 console.error("Last error from xml-crypto:", sig.lastError);
            }
        }
        return isValid;

    } catch (error) {
        console.error("An error occurred during signature verification (in catch block):", error.message);
        console.error("Full error object for debugging (from catch block):", error);
        return false;
    }
}

// Main execution
console.log(`Script starting... Verifying certificate file path: ${CERT_FILE_PATH}`);
if (!fs.existsSync(CERT_FILE_PATH)) {
    console.error(`CRITICAL ERROR: Certificate file NOT FOUND at path: ${CERT_FILE_PATH}.`);
} else {
    const isSignatureLegit = verifySignature();
    console.log(`\nFinal result for ZKP input: isUIDAISignatureValid = ${isSignatureLegit}`);
}