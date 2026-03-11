# ProofVault – Abhinandan's Guide
### Phases 2 & 4 — Wallet Connect + IPFS Storage

> **First:** Complete `SETUP.md` before starting anything here.

---

## Your deliverables

By the end of your phases, the team needs from you:
1. A working **Connect Wallet button** (MetaMask / Polygon Amoy) visible in the navbar
2. A `src/lib/ipfs.ts` utility that uploads content to IPFS via Pinata and returns a CID
3. Your Pinata JWT added to `.env` and shared with Raushan for Vercel config

---

## Phase 2 – Wallet Connect with RainbowKit

### Step 2.1 – Install the libraries

From the project root:

```bash
npm install @rainbow-me/rainbowkit wagmi viem @tanstack/react-query
```

This installs everything needed for wallet connection.

---

### Step 2.2 – Configure RainbowKit in `main.tsx`

Open `src/main.tsx`. It currently renders the React app. You need to wrap it with RainbowKit and Wagmi providers.

Paste your current `src/main.tsx` content into Claude with this prompt:

> "Wrap my React app with RainbowKit configured for Polygon Amoy testnet (chainId 80002, RPC https://rpc-amoy.polygon.technology). Use `@rainbow-me/rainbowkit`, `wagmi`, and `@tanstack/react-query`. Import `polygonAmoy` from `wagmi/chains`. Show me the complete updated `main.tsx`."

Replace the entire `src/main.tsx` with Claude's output.

> 📌 **Tip:** `polygonAmoy` is already built into wagmi — you just import it. No manual config needed.

---

### Step 2.3 – Add RainbowKit CSS import

At the top of `src/main.tsx` (or `src/index.css`), make sure this import exists:

```typescript
import '@rainbow-me/rainbowkit/styles.css';
```

If Claude didn't include it, add it manually as the very first import in `main.tsx`.

---

### Step 2.4 – Add Connect Button to the navbar

Open `src/App.tsx`. Find the navbar section (look for `<nav>` or a header element).

Paste the navbar code into Claude with this prompt:

> "Add the RainbowKit `<ConnectButton />` to the top right of this navbar. Import it from `@rainbow-me/rainbowkit`. Keep everything else the same."

Replace just the navbar portion of `App.tsx` with Claude's output.

---

### Step 2.5 – Test wallet connection

```bash
npm run dev
```

1. Open http://localhost:5173
2. Click **Connect Wallet** in the top right
3. MetaMask should pop up
4. Connect and confirm you are on **Polygon Amoy** (Chain ID 80002)

If MetaMask doesn't appear, check that your `main.tsx` has the providers wrapping `<App />` correctly. Paste any errors to Claude with: `"Fix this RainbowKit error: [paste error]"`.

---

### Step 2.6 – Expose the connected address for other components

Other components (dashboards, tip submission) need the wallet address. Make sure this hook is available for teammates to use:

```typescript
// Any component can use this to get the wallet address:
import { useAccount } from 'wagmi'

const { address, isConnected } = useAccount()
```

You don't need to write a file for this — just let the team know this is how they access the wallet.

---

## Phase 4 – IPFS Storage with Pinata

### Step 4.1 – Sign up for Pinata

1. Go to https://pinata.cloud and create a free account
2. Go to **API Keys** → **New Key**
3. Enable **pinFileToIPFS** and **pinJSONToIPFS**
4. Copy the **JWT** (the long token starting with `eyJ...`)

---

### Step 4.2 – Add JWT to `.env`

Open your `.env` file and add:

```env
VITE_PINATA_JWT=your_jwt_token_here
```

---

### Step 4.3 – Install Pinata SDK

```bash
npm install pinata
```

---

### Step 4.4 – Create the IPFS utility

Ask Claude:

> "Write a TypeScript file `src/lib/ipfs.ts` with:
> 1. A function `uploadToIPFS(content: string): Promise<string>` that uploads a JSON string to IPFS using the Pinata SDK and returns the CID hash.
> 2. A function `fetchFromIPFS(cid: string): Promise<string>` that fetches content from `https://gateway.pinata.cloud/ipfs/{cid}` and returns it as a string.
> 3. Use `import.meta.env.VITE_PINATA_JWT` for the JWT.
> Use the latest Pinata SDK (v1). Show me complete TypeScript with proper types and error handling."

Save the output as `src/lib/ipfs.ts`.

---

### Step 4.5 – Test IPFS upload

To quickly verify it works, add a temporary test button somewhere in the UI (e.g., in `SettingsPage.tsx`):

```typescript
import { uploadToIPFS } from '../lib/ipfs'

// Inside a component:
const handleTest = async () => {
  const cid = await uploadToIPFS(JSON.stringify({ test: "hello proofvault", timestamp: Date.now() }))
  console.log("Uploaded! CID:", cid)
  alert("Success! CID: " + cid)
}
```

Run the app, click the button, and check the console. If you see a CID (a long hash starting with `Qm` or `bafy`), it's working.

Remove the test button after confirming it works.

---

### Step 4.6 – Tell teammates it's ready

Post in the team chat that `uploadToIPFS` and `fetchFromIPFS` are available in `src/lib/ipfs.ts`. Garv and Shahvez both need this.

Usage for teammates:

```typescript
import { uploadToIPFS, fetchFromIPFS } from '../lib/ipfs'

// Upload a tip:
const cid = await uploadToIPFS(JSON.stringify({ tipContent, timestamp }))

// Retrieve a tip:
const content = await fetchFromIPFS(cid)
```

---

### Step 4.7 – Push your branch

```bash
git add .
git commit -m "feat: add RainbowKit wallet connect and Pinata IPFS utility"
git push origin feature/wallet-ipfs
```

Open a Pull Request on GitHub into `main` and tag Garv.

---

## Checklist

- [ ] RainbowKit installed and configured for Polygon Amoy
- [ ] `main.tsx` wraps the app with all required providers
- [ ] Connect Wallet button visible in navbar
- [ ] MetaMask connects successfully to Polygon Amoy (Chain ID 80002)
- [ ] Pinata account created and JWT in `.env`
- [ ] `src/lib/ipfs.ts` created with `uploadToIPFS` and `fetchFromIPFS`
- [ ] IPFS upload tested — CID returned successfully
- [ ] Branch pushed and team notified

---

## Useful references

- RainbowKit + Vite setup: https://rainbowkit.com/docs/installation
- Pinata React quickstart: https://docs.pinata.cloud/quickstart/react
- wagmi `useAccount` hook: https://wagmi.sh/react/hooks/useAccount
- wagmi `useReadContract` hook: https://wagmi.sh/react/hooks/useReadContract (Shahvez and Garv will use this)
