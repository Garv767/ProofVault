# ProofVault – Garv's Guide
### Phase 6 — Investigator & Tipster Dashboards

> **First:** Complete `SETUP.md` before starting anything here.  
> **Wait for:** Raushan's ABIs + contract addresses, and Abhinandan's wallet hooks before wiring up contract calls. You can rename files and build UI immediately.

---

## Your deliverables

By the end of Phase 6, the team needs:
1. `ReporterPage.tsx` renamed to `TipsterPage.tsx` (with enhanced UI)
2. `ModeratorPage.tsx` renamed to `InvestigatorPage.tsx`
3. `src/pages/InvestigatorDashboard.tsx` — full dashboard for managing bounties and tips
4. `src/components/ReputationBadge.tsx` — colored tier pill component
5. Navbar updated with new names and links

---

## Phase 6 – Dashboards

### Step 6.1 – Rename the existing pages (do this first)

This can be done immediately before any teammates finish their work.

**Rename the files:**

```bash
mv src/pages/ReporterPage.tsx src/pages/TipsterPage.tsx
mv src/pages/ModeratorPage.tsx src/pages/InvestigatorPage.tsx
```

**Update imports in App.tsx:**

Open `src/App.tsx` and do a find-and-replace:
- `ReporterPage` → `TipsterPage`
- `ModeratorPage` → `InvestigatorPage`

Also update any `import` paths that reference these old filenames.

**Verify the app still runs:**

```bash
npm run dev
```

The app should still work — you've just renamed the files. Fix any import errors before moving on.

---

### Step 6.2 – Create the ReputationBadge component

Create `src/components/ReputationBadge.tsx`.

Ask Claude:

> "Write a React + Tailwind component `ReputationBadge` that takes a `tier` prop (string) and returns a colored pill badge. Use these colors:
> - `SuperReliable` → green background
> - `Trustworthy` → blue background
> - `Considerable` → yellow background
> - `Risky` → orange background
> - `Fraudster` → red background
> Style it as a small rounded pill with white text, appropriate for a dark-themed UI. TypeScript with proper props interface. Export as default."

Save as `src/components/ReputationBadge.tsx`.

---

### Step 6.3 – Upgrade TipsterPage

Open `src/pages/TipsterPage.tsx`. This is the old ReporterPage with the ZK proof submission form. You are adding new sections to it.

Paste the full file to Claude with this prompt:

> "Add these three sections to the existing TipsterPage component:
> 1. **Reputation Badge** — at the top, call `getTier(address)` on the ReputationContract and display the result using the `<ReputationBadge />` component (import from `../components/ReputationBadge`). Use the connected wallet address from `useAccount()`.
> 2. **KVAC Stake Status** — show whether the user has deposited their 0.01 MATIC stake. Call `hasStake(address)` on the KVACContract. If they haven't staked, show a 'Deposit Stake (0.01 MATIC)' button that calls `deposit()` on the KVACContract with 0.01 MATIC as value.
> 3. **Browse Bounties link** — add a prominent button/link pointing to `/bounties`.
> Also modify the existing submit handler: before submitting the ZK proof, call `uploadToIPFS(tipContent)` from `../lib/ipfs` to get the IPFS hash, then include `bountyId` and the IPFS hash in the contract call.
> Contract addresses come from `import.meta.env`. ABI files are in `src/abi/`. Keep the existing ZK proof form."

Replace the file with Claude's output.

> ⚠️ If ABIs aren't ready yet, ask Claude to add the UI with `console.log` placeholders for all contract calls. Swap in real calls once Raushan pushes.

---

### Step 6.4 – Build the Investigator Dashboard

Create `src/pages/InvestigatorDashboard.tsx` — this is the biggest file you'll write.

Ask Claude:

> "Write a React + Tailwind page `InvestigatorDashboard` that:
>
> **Section 1 – My Bounties:**
> - Fetch bounties posted by the connected wallet address using `useReadContract` on BountyEscrow
> - Display each as a clickable card showing title, reward, open/closed status
>
> **Section 2 – Tips for Selected Bounty:**
> - When a bounty card is clicked, show all submitted tips for that bounty
> - Each tip shows: IPFS link (clickable), tipster wallet address (shortened), their reputation tier (from ReputationContract), submission date
> - Use `<ReputationBadge tier={tier} />` component
>
> **Section 3 – Accept / Reject buttons per tip:**
> - **Accept** button calls:
>   1. `releaseBounty(bountyId, tipsterAddress)` on BountyEscrow
>   2. `addScore(tipsterAddress, 10)` on ReputationContract
>   3. `refund(tipsterAddress)` on KVACContract
> - **Reject** button calls:
>   1. `rejectTip(bountyId, tipId)` on BountyEscrow
>   2. `subtractScore(tipsterAddress, 10)` on ReputationContract
>   3. `slash(tipsterAddress)` on KVACContract
>
> Use ABIs from `src/abi/`. Contract addresses from `import.meta.env.VITE_BOUNTY_ESCROW_ADDRESS`, `VITE_REPUTATION_ADDRESS`, `VITE_KVAC_ADDRESS`.
> Dark-themed. Show loading and error states. Export as default."

Save as `src/pages/InvestigatorDashboard.tsx`.

---

### Step 6.5 – Add routes and update navbar in App.tsx

Open `src/App.tsx` and paste the router + navbar section to Claude:

> "Add these updates to my App.tsx:
> 1. New route `/investigator` → `<InvestigatorDashboard />`
> 2. In the navbar: rename 'Reporter' link to 'Tipster', rename 'Moderator' link to 'Investigator'
> 3. Add navbar links: 'Browse Bounties' → `/bounties`, 'Post Bounty' → `/create-bounty`, 'Dashboard' → `/investigator`
> Keep all existing routes and imports."

---

### Step 6.6 – Add contract addresses to your `.env`

Once Raushan shares the deployed addresses, update your `.env`:

```env
VITE_BOUNTY_ESCROW_ADDRESS=0x_from_raushan
VITE_REPUTATION_ADDRESS=0x_from_raushan
VITE_KVAC_ADDRESS=0x_from_raushan
```

---

### Step 6.7 – Test all flows

```bash
npm run dev
```

**Tipster flow:**
1. Connect MetaMask
2. Go to `/tipster`
3. Confirm reputation badge shows
4. Deposit stake (0.01 MATIC) if not already staked
5. Browse to `/bounties`, select a bounty, submit a tip

**Investigator flow:**
1. Connect MetaMask with investigator wallet
2. Go to `/investigator`
3. Confirm your bounties show
4. Click a bounty, see tips
5. Accept a tip — confirm MATIC transfers in MetaMask

---

### Step 6.8 – Push your branch

```bash
git add .
git commit -m "feat: investigator & tipster dashboards, reputation badge"
git push origin feature/dashboards
```

Open a Pull Request on GitHub into `main`.

---

## Dependency cheat sheet

When you call contract functions, here's what each does and which contract it's on:

| Action | Contract | Function |
|--------|----------|---------|
| Get reputation tier | ReputationContract | `getTier(address)` |
| Add reputation | ReputationContract | `addScore(address, amount)` |
| Subtract reputation | ReputationContract | `subtractScore(address, amount)` |
| Check stake status | KVACContract | `hasStake(address)` |
| Deposit stake | KVACContract | `deposit()` (send 0.01 MATIC) |
| Slash stake | KVACContract | `slash(address)` |
| Refund stake | KVACContract | `refund(address)` |
| Release bounty reward | BountyEscrow | `releaseBounty(bountyId, tipsterAddress)` |
| Reject tip | BountyEscrow | `rejectTip(bountyId, tipId)` |

---

## Checklist

- [ ] `ReporterPage.tsx` renamed to `TipsterPage.tsx`, imports updated
- [ ] `ModeratorPage.tsx` renamed to `InvestigatorPage.tsx`, imports updated
- [ ] `ReputationBadge.tsx` created with 5 colored tiers
- [ ] `TipsterPage.tsx` upgraded with reputation badge, stake status, IPFS upload
- [ ] `InvestigatorDashboard.tsx` created with bounty list, tip review, accept/reject
- [ ] Route `/investigator` added in `App.tsx`
- [ ] Navbar updated with all new names and links
- [ ] Contract addresses added to `.env` (from Raushan)
- [ ] All flows tested end-to-end
- [ ] Branch pushed and PR opened

---

## Useful references

- wagmi `useReadContract`: https://wagmi.sh/react/hooks/useReadContract
- wagmi `useWriteContract`: https://wagmi.sh/react/hooks/useWriteContract
- wagmi `useAccount`: https://wagmi.sh/react/hooks/useAccount
- IPFS utility (Abhinandan's): `src/lib/ipfs.ts` → `uploadToIPFS(content)` and `fetchFromIPFS(cid)`
