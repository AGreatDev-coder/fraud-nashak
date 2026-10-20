# Fraud-Naashak — Hackathon Demo Guide & Evaluator Walkthrough
**Problem Statement:** PS-01 — Intelligent Mule Account Detection and Financial Fraud Investigation Platform  
**Platform Name:** Fraud-Naashak (Detect. Trace. Investigate.)  
**Stack:** React 19, Tailwind CSS, Lucide Icons, Recharts, @xyflow/react, Node.js / Express, MongoDB with In-Memory HA Fallback  

---

## 1. Executive Summary & Problem Context

In modern digital banking ecosystems (UPI, IMPS, RTGS, AePS), mule accounts operate as high-velocity conduits that rapidly transfer illegal proceeds within minutes to thwart traditional end-of-day bank reconciliations.

**The Core Challenge (PS-01):**
- **Velocity:** Illicit funds enter and leave within **11 minutes**, retaining less than **3.5%** of balance.
- **Layering Rings:** Syndicates route funds across multi-tier accounts to obscure the money trail.
- **Explainability Deficit:** Black-box AI scores cannot be submitted as legal evidence in court.
- **Intervention Delay:** Freezing accounts requires manual coordination, allowing cash-out.

**The Fraud-Naashak Solution:**
An end-to-end financial intelligence platform offering deterministic, explainable heuristic risk scoring, interactive multi-hop fund graph traversal, 3-tier Role-Based Access Control (RBAC), statutory Section 102 CrPC debit-freeze requisitioning, and automated legal evidence packaging.

---

## 2. 5-Minute Evaluator Pitch & Demo Script

### Minute 1: The Alert Triage & Executive Intelligence (Dashboard)
- **Action:** Open `http://localhost:5173/` (Dashboard view).
- **Pitch Narrative:**
  > *"Welcome to Fraud-Naashak. As an investigator logging in at the start of a shift, our executive dashboard synthesizes real-time telemetry across Indian payment channels. Notice the critical KPIs: ₹48.2 Lakhs in total flagged volume, 14 active mule alerts, and a critical 71.4% pass-through ratio. Below, our Flagged Alerts Ledger highlights accounts exhibiting abnormal turnover spikes. Notice account `918237491024` (Axis Bank) flagged with a critical risk score of 96/100 due to Rapid Pass-Through behavior."*
- **Visual Highlight:** Point to the top-right role switcher showing `INVESTIGATOR_LEAD (Level 3)` and the persistent compliance disclaimer: `[PS-01 Synthetic Demonstration Data]`.

### Minute 2: Interactive Fund-Flow Graph & Layering Rings (Fund-Flow Graph)
- **Action:** Click **"Fund-Flow Graph"** in the sidebar.
- **Pitch Narrative:**
  > *"When money enters the banking system, fraudsters disperse it across complex layering rings. Our interactive fund-flow graph renders the complete transaction topology. Notice the clear directional vectors: origin victim accounts funnel ₹18.5 Lakhs into our suspect node `918237491024`. From there, within minutes, funds are split into Tier-2 layering nodes (`718293847192`, `491029384756`) before reaching cash-out nodes (`ATM-BLR-04` and `Crypto OTC Gate`). Investigators can filter by minimum amount or risk tier, drag nodes, inspect edge weights, and isolate layering cycles in real time."*
- **Visual Highlight:** Click on node `918237491024` to open the detail drawer showing in-flight metrics and connected counterparties.

### Minute 3: Explainable Risk Scoring & Velocity Heuristics (Account Investigation)
- **Action:** Navigate to **"Account Investigation"** and select/view account `918237491024` (Kishore M. - Axis Bank).
- **Pitch Narrative:**
  > *"Why is this account flagged? Fraud-Naashak prioritizes total explainability over opaque black boxes. In our Account Dossier, we see the heuristic breakdown totaling 96/100:
  > 1. Turnover Spike Ratio: 32.4x baseline monthly average.
  > 2. Pass-Through Holding Velocity: Average holding duration is just 11 minutes.
  > 3. Retention Rate: Only 3.2% of inbound funds are retained (₹60,000 net balance).
  > 4. Inflow/Outflow Symmetry: ₹18.5L in, ₹17.9L out across 10 rapid IMPS transactions."*
- **Visual Highlight:** Point to the explainable score breakdown and the statutory disclaimer: *"Heuristic Risk Score — Not Legal Guilt"*.

### Minute 4: Intervention & Role-Based Access Control (RBAC Security)
- **Action:**
  1. In the Top Navbar, switch role from `INVESTIGATOR_LEAD` to `AUDITOR (Level 1)`.
  2. Point out how the **"Section 102 CrPC Lien Freeze"** button becomes disabled and shows a restricted tooltip.
  3. Switch role back to `INVESTIGATOR_LEAD (Level 3)`.
  4. Click **"Execute Section 102 CrPC Freeze"**.
- **Pitch Narrative:**
  > *"Intervention requires strict legal governance. Notice our 3-tier clearance system. When logged in as an Auditor, sensitive actions like freezing accounts or altering evidence are strictly locked. When switching back to Investigator Lead, we can execute an emergency Section 102 CrPC debit freeze. The account status instantly updates to SUSPENDED, and an immutable entry is logged to the forensic audit trail."*

### Minute 5: Case Packaging & Judicial Reports (Forensic Reports)
- **Action:** Click **"Forensic Reports"** in the sidebar. Select Case `#CS-108`.
- **Pitch Narrative:**
  > *"Investigations must yield actionable legal outcomes. Fraud-Naashak compiles all pinned transactions, KYC records, and audit events into statutory legal packages:
  > 1. Comprehensive Dossier: A 7-section FIU-grade investigation report.
  > 2. Section 102 CrPC Lien Notice: Ready-to-serve formal directive ordering bank nodal officers to freeze debit operations immediately.
  > 3. FIR Addendum: A court-ready exhibit featuring evidence chain-of-custody and a cryptographic SHA-256 integrity hash.
  > Investigators can copy the bank notice to clipboard or generate an official A4 PDF directly using the browser print engine."*
- **Visual Highlight:** Click **"Section 102 CrPC Lien Notice"** template, show the official formal legal document, and click **"Export PDF / Print Notice"**.

---

## 3. Test Credentials & Demo Accounts Reference Sheet

### Key Investigation Accounts (Synthetic Dataset PS-01)
| Account Number | Entity / Persona | Bank | Risk Score | Role in Fraud Ring |
| :--- | :--- | :--- | :---: | :--- |
| **`918237491024`** | Kishore M. (Unemployed / High Turnover) | Axis Bank | **96 / 100** | **Tier-1 Layering Mule** (11-min holding time, 3.2% retention) |
| **`601928471920`** | Pooja Verma (Student / Shell Account) | HDFC Bank | **88 / 100** | **Placement Conduit** (₹2.2L split to downstream nodes) |
| **`718293847192`** | Suresh N. (Dormant Reactivated) | ICICI Bank | **91 / 100** | **Tier-2 Layering Hub** (Multiple fan-out transfers) |

### Key Synthetic Transactions (UTRs)
| UTR | Amount | Channel | Pattern Detected | Flagged Severity |
| :--- | :--- | :--- | :--- | :--- |
| **`UTR20261018948192`** | ₹4,50,000 | IMPS | Rapid Pass-Through (11m) | **CRITICAL** |
| **`UTR20261018948205`** | ₹2,20,000 | IMPS | Fund Splitting (Fan-Out) | **HIGH** |
| **`UTR20261018948218`** | ₹3,80,000 | RTGS | Multi-Hop Layering | **HIGH** |
| **`UTR20261018948231`** | ₹1,50,000 | UPI | Structured Round-Amount | **MEDIUM** |

### 3-Tier RBAC Clearance Roles
| Role Name | Clearance Level | Permissions |
| :--- | :---: | :--- |
| **`AUDITOR`** | Level 1 (Read-Only) | Can inspect dashboards, view graphs, audit logs, and read reports. Cannot mutate state. |
| **`FORENSIC_ANALYST`** | Level 2 (Standard) | Can log forensic case notes, filter transactions, pin evidence to dossiers. |
| **`INVESTIGATOR_LEAD`** | Level 3 (Unrestricted) | Full privileges: Can execute Section 102 CrPC freezes, manage cases, export legal notices. |

---

## 4. Verification & Testing Commands

To run the automated 36-point End-to-End verification test suite:

```bash
# In server directory:
npm test
```

Expected output:
```
================================================================
  FRAUD-NAASHAK: END-TO-END SYSTEM VERIFICATION SUITE (STAGE 10)
  Target: http://localhost:5000/api
================================================================
...
TOTAL TESTS EXECUTED: 36
PASSED: 36
FAILED: 0
================================================================
```

---

## 5. Judge FAQ & Technical Explanations

**Q1: How does Fraud-Naashak ensure legal defensibility in court?**  
*A:* Rather than outputting an opaque machine learning probability score, Fraud-Naashak uses an explainable deterministic heuristic engine based on empirical banking red flags (turnover spike ratio, retention rate, average holding time, burst frequency). Every data mutation and notice generation produces an immutable audit trail entry stamped with investigator ID, timestamp, and cryptographic SHA-256 hash.

**Q2: What happens if MongoDB becomes unavailable?**  
*A:* The backend features a dual-mode High-Availability architecture. When MongoDB is online, all records persist to collections with Mongoose validation. If the database disconnects, the server automatically transitions to an in-memory fallback cache with zero downtime or request drops.

**Q3: How does the system handle rapid pass-through velocity?**  
*A:* When funds enter an account, the velocity engine tracks the elapsed time until corresponding outbound debits occur. If over 90% of inbound volume is dispersed within a narrow window (e.g., < 15 minutes) with retention under 5%, the system triggers the `Rapid Pass-Through Mule` heuristic flag.
