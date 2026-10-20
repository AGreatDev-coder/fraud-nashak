// Centralized Forensic API Service for Fraud-Naashak
// Uses VITE_API_URL env var in production; falls back to /api which the Vite proxy forwards to :5000
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

let currentInvestigator = {
  role: 'INVESTIGATOR_LEAD',
  name: 'Officer S. Sharma',
  id: 'IND-FIU-9021'
};

export function setInvestigatorClearance(role, name = 'Officer S. Sharma', id = 'IND-FIU-9021') {
  currentInvestigator = { role, name, id };
}

export function getInvestigatorClearance() {
  return currentInvestigator;
}

// Safe fetch wrapper with fallback support & RBAC headers
async function apiFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-investigator-role': currentInvestigator.role,
        'x-investigator-name': currentInvestigator.name,
        'x-investigator-id': currentInvestigator.id,
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => null);
      if (errData?.message) {
        throw new Error(errData.message);
      }
      throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.warn(`[API Notice] Fallback for ${endpoint}:`, error.message);
    return null;
  }
}

// 1. System Health & Audit Trail
export async function checkBackendHealth() {
  const data = await apiFetch('/health');
  return data || { status: 'OFFLINE', database: 'High-Availability In-Memory Active' };
}

export async function getAuditTrail() {
  const res = await apiFetch('/audit-trail');
  return res?.data || [];
}

// 2. Dashboard Metrics
export async function getDashboardMetrics() {
  const res = await apiFetch('/metrics/dashboard');
  return res?.data || null;
}

// 3. Transactions
export async function getTransactions(params = {}) {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.severity && params.severity !== 'ALL') query.append('severity', params.severity);
  if (params.channel && params.channel !== 'ALL') query.append('channel', params.channel);
  if (params.pattern && params.pattern !== 'ALL') query.append('pattern', params.pattern);
  if (params.minAmount) query.append('minAmount', params.minAmount);
  if (params.maxAmount) query.append('maxAmount', params.maxAmount);

  const queryString = query.toString() ? `?${query.toString()}` : '';
  const res = await apiFetch(`/transactions${queryString}`);
  return res?.data || null;
}

export async function getTransactionByUtr(utr) {
  const res = await apiFetch(`/transactions/${utr}`);
  return res?.data || null;
}

// 4. Accounts
export async function getAccounts() {
  const res = await apiFetch('/accounts');
  return res?.data || null;
}

export async function getAccountByNumber(accountNumber) {
  const res = await apiFetch(`/accounts/${accountNumber}`);
  return res?.data || null;
}

export async function updateAccountStatus(accountNumber, status) {
  const res = await apiFetch(`/accounts/${accountNumber}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
  return res?.data || null;
}

// 5. Graph Topology
export async function getGraphTopology() {
  const res = await apiFetch('/graph/topology');
  return res?.data || null;
}

// 6. Cases
export async function getCases() {
  const res = await apiFetch('/cases');
  return res?.data || null;
}

export async function getCaseById(id) {
  const res = await apiFetch(`/cases/${id}`);
  return res?.data || null;
}

export async function createCase(caseData) {
  const res = await apiFetch('/cases', {
    method: 'POST',
    body: JSON.stringify(caseData)
  });
  return res?.data || null;
}

export async function updateCaseStatus(id, status) {
  const res = await apiFetch(`/cases/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
  return res?.data || null;
}

export async function addCaseNote(id, content, author) {
  const res = await apiFetch(`/cases/${id}/notes`, {
    method: 'POST',
    body: JSON.stringify({ content, author })
  });
  return res?.data || null;
}

export async function addCaseEvidence(id, evidenceData) {
  const res = await apiFetch(`/cases/${id}/evidence`, {
    method: 'POST',
    body: JSON.stringify(evidenceData)
  });
  return res?.data || null;
}

export async function removeCaseEvidence(id, evidenceId) {
  const res = await apiFetch(`/cases/${id}/evidence/${evidenceId}`, {
    method: 'DELETE'
  });
  return res?.data || null;
}

// 7. Forensic Reports
export async function getCaseReport(caseId, template = 'COMPREHENSIVE') {
  const res = await apiFetch(`/reports/${caseId}?template=${template}`);
  return res?.data || null;
}


