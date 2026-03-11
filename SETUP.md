# ProofVault – Team Setup Guide

> **DevsHouse '26 | TechForge**  
> Read this entire doc before touching any code.

---

## Prerequisites (Everyone installs this)

| Tool | Version | Download |
|------|---------|----------|
| Node.js | v18+ | https://nodejs.org |
| Git | Latest | https://git-scm.com |
| VS Code | Latest | https://code.visualstudio.com |
| MetaMask | Browser extension | https://metamask.io |

---

## Step 1 – Clone the repo

Garv will send you the GitHub repo link. Once you have it:

```bash
git clone https://github.com/YOUR_GARV_SENDS_YOU/ProofVault.git
cd ProofVault
```

---

## Step 2 – Install dependencies

```bash
npm install
```

This takes 2–3 minutes. Do not interrupt it.

---

## Step 3 – Create your `.env` file

In the project root, create a file called `.env` (no extension). Paste this in:

```env
VITE_USE_REAL_MIDNIGHT=false
VITE_PINATA_JWT=placeholder_update_later
VITE_BOUNTY_ESCROW_ADDRESS=placeholder_update_later
VITE_REPUTATION_ADDRESS=placeholder_update_later
VITE_KVAC_ADDRESS=placeholder_update_later
```

> ⚠️ Never commit `.env` to Git. It is already in `.gitignore` — do not remove it from there.

---

## Step 4 – Compile ZK circuits

```bash
npm run compile-circuits
```

This takes about 2 minutes. You will see output about building the RLN circuit. That is normal.

---

## Step 5 – Start the app

```bash
npm run dev
```

Open your browser at **http://localhost:5173**. You should see the ProofVault UI.

If you get a blank screen or an error, paste the terminal error into the team chat immediately.

---

## Step 6 – Set up MetaMask for Polygon Amoy Testnet

1. Open MetaMask → click the network name at the top → **Add a network manually**
2. Fill in:

| Field | Value |
|-------|-------|
| Network Name | Polygon Amoy Testnet |
| RPC URL | https://rpc-amoy.polygon.technology |
| Chain ID | 80002 |
| Currency Symbol | MATIC |
| Block Explorer | https://amoy.polygonscan.com |

3. Get free test MATIC from **https://faucet.polygon.technology** (paste your wallet address)

---

## Step 7 – Create your Git branch

**Do not work on `main`.** Each person has their own branch:

| Person | Branch name |
|--------|------------|
| Garv | `feature/dashboards` |
| Raushan | `feature/smart-contracts` |
| Abhinandan | `feature/wallet-ipfs` |
| Shahvez | `feature/bounty-pages` |

Create your branch:

```bash
git checkout -b feature/YOUR-BRANCH-NAME
```

---

## How to sync with teammates' work

When someone pushes their branch and you need their changes:

```bash
# Pull their branch
git fetch origin
git checkout feature/their-branch-name
git pull

# Merge into yours (from your branch)
git checkout feature/your-branch-name
git merge feature/their-branch-name
```

Resolve any conflicts in VS Code (it highlights them in red/green).

---

## How to push your work

```bash
git add .
git commit -m "short description of what you did"
git push origin feature/your-branch-name
```

Then on GitHub, open a **Pull Request** into `main` and add Garv as reviewer.

---

## Project File Map (quick reference)

```
ProofVault/
├── src/
│   ├── pages/          ← UI pages (your main work area)
│   ├── components/     ← Reusable UI pieces
│   ├── lib/            ← ZK proofs, encryption, contracts (mostly existing)
│   └── abi/            ← Contract ABIs (Raushan generates these in Phase 3)
├── proofvault-contracts/  ← Hardhat smart contracts (Raushan's folder)
├── public/zk-artifacts/   ← ZK proof keys (do not modify)
└── .env                   ← Your secrets (never commit)
```

---

## Who does what

| Person | Phases | Key deliverable |
|--------|--------|----------------|
| **Raushan** | 3, 8 | Smart contracts on Polygon + Vercel deploy |
| **Abhinandan** | 2, 4 | MetaMask wallet connect + IPFS storage |
| **Shahvez** | 5 | Bounty Browser + Create Bounty pages |
| **Garv** | 6 | Investigator & Tipster dashboards |

> Phase 1 is done — the base repo is already set up.

---

## Dependency order (important!)

Some phases depend on others finishing first:

```
Phase 2 (Abhinandan) ──┐
Phase 3 (Raushan)   ───┼──► Phase 5 (Shahvez) ──► Phase 6 (Garv) ──► Phase 7 (Everyone)
Phase 4 (Abhinandan) ──┘
```

- **Shahvez** needs Raushan's contract ABIs and Abhinandan's wallet hooks before wiring up buttons
- **Garv** needs all three above before connecting dashboard actions to contracts
- **Coordinate via the group chat** when you push something others depend on

---

## Common errors & fixes

| Error | Fix |
|-------|-----|
| `Cannot find module 'viem'` | Run `npm install` again |
| MetaMask says wrong network | Switch to Polygon Amoy in MetaMask |
| Blank page after `npm run dev` | Check terminal for errors, paste to chat |
| `VITE_* is undefined` | Make sure your `.env` file exists in the project root |
| Git merge conflicts | Open VS Code, accept the correct changes, then `git add . && git commit` |

---

## Resources

- RainbowKit docs: https://rainbowkit.com/docs/installation
- Wagmi docs: https://wagmi.sh
- Pinata SDK: https://docs.pinata.cloud/quickstart/react
- Hardhat docs: https://hardhat.org/docs
- Polygon Amoy faucet: https://faucet.polygon.technology
- Polygon Amoy explorer: https://amoy.polygonscan.com
