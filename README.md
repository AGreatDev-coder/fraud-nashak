# Fraud-Naashak (PS-01)
### Intelligent Mule Account Detection and Financial Fraud Investigation Platform
> **Tagline:** Detect. Trace. Investigate.  
> **Problem Statement:** PS-01 — Intelligent Mule Account Detection and Financial Fraud Investigation Platform  
> **Stack:** React 19, Tailwind CSS, Lucide Icons, Recharts, @xyflow/react, Node.js / Express, MongoDB with In-Memory High-Availability Fallback  

---

## 1. Problem Statement & Platform Overview

In Indian digital banking ecosystems (UPI, IMPS, RTGS, AePS), financial fraud syndicates exploit money mules to rapidly launder illegal proceeds. Traditional batch-reconciliation tools fail because:
- **Velocity:** Illicit funds enter and leave mule accounts within **11 minutes**, retaining less than **3.5%** of balance.
- **Layering Rings:** Syndicates route funds across multi-tier accounts to obscure the money trail.
- **Explainability Deficit:** Black-box AI scores cannot be submitted as legal evidence in court.
- **Delayed Intervention:** Freezing accounts requires manual coordination, allowing cash-out.

**Fraud-Naashak** solves these challenges with:
1. **Deterministic, Explainable Risk Heuristics:** Transparent breakdown of turnover spikes, pass-through durations, and retention rates.
2. **Interactive Fund-Flow Topology:** Multi-hop graph visualization powered by `@xyflow/react` to detect layering rings and cash-out nodes.
3. **Statutory Legal Notice Generator:** Automated generation of Section 102 CrPC / Section 106 BNSS Bank Debit-Freeze Directives and FIR addenda with SHA-256 evidence hashes.
4. **3-Tier RBAC & Forensic Audit Trail:** Granular role-based access control (`AUDITOR`, `FORENSIC_ANALYST`, `INVESTIGATOR_LEAD`) with immutable audit logging for chain of custody.

---

## 2. PS-01 Requirements Compliance Matrix

| Requirement | Implementation Module | Status |
| :--- | :--- | :---: |
| **Mule Account Detection** | [AccountInvestigationView.jsx](file:///c:/Users/Sanju%20Samal/Downloads/fraud-naashak/client/src/views/AccountInvestigationView.jsx) + [accountController.js](file:///c:/Users/Sanju%20Samal/Downloads/fraud-naashak/server/src/controllers/accountController.js) | **Completed** |
| **Explainable Risk Scoring** | Velocity heuristics breakdown (Retention %, avg holding time, turnover spike) | **Completed** |
| **Interactive Graph Visualization** | [FundFlowGraphView.jsx](file:///c:/Users/Sanju%20Samal/Downloads/fraud-naashak/client/src/views/FundFlowGraphView.jsx) with `@xyflow/react` node traversal | **Completed** |
| **Transaction Explorer & Filtering** | [TransactionExplorerView.jsx](file:///c:/Users/Sanju%20Samal/Downloads/fraud-naashak/client/src/views/TransactionExplorerView.jsx) with multi-criteria query engine | **Completed** |
| **Investigation Workspace & Case Dossiers** | [InvestigationWorkspaceView.jsx](file:///c:/Users/Sanju%20Samal/Downloads/fraud-naashak/client/src/views/InvestigationWorkspaceView.jsx) with evidence pinning and notes | **Completed** |
| **Section 102 CrPC Debit Freeze** | Direct API mutation `PATCH /api/accounts/:id/status` with RBAC guard | **Completed** |
| **Forensic Legal Reports** | [ForensicReportsView.jsx](file:///c:/Users/Sanju%20Samal/Downloads/fraud-naashak/client/src/views/ForensicReportsView.jsx) with A4 PDF Print, JSON export, and Bank notice copy | **Completed** |
| **Security & Forensic Audit Trail** | 3-Tier RBAC clearance ([auth.js](file:///c:/Users/Sanju%20Samal/Downloads/fraud-naashak/server/src/middleware/auth.js)) + immutable audit log ([auditLogger.js](file:///c:/Users/Sanju%20Samal/Downloads/fraud-naashak/server/src/middleware/auditLogger.js)) | **Completed** |
| **High-Availability Data Resilience** | Dual-mode MongoDB connection with in-memory fallback cache | **Completed** |

---

## 3. System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        FRAUD-NAASHAK FRONTEND                          │
│         React 19 • Tailwind CSS • Lucide Icons • Recharts • Vite       │
├───────────────┬──────────────────┬─────────────────┬───────────────────┤
│   Dashboard   │   Fund-Flow      │   Transaction   │    Forensic       │
│   Analytics   │   Graph Flow     │   Explorer      │    Reports        │
└───────┬───────┴────────┬─────────┴────────┬────────┴─────────┬─────────┘
        │                │                  │                  │
        ▼                ▼                  ▼                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    EXPRESS REST API BACKEND (Port 5000)                │
├────────────────────────────────────────────────────────────────────────┤
│  Middleware Pipeline:                                                  │
│   • CORS & Body Parsers                                                │
│   • Input Sanitization & NoSQL Injection Protection                   │
│   • 3-Tier Investigator Clearance RBAC (Auditor, Analyst, Lead)        │
│   • Immutable Forensic Audit Trail Logger                              │
├────────────────────────────────────────────────────────────────────────┤
│  Core Controllers:                                                     │
│   • /api/health         • /api/metrics         • /api/accounts         │
│   • /api/transactions   • /api/cases           • /api/reports          │
│   • /api/graph          • /api/audit-trail                             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
       ┌────────────────────────┐      ┌────────────────────────┐
       │   MongoDB Database     │      │   High-Availability    │
       │   (Primary Store)      │      │   In-Memory Fallback   │
       └────────────────────────┘      └────────────────────────┘
```

---

## 4. Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (optional — system automatically runs on high-availability in-memory fallback if MongoDB is not present)

### 1. Installation
Clone the repository and install dependencies:

```bash
# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 2. Database Seeding (Optional)
If running a local MongoDB instance:
```bash
cd server
npm run seed
```

### 3. Running Locally
Start both backend and frontend servers:

```bash
# Terminal 1: Start Express API Server (Port 5000)
cd server
npm start

# Terminal 2: Start Vite Client Server (Port 5173)
cd client
npm run dev
```

Open your browser at: **`http://localhost:5173`**

### 4. Running the Automated End-to-End Test Suite
To verify all 36 validation checkpoints across health, accounts, transactions, cases, reports, RBAC, and audit trails:

```bash
cd server
npm test
```

---

## 5. Security & 3-Tier RBAC Clearance Model

Fraud-Naashak implements an RBAC clearance system enforcing strict separation of duties:

| Role | Clearance Level | Header Value | Allowed Operations |
| :--- | :---: | :--- | :--- |
| **`AUDITOR`** | Level 1 | `x-investigator-role: AUDITOR` | **Read-Only**: Can view dashboards, browse transactions, examine graphs, read reports, and inspect audit logs. All mutation attempts are blocked with HTTP 403. |
| **`FORENSIC_ANALYST`** | Level 2 | `x-investigator-role: FORENSIC_ANALYST` | **Standard**: Can log forensic case notes, filter transactions, pin evidence to dossiers, and query deep account dossiers. |
| **`INVESTIGATOR_LEAD`** | Level 3 | `x-investigator-role: INVESTIGATOR_LEAD` | **Unrestricted**: Full authority. Can execute statutory Section 102 CrPC debit freezes, create/close cases, and issue official bank freeze directives. |

The active clearance can be changed dynamically in the web UI using the top-right clearance selector.

---

## 6. API Reference

| Endpoint | Method | Role Required | Description |
| :--- | :---: | :---: | :--- |
| `/api/health` | `GET` | Public | System liveness, database status, and rule engine health |
| `/api/metrics` | `GET` | AUDITOR (Level 1) | Executive fraud KPIs, volume at risk, and channel distributions |
| `/api/accounts` | `GET` | AUDITOR (Level 1) | List all flagged account dossiers sorted by risk score |
| `/api/accounts/:accountNumber` | `GET` | AUDITOR (Level 1) | Detailed account profile with velocity metrics and risk factors |
| `/api/accounts/:accountNumber/status` | `PATCH` | INVESTIGATOR_LEAD (Level 3) | Execute statutory account freeze / status mutation |
| `/api/transactions` | `GET` | AUDITOR (Level 1) | Search transactions with multi-criteria filtering |
| `/api/cases` | `GET` | AUDITOR (Level 1) | List all investigation case dossiers |
| `/api/cases/:id/evidence` | `POST` | FORENSIC_ANALYST (Level 2) | Pin transaction or account evidence to case dossier |
| `/api/reports/:caseId` | `GET` | AUDITOR (Level 1) | Generate formal statutory legal report package |
| `/api/audit-trail` | `GET` | AUDITOR (Level 1) | Retrieve immutable forensic audit ledger |

---

## 7. Responsible AI & Legal Disclaimers

1. **Synthetic Data Disclosure:** All accounts, names, bank branches, PAN hashes, and transaction records presented in this demonstration are synthetically generated under the PS-01 benchmark protocol. Any resemblance to real entities or accounts is purely coincidental.
2. **Heuristic Risk Scores:** Heuristic scores generated by the system (0–100) are investigative triage indicators based on transaction velocity, retention rate, and turnover patterns. They do **not** constitute definitive legal proof of criminality.
3. **Statutory Compliance:** Freezing actions simulated under Section 102 of the Code of Criminal Procedure, 1973 (CrPC) / Section 106 of the Bharatiya Nagarik Suraksha Sanhita (BNSS) are designed for authorized law enforcement officers and designated bank nodal authorities.
