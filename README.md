# Anonymous Whistleblower Inbox with Rate-Limit Nullifiers

A privacy-preserving reporting platform built on **Midnight Network** for the "Protect That Data" challenge. This application demonstrates zero-knowledge proofs using Midnight's Compact language and MidnightJS SDK for anonymous, rate-limited whistleblowing.


<img width="1448" height="883" alt="1" src="https://github.com/user-attachments/assets/ae125bcd-61af-4f4f-918f-faea7116c359" />

| <img width="1444" height="881" alt="2" src="https://github.com/user-attachments/assets/cd1bca3d-9276-4f51-957f-879abc5a76bc" /> | <img width="1447" height="881" alt="4 1" src="https://github.com/user-attachments/assets/ca33c34a-29eb-475b-bda1-540fbc052473" /> |
| ------------ | ----- |

## 🚀 Features

### Zero-Knowledge Proofs
- **Membership Proofs**: Prove you're part of an organization without revealing identity
- **Rate-Limit Nullifiers (RLN)**: Prevent spam with epoch-based nullifiers
- **Poseidon Hashing**: Efficient ZK-friendly hash function implementation
- **Groth16 Protocol**: Industry-standard SNARK construction

### Privacy & Security
- **End-to-End Encryption**: Web Crypto API (ECDH + AES-GCM)
- **Client-Side Only**: No server, all processing in browser
- **Key Management**: Flexible import/export with password protection
- **Anonymous Submission**: No IP tracking or user identification

### User Experience
- **Modern UI**: Tiptap-inspired design with refined monochrome theme
- **Accessibility**: WCAG 2.1 AA compliant
- **Responsive**: Works on desktop and mobile devices
- **Real-time Feedback**: Visual proof verification indicators
- **Optional Cloud Sync**: Cross-device synchronization via Vercel KV (preserves privacy)

## 🛠️ Technical Architecture

### Smart Contract Integration

The DApp integrates smart contracts through a flexible adapter pattern:

```typescript
// Submit report to smart contract
const contractAdapter = contractManager.getAdapter();
const result = await contractAdapter.submitReport(
  commitment,    // Hash of encrypted data
  nullifier,     // Rate-limit nullifier
  epoch,         // Current epoch
  proof,         // ZK proof
  encryptedData  // Encrypted report content
);

// Returns mock transaction hash
console.log('Transaction:', result.txHash);
```

### Contract Architecture

- **WhistleblowerInbox Contract**: Manages on-chain report anchoring
  - Enforces nullifier uniqueness per epoch (RLN)
  - Emits events for report submission and status updates
  - Stores only commitments and public signals (privacy-preserving)

- **Contract Adapter Pattern**: Two implementations
  - `MockOnChainAdapter`: Simulates contract with IndexedDB persistence
  - `FallbackAdapter`: Direct storage when contract mode disabled

### Midnight Integration

```typescript
// Real MidnightJS proof generation
const proof = await midnightJS.generateProof('membership_rln', {
  merkleRoot: organizationRoot,
  epoch: currentEpoch,
  identitySecret: userSecret,
  merklePath: membershipPath,
  // ... other inputs
});

// Verification with circuit artifacts
const isValid = await midnightJS.verifyProof('membership_rln', proof);
```

### Circuit Structure

The `membership_rln.compact` circuit implements:
- Merkle tree membership verification (depth 20 = 1M members)
- Epoch-based nullifier generation
- Optional message binding for proof-of-statement

### Development Modes

1. **Real Mode** (default): Uses compiled circuit artifacts
   ```bash
   npm run compile-circuits  # Generate artifacts
   npm run dev              # Run with real proofs
   ```

2. **Stub Mode**: Fast development without circuit compilation
   ```bash
   VITE_USE_REAL_MIDNIGHT=false npm run dev
   ```

3. **Smart Contract Mode** (enabled by default): Anchors reports on-chain
   - Automatically enabled on first run
   - Enforces nullifier uniqueness per epoch
   - Generates mock transaction hashes
   - Can be toggled in Settings page
   - To disable via environment: `VITE_USE_CONTRACT=false`

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Garv767/ProofVault.git
cd proofvault

# Install dependencies
npm install

# Compile Midnight circuits
npm run compile-circuits

# Start development server
npm run dev

# Smart Contract Mode is enabled by default
# To disable, go to Settings page or set VITE_USE_CONTRACT=false
```

## 🔧 Circuit Compilation

The project includes a complete circuit compilation pipeline:

```bash
npm run compile-circuits
```

This generates:
- `public/zk-artifacts/membership_rln.proving_key.json` - Proving key for proof generation
- `public/zk-artifacts/membership_rln.verification_key.json` - Verification key
- `public/zk-artifacts/membership_rln.wasm.json` - WASM module for witness calculation
- `public/zk-artifacts/membership_rln.metadata.json` - Circuit metadata

## 📚 Documentation

### API Reference

#### MidnightJS Integration
```typescript
import { midnightJS } from './lib/midnightjs';

// Generate proof
const proof = await midnightJS.generateProof(circuitName, input);

// Verify proof
const isValid = await midnightJS.verifyProof(circuitName, proof);
```

#### Encryption Module
```typescript
import { generateKeyPair, encryptMessage, decryptMessage } from './lib/encryption';

// Generate keys
const keyPair = await generateKeyPair();

// Encrypt/decrypt
const encrypted = await encryptMessage(data, publicKey);
const decrypted = await decryptMessage(encrypted, privateKey);
```

## 🏗️ Project Structure

```
proofvault/
├── circuits/
│   └── membership_rln.compact      # Midnight Compact circuit
├── contracts/
│   └── WhistleblowerInbox.ts      # Smart contract for report anchoring
├── scripts/
│   └── compile-circuits.js         # Circuit compilation script
├── src/
│   ├── lib/
│   │   ├── midnightjs.ts          # MidnightJS integration
│   │   ├── midnight-stub.ts       # SDK interface
│   │   ├── contract-adapter.ts    # Smart contract adapter layer
│   │   ├── sync-provider.ts       # Data sync abstraction
│   │   ├── encryption.ts          # Crypto utilities
│   │   └── zkProof.ts             # ZK proof helpers
│   ├── pages/
│   │   ├── TipsterPage.tsx       # Anonymous reporting UI
│   │   ├── InvestigatorPage.tsx      # Report management UI
│   │   └── SettingsPage.tsx       # Contract & sync configuration
│   └── components/                # UI components
├── public/
│   └── zk-artifacts/              # Compiled circuit artifacts
└── package.json
```

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### Manual Testing
1. Generate moderator keys on the Moderator page
2. Copy the public key
3. Go to Submit Report page
4. Paste the public key and submit a report
5. Return to Moderator page to decrypt and verify

### Proof Verification
Check browser console for MidnightJS logs:
- `[MidnightJS] Loading artifacts...`
- `[MidnightJS] Generating proof...`
- `[MidnightJS] Proof verification result: true`

## 🚢 Deployment

### Basic Deployment (Local Storage Only)

#### Vercel
```bash
vercel deploy
```

#### Netlify
```bash
netlify deploy --prod
```

Both platforms automatically serve the compiled circuit artifacts from `/public/zk-artifacts/`.

### Advanced: Deployment with Optional Cloud Sync

The application supports optional cross-device synchronization using Vercel KV storage while maintaining privacy through encryption and zero-knowledge proofs.

#### 1. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy the application
vercel

# Note your deployment URL (e.g., https://your-app.vercel.app)
```

#### 2. Set up Vercel KV Storage

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to the "Storage" tab
4. Click "Create Database" → Select "KV"
5. Choose a name and region
6. Click "Create"

#### 3. Configure Environment Variables

In your Vercel project settings, add:

```bash
# Required for KV storage
KV_URL=<your-kv-url>
KV_REST_API_URL=<your-kv-rest-api-url>
KV_REST_API_TOKEN=<your-kv-rest-api-token>
KV_REST_API_READ_ONLY_TOKEN=<your-kv-read-only-token>

# Optional: Add API key protection
API_KEY=<your-secret-api-key>
```

#### 4. Enable Sync in the Application

Users can enable cloud sync through the Settings page (`/settings`):

1. Navigate to Settings
2. Toggle "Enable Cloud Sync"
3. **For Vercel deployments**: Leave the URL field empty (it will use the current site automatically)
4. **For local development**: Enter your Vercel deployment URL (e.g., `https://your-app.vercel.app`)
5. Optionally add the API key if configured
6. Click "Save Settings" and "Test Connection"

#### Privacy Note on Cloud Sync

When cloud sync is enabled:
- **Reports remain encrypted** - Only ciphertext is transmitted
- **Zero-knowledge proofs preserve anonymity** - Identity is never revealed
- **Local-first architecture** - Data is always stored locally as backup
- **Graceful fallback** - Automatically uses local storage if sync fails
- **User control** - Sync can be disabled at any time

### Environment Variables Reference

For local development:

```bash
# .env.local
# Smart Contract Mode (enabled by default)
VITE_USE_CONTRACT=true                           # Explicitly enable (default if not set)
# VITE_USE_CONTRACT=false                        # To disable contract mode

# Cloud Sync (optional)
VITE_SYNC_ENABLED=true
VITE_SYNC_BASE_URL=https://your-app.vercel.app  # Only needed for cross-origin sync
VITE_SYNC_API_KEY=your-api-key                   # Optional
```

**Note**: When deployed to Vercel, the app automatically uses same-origin API routes (`/api/reports`). You only need to specify `VITE_SYNC_BASE_URL` when:
- Testing locally against a deployed Vercel instance
- Using a separate backend deployment
- Setting up cross-origin sync between different domains

For Vercel deployment:

```bash
# Vercel Environment Variables
KV_URL=<from-vercel-kv-setup>
KV_REST_API_URL=<from-vercel-kv-setup>
KV_REST_API_TOKEN=<from-vercel-kv-setup>
KV_REST_API_READ_ONLY_TOKEN=<from-vercel-kv-setup>
API_KEY=<optional-api-key>
```

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
