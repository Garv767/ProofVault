# ProofVault – Shahvez's Guide
### Phase 5 — Bounty Browser + Create Bounty Pages

> **First:** Complete `SETUP.md` before starting anything here.  
> **Wait for:** Raushan to push `src/abi/BountyEscrow.json` and share the contract address before wiring up blockchain calls. You can build the UI first.

---

## Your deliverables

By the end of Phase 5, the team needs:
1. `src/pages/BountyBrowser.tsx` — shows all open bounties fetched from the contract
2. `src/pages/CreateBounty.tsx` — form for investigators to post new bounties
3. Both pages added as routes in `App.tsx`

---

## Phase 5 – Bounty Pages

### Step 5.1 – Wait for dependencies (or stub them)

You need two things from teammates before connecting to the blockchain:

| What | From | Where |
|------|------|-------|
| `src/abi/BountyEscrow.json` | Raushan | After Phase 3 is done |
| Deployed contract address | Raushan | `contract-addresses.md` in the repo |
| `useAccount`, `useReadContract` hooks | Abhinandan | Available after Phase 2 |

**While waiting**, build the full UI with hardcoded mock data first. Then swap in real contract calls once Raushan pushes the ABI.

Mock data you can use while waiting:

```typescript
const mockBounties = [
  { id: 1, title: "Corruption in City Council", reward: "0.5", category: "Politics", isOpen: true },
  { id: 2, title: "Environmental Violations at Factory", reward: "1.2", category: "Environment", isOpen: true },
  { id: 3, title: "Financial Fraud at Startup", reward: "2.0", category: "Finance", isOpen: true },
]
```

---

### Step 5.2 – Create the Bounty Browser page

Create a new file `src/pages/BountyBrowser.tsx`.

Ask Claude:

> "Write a React + Tailwind component `BountyBrowser` that:
> 1. Displays a list of bounties. Each bounty shows: title, reward (in MATIC), category, and a 'Submit Tip' button.
> 2. Style each bounty as a card with a dark background, matching a dark-themed investigative/journalist app.
> 3. Add a search/filter input at the top to filter by category.
> 4. For now, use this hardcoded array as the data source: `[{ id: 1, title: 'Corruption in City Council', reward: '0.5', category: 'Politics', isOpen: true }, ...]`
> 5. The 'Submit Tip' button should link to `/tipster?bountyId={id}`.
> 6. Export as default."

Save as `src/pages/BountyBrowser.tsx`.

---

### Step 5.3 – Wire up real contract data (after Raushan pushes ABI)

Once `src/abi/BountyEscrow.json` exists and you have the contract address, replace the mock data with a real contract call.

Add the contract address to your `.env`:

```env
VITE_BOUNTY_ESCROW_ADDRESS=0x_address_from_raushan
```

Then ask Claude:

> "I have this BountyBrowser component using hardcoded data. Replace the hardcoded array with a `useReadContract` call from wagmi that reads `getBounties()` from my BountyEscrow contract. The ABI is in `src/abi/BountyEscrow.json`. The address comes from `import.meta.env.VITE_BOUNTY_ESCROW_ADDRESS`. Keep all the UI the same."

Paste your current component + the ABI to Claude, and replace the file with the output.

---

### Step 5.4 – Create the Create Bounty page

Create `src/pages/CreateBounty.tsx`.

Ask Claude:

> "Write a React + Tailwind component `CreateBounty` that:
> 1. Shows a form with fields: Title (text), Description (textarea), Category (dropdown: Politics, Environment, Finance, Healthcare, Other), Reward (number input, in MATIC).
> 2. On submit, calls `createBounty` on the BountyEscrow contract using wagmi's `useWriteContract`, sending the reward as `msg.value` (convert MATIC to wei using `parseEther`).
> 3. Contract address from `import.meta.env.VITE_BOUNTY_ESCROW_ADDRESS`, ABI from `src/abi/BountyEscrow.json`.
> 4. Show a loading state while the transaction is pending.
> 5. On success, show a green success message and clear the form.
> 6. On error, show a red error message.
> 7. Dark-themed to match the rest of the app. Export as default."

Save as `src/pages/CreateBounty.tsx`.

> ⚠️ If the ABI isn't ready yet, ask Claude to build the UI with a placeholder `console.log("would submit:", formData)` instead of the actual contract call. Swap in the real call later.

---

### Step 5.5 – Add routes to App.tsx

Open `src/App.tsx`. Find where the existing routes are defined (look for `<Route` elements or a router setup).

Paste the router section to Claude with this prompt:

> "Add two new routes to this React Router config:
> - `/bounties` → renders `<BountyBrowser />`
> - `/create-bounty` → renders `<CreateBounty />`
> Import both components at the top. Keep all existing routes."

Replace the router section with Claude's output.

---

### Step 5.6 – Test both pages

```bash
npm run dev
```

1. Navigate to http://localhost:5173/bounties — bounty cards should show
2. Navigate to http://localhost:5173/create-bounty — form should show
3. If MetaMask is connected (Abhinandan's work), try submitting a bounty

---

### Step 5.7 – Add navigation links

Find the navbar in `App.tsx`. Add links to both new pages:

Ask Claude:

> "Add these two links to this navbar: 'Browse Bounties' linking to `/bounties` and 'Post Bounty' linking to `/create-bounty`. Keep all existing links."

---

### Step 5.8 – Push your branch

```bash
git add .
git commit -m "feat: add BountyBrowser and CreateBounty pages"
git push origin feature/bounty-pages
```

Open a Pull Request on GitHub into `main` and tag Garv.

---

## Checklist

- [ ] `src/pages/BountyBrowser.tsx` created with bounty cards
- [ ] `src/pages/CreateBounty.tsx` created with working form
- [ ] Both pages show correct UI (dark-themed, responsive)
- [ ] Routes `/bounties` and `/create-bounty` added in `App.tsx`
- [ ] Navbar links added for both pages
- [ ] Real contract data connected (once Raushan pushes ABI)
- [ ] Branch pushed and PR opened

---

## Useful references

- wagmi `useReadContract`: https://wagmi.sh/react/hooks/useReadContract
- wagmi `useWriteContract`: https://wagmi.sh/react/hooks/useWriteContract
- StandardBounties explorer UI (pattern reference): https://github.com/Bounties-Network/Explorer
- Tailwind card components: https://tailwindui.com/components/application-ui/lists/tables
