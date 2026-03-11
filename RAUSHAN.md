# ProofVault – Raushan's Guide
### Phases 3 & 8 — Smart Contracts + Vercel Deployment

> **First:** Complete `SETUP.md` before starting anything here.

---

## Your deliverables

By the end of your phases, the team needs from you:
1. Three deployed contracts on Polygon Amoy with their **addresses**
2. Three **ABI JSON files** placed in `src/abi/` in the repo
3. The app **live on Vercel** with a public URL

---

## Phase 3 – Smart Contracts

### Step 3.1 – Create the contracts folder

From the project root:

```bash
mkdir proofvault-contracts
cd proofvault-contracts
```

---

### Step 3.2 – Initialize Hardhat

```bash
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
```

When prompted, choose **"Create a JavaScript project"** and press Enter for all other prompts.

---

### Step 3.3 – Get the Bounty Escrow contract

1. Go to: https://github.com/Bounties-Network/StandardBounties/blob/master/contracts/StandardBounties.sol
2. Copy the entire file
3. Save it as `proofvault-contracts/contracts/BountyEscrow.sol`

---

### Step 3.4 – Add the 7% commission

Open `BountyEscrow.sol` and paste the whole file into Claude with this prompt:

> "Modify this StandardBounties contract to deduct 7% of the reward amount and send it to platform address `0xYOUR_WALLET_ADDRESS` before releasing the remainder to the tipster. Keep all other logic the same."

Replace the file with Claude's output.

> 📌 Replace `0xYOUR_WALLET_ADDRESS` with your actual MetaMask wallet address.

---

### Step 3.5 – Create the Reputation contract

Ask Claude:

> "Write a Solidity contract called `ReputationContract` with:
> - `mapping(address => uint256) public score` with default value 50
> - `function addScore(address user, uint256 amount) external onlyOwner`
> - `function subtractScore(address user, uint256 amount) external onlyOwner`
> - `function getTier(address user) external view returns (string memory)` — returns:
>   - `"SuperReliable"` if score > 80
>   - `"Trustworthy"` if score 60–80
>   - `"Considerable"` if score 40–60
>   - `"Risky"` if score 20–40
>   - `"Fraudster"` if score < 20
> Use OpenZeppelin Ownable."

Save the output as `proofvault-contracts/contracts/ReputationContract.sol`.

---

### Step 3.6 – Create the KVAC Slashing contract

Ask Claude:

> "Write a Solidity contract called `KVACContract` where:
> - Tipsters can call `deposit()` sending exactly 0.01 MATIC
> - `mapping(address => bool) public hasStake`
> - Owner can call `slash(address user)` to remove their stake (sent to owner)
> - Owner can call `refund(address user)` to return their 0.01 MATIC
> - Emit events: `Deposited`, `Slashed`, `Refunded`
> Use OpenZeppelin Ownable."

Save as `proofvault-contracts/contracts/KVACContract.sol`.

---

### Step 3.7 – Configure Hardhat for Polygon Amoy

Ask Claude:

> "Write a `hardhat.config.js` for deploying to Polygon Amoy testnet. Chain ID 80002, RPC URL from env variable `AMOY_RPC`. Use `@nomicfoundation/hardhat-toolbox`. Load private key from env variable `PRIVATE_KEY`."

Save as `proofvault-contracts/hardhat.config.js` (replace the existing one).

Then create `proofvault-contracts/.env`:

```env
PRIVATE_KEY=your_metamask_private_key_here
AMOY_RPC=https://rpc-amoy.polygon.technology
```

> ⚠️ To get your MetaMask private key: MetaMask → three dots → Account Details → Export Private Key. **Never share this with anyone or commit it to Git.**

Install dotenv:

```bash
npm install dotenv
```

---

### Step 3.8 – Write the deploy script

Ask Claude:

> "Write a Hardhat deploy script `scripts/deploy.js` that:
> 1. Deploys `BountyEscrow`, `ReputationContract`, and `KVACContract`
> 2. Waits for each deployment to confirm
> 3. Logs each contract name and its deployed address
> 4. Saves the addresses to a file called `deployed-addresses.json`"

Save as `proofvault-contracts/scripts/deploy.js`.

---

### Step 3.9 – Install OpenZeppelin and deploy

```bash
npm install @openzeppelin/contracts
npx hardhat run scripts/deploy.js --network amoy
```

If you get an error, copy it and paste to Claude with the message:  
`"Fix this Hardhat deploy error: [paste error]"`

---

### Step 3.10 – Copy ABIs to the frontend

After a successful deploy, Hardhat creates ABI files automatically in `proofvault-contracts/artifacts/contracts/`.

Run these commands from the project root:

```bash
mkdir -p src/abi

cp proofvault-contracts/artifacts/contracts/BountyEscrow.sol/BountyEscrow.json src/abi/
cp proofvault-contracts/artifacts/contracts/ReputationContract.sol/ReputationContract.json src/abi/
cp proofvault-contracts/artifacts/contracts/KVACContract.sol/KVACContract.json src/abi/
```

Then open each JSON in `src/abi/` — the files are large. We only need the `abi` array. Ask Claude:

> "Extract only the `abi` array from this JSON and save it as a minimal JSON file with just `{ "abi": [...] }`."

Do this for all three files.

---

### Step 3.11 – Share addresses with the team

Create a file in the project root called `contract-addresses.md` and fill it in:

```markdown
## Deployed Contract Addresses (Polygon Amoy)

| Contract | Address |
|----------|---------|
| BountyEscrow | 0x... |
| ReputationContract | 0x... |
| KVACContract | 0x... |
```

Push this to your branch and tell the team in chat. **Everyone needs these.**

---

### Step 3.12 – Write tests (optional but good for demo)

Ask Claude:

> "Write a Hardhat test file `test/ProofVault.test.js` that tests:
> 1. Deploying all three contracts
> 2. Creating a bounty on BountyEscrow
> 3. Adding and reading a reputation score
> 4. Depositing stake on KVACContract and slashing it"

Run tests with:

```bash
npx hardhat test
```

---

## Phase 8 – Deploy to Vercel

> Do this last, once Phase 7 is complete and everything is working locally.

### Step 8.1 – Install Vercel CLI

```bash
npm install -g vercel
```

### Step 8.2 – Deploy

From the project root (not `proofvault-contracts/`):

```bash
vercel
```

Follow the prompts. When it asks about the framework, select **Vite**.

### Step 8.3 – Add environment variables

Go to **vercel.com → your project → Settings → Environment Variables** and add:

| Key | Value |
|-----|-------|
| `VITE_PINATA_JWT` | (get from Abhinandan) |
| `VITE_BOUNTY_ESCROW_ADDRESS` | your deployed address |
| `VITE_REPUTATION_ADDRESS` | your deployed address |
| `VITE_KVAC_ADDRESS` | your deployed address |
| `VITE_USE_REAL_MIDNIGHT` | `false` |

### Step 8.4 – Redeploy with env vars

```bash
vercel --prod
```

Share the URL with the team. Done! 🎉

---

## Checklist

- [ ] `BountyEscrow.sol` deployed with 7% commission
- [ ] `ReputationContract.sol` deployed with 5 tiers
- [ ] `KVACContract.sol` deployed with deposit/slash/refund
- [ ] All 3 addresses shared with team in `contract-addresses.md`
- [ ] ABI JSONs in `src/abi/` and pushed to your branch
- [ ] App deployed on Vercel with public URL
