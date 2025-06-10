# privacy-preserving-twitter-verification
A proof-of-concept implementation of privacy-preserving social media verification using Zero-Knowledge Proofs.

# Privacy-Preserving Verification on Social Media using Zero-Knowledge Proofs

This repository contains the proof-of-concept implementation for the M.Tech project, "Privacy-Preserving Verification on Twitter Using Zero-Knowledge Proofs." The project proposes a novel framework to restore trust and clarity to social media account verification.

**Author:** Sindhura S  
**Institution:** Indian Institute of Science (IISc), Bangalore

---

### **Abstract**

[cite_start]The proliferation of social media platforms has been accompanied by a significant erosion of trust, largely fueled by the ambiguity of account verification mechanisms. [cite_start]This project addresses the urgent need for a robust and trustworthy system by proposing a differentiated **two-tier verification framework**. [cite_start]This framework separates a basic, subscription-based "Blue Badge" from a high-assurance "Green Badge" that signifies cryptographically verified authenticity using Zero-Knowledge Proofs (ZKPs). [cite_start]As a proof-of-concept, this work develops ZKP circuits to verify entities within the Indian digital identity ecosystem.

---

### **Live Demo**

A functional web-based demonstration of the user-side proof generation process can be accessed here:

**[Link to your live demo hosted on GitHub Pages]**

---

### **Core Concepts**

This project introduces two primary components to solve the current verification problem:

* **The Two-Tier Badge System:**
    * [cite_start]**Blue Badge:** A basic subscription tier that provides access to premium features but does *not* signify rigorous identity verification.
    * [cite_start]**Green Badge:** A high-assurance signal of authenticity awarded only after a user successfully proves their identity through a privacy-preserving ZKP-based protocol.

* **Privacy-Preserving Verification with ZKPs:**
    * [cite_start]The core technical innovation is the use of the **Groth16 zk-SNARK** scheme to allow users to prove claims about their identity without revealing the underlying sensitive data to the social media platform.
    * [cite_start]All sensitive document parsing and proof generation occurs entirely on the client's side.

### **Technical Stack**

* **ZKP Circuits:** [Circom](https://docs.circom.io/)
* **Proving Library:** [snarkjs](https://github.com/iden3/snarkjs)
* **Cryptographic Primitives:** Poseidon Hash, Groth16 on the BN254 curve
* **Demo:** HTML, CSS, JavaScript

### **Verification Flows**

This proof-of-concept implements three distinct verification flows based on India's digital identity infrastructure:

1.  **Individual Verification:**
    * [cite_start]**Required Document:** Aadhaar Paperless Offline eKYC XML file, downloaded from the official UIDAI portal.
    * **Process:** The user provides the XML file and their chosen "share phrase". [cite_start]The client-side logic verifies the UIDAI's digital signature on the XML, then generates a ZKP attesting to key demographic data (e.g., name, date of birth) without revealing the Aadhaar number or other PII to the platform.

2.  **Government Organization Verification:**
    * [cite_start]**Required Documents:** Proof of ownership of a `.gov.in` domain (recognized by the NIC) and a valid Digital Signature Certificate (DSC) from an authorized official.
    * **Process:** An authorized official signs a standardized attestation message with their DSC. The ZKP proves the validity of this signature and links it to the official government domain, asserting the account's authenticity.

3.  **Private Company Verification:**
    * [cite_start]**Required Documents:** The company's Certificate of Incorporation (COI) to source its unique Corporate Identification Number (CIN) and a valid DSC from an authorized signatory.
    * **Process:** Similar to the government flow, an authorized signatory attests to the company's ownership of the social media handle using their DSC. The ZKP verifies this attestation against the company's unique CIN.

### **Repository Structure**

```
├── circuits/             # Contains all the Circom circuit files (.circom)
├── demo-webpage/         # Contains the HTML, CSS, and JS for the live demo
├── scripts/              # Supporting scripts for compiling circuits, generating proofs, etc.
└── README.md             # This file
```

### **Setup and Usage**

1.  **Clone the repository:**
    ```bash
    git clone [Your Repository URL]
    cd [Your Repository Name]
    ```

2.  **Install dependencies** (for circuits and scripts):
    ```bash
    # (Add your specific commands here, e.g., npm install)
    ```

3.  **Run the Demo:**
    * Navigate to the `demo-webpage` directory.
    * Open the `index.html` file in your web browser to interact with the proof-of-concept.

### **Citation**

If you use this work, please cite the full project report:

> S. Sindhura, "Privacy-Preserving Verification on Twitter Using Zero-Knowledge Proofs," M.Tech Project Report, Indian Institute of Science, Bangalore, 2025.
>
> **[Link to your full report PDF]**

### **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.
