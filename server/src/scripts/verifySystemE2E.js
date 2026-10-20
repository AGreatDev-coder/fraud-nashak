/**
 * Fraud-Naashak End-to-End System Smoke Test & Verification Suite
 * Validates all REST endpoints, RBAC clearance enforcement, Heuristic Risk Engine,
 * Case Evidence Attachment, Forensic Reports, and Audit Trail integrity.
 */

const BASE_URL = process.env.API_URL || 'http://localhost:5000/api';

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  ${COLORS.green}✓ PASS${COLORS.reset}: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ${COLORS.red}✗ FAIL${COLORS.reset}: ${testName} ${details ? `(${details})` : ''}`);
    failedTests++;
  }
}

async function runTestSuite() {
  console.log(`\n${COLORS.bold}${COLORS.cyan}================================================================${COLORS.reset}`);
  console.log(`${COLORS.bold}${COLORS.cyan}  FRAUD-NAASHAK: END-TO-END SYSTEM VERIFICATION SUITE (STAGE 10)${COLORS.reset}`);
  console.log(`${COLORS.bold}${COLORS.cyan}  Target: ${BASE_URL}${COLORS.reset}`);
  console.log(`${COLORS.bold}${COLORS.cyan}================================================================${COLORS.reset}\n`);

  try {
    // ---------------------------------------------------------
    // TEST 1: Health & Engine Liveness
    // ---------------------------------------------------------
    console.log(`${COLORS.bold}1. Health & Resilience Engine Check${COLORS.reset}`);
    const healthRes = await fetch(`${BASE_URL}/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200, 'Health endpoint responds with 200 OK');
    assert(healthData.status === 'HEALTHY', 'Service status is HEALTHY');
    assert(healthData.securityClearanceActive === true, 'Security Clearance module active');

    // ---------------------------------------------------------
    // TEST 2: Accounts & Heuristic Risk Engine
    // ---------------------------------------------------------
    console.log(`\n${COLORS.bold}2. Accounts & Risk Scoring Verification${COLORS.reset}`);
    const accountsRes = await fetch(`${BASE_URL}/accounts`, {
      headers: { 'x-investigator-role': 'FORENSIC_ANALYST' }
    });
    const accountsData = await accountsRes.json();
    assert(accountsRes.status === 200, 'Accounts list responds with 200 OK');
    assert(Array.isArray(accountsData.data) && accountsData.data.length > 0, `Returns non-empty list of accounts (${accountsData.data?.length} records)`);

    // Target mule account: 918237491024
    const muleAccountRes = await fetch(`${BASE_URL}/accounts/918237491024`, {
      headers: { 'x-investigator-role': 'FORENSIC_ANALYST' }
    });
    const muleAccountData = await muleAccountRes.json();
    const account = muleAccountData.data;
    assert(muleAccountRes.status === 200, 'Target mule account 918237491024 retrieved');
    assert(account?.accountNumber === '918237491024', 'Account number matches target');
    assert(account?.riskScore >= 90, `Heuristic risk score is critical (${account?.riskScore}/100)`);
    assert(account?.velocityMetrics?.avgHoldingTime === '11 mins' || account?.velocityMetrics?.avgHoldingTime?.includes('min'), `Rapid pass-through velocity flagged (${account?.velocityMetrics?.avgHoldingTime})`);
    assert(account?.velocityMetrics?.retentionRate === '3.2%', `Low balance retention verified (${account?.velocityMetrics?.retentionRate})`);

    // ---------------------------------------------------------
    // TEST 3: Transactions & Multi-Criteria Filtering
    // ---------------------------------------------------------
    console.log(`\n${COLORS.bold}3. Transaction Explorer & Query Engine${COLORS.reset}`);
    const txRes = await fetch(`${BASE_URL}/transactions?limit=10`, {
      headers: { 'x-investigator-role': 'FORENSIC_ANALYST' }
    });
    const txData = await txRes.json();
    assert(txRes.status === 200, 'Transactions query responds with 200 OK');
    assert(Array.isArray(txData.data) && txData.data.length > 0, `Transactions array populated (${txData.data?.length} records)`);

    // Filter by high-value threshold (minAmount = 100,000)
    const highValRes = await fetch(`${BASE_URL}/transactions?minAmount=100000`, {
      headers: { 'x-investigator-role': 'FORENSIC_ANALYST' }
    });
    const highValData = await highValRes.json();
    const allOverMin = highValData.data.every(t => t.amount >= 100000);
    assert(highValRes.status === 200 && allOverMin, `Multi-filter minAmount=100000 correctly restricts transactions (${highValData.data.length} matches)`);

    // ---------------------------------------------------------
    // TEST 4: Investigation Cases & Evidence Attachment
    // ---------------------------------------------------------
    console.log(`\n${COLORS.bold}4. Investigation Dossiers & Evidence Attachment${COLORS.reset}`);
    const casesRes = await fetch(`${BASE_URL}/cases`, {
      headers: { 'x-investigator-role': 'FORENSIC_ANALYST' }
    });
    const casesData = await casesRes.json();
    assert(casesRes.status === 200, 'Cases query responds with 200 OK');
    assert(Array.isArray(casesData.data) && casesData.data.length > 0, `Investigation cases catalog populated (${casesData.data?.length} cases)`);

    // Attach evidence to Case CS-108 adhering to schema
    const testUtr = `UTR-E2E-${Date.now().toString().slice(-6)}`;
    const evidencePayload = {
      type: 'TRANSACTION',
      utr: testUtr,
      amount: '₹3,50,000',
      channel: 'IMPS',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      rule: 'RULE-VELOCITY-E2E',
      detail: 'Automated E2E pass-through cycle validation evidence'
    };

    const attachRes = await fetch(`${BASE_URL}/cases/CS-108/evidence`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-investigator-role': 'INVESTIGATOR_LEAD'
      },
      body: JSON.stringify(evidencePayload)
    });
    const attachData = await attachRes.json();
    assert(attachRes.status === 201 || attachRes.status === 200, 'Evidence successfully attached to Case CS-108');
    assert(attachData.data?.pinnedEvidence?.some(e => e.utr === testUtr), `Evidence item verified in case dossier (${testUtr})`);

    // ---------------------------------------------------------
    // TEST 5: Forensic Reports & Statutory Legal Formatting
    // ---------------------------------------------------------
    console.log(`\n${COLORS.bold}5. Forensic Reports & Legal Notice Engine${COLORS.reset}`);
    const reportTemplates = ['COMPREHENSIVE', 'SECTION_102_LIEN', 'FIR_ADDENDUM'];
    for (const tmpl of reportTemplates) {
      const repRes = await fetch(`${BASE_URL}/reports/CS-108?template=${tmpl}`, {
        headers: { 'x-investigator-role': 'INVESTIGATOR_LEAD' }
      });
      const repData = await repRes.json();
      assert(repRes.status === 200, `Report generated for template [${tmpl}]`);
      assert(repData.data?.template === tmpl, `Report payload matches template [${tmpl}]`);
      assert(repData.data?.caseOverview?.id === 'CS-108', `Report evidence bound to Case CS-108`);
      assert(!!repData.data?.legalDirectives?.section, `Statutory section 102 CrPC reference verified`);
    }

    // ---------------------------------------------------------
    // TEST 6: RBAC Clearance Boundary Enforcement
    // ---------------------------------------------------------
    console.log(`\n${COLORS.bold}6. RBAC Clearance & Permission Barriers${COLORS.reset}`);
    
    // Attempt 1: AUDITOR (Level 1) attempts to freeze account -> Must return 403 Forbidden
    const auditorFreezeRes = await fetch(`${BASE_URL}/accounts/918237491024/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-investigator-role': 'AUDITOR' // Level 1 (Read-Only)
      },
      body: JSON.stringify({ status: 'SUSPENDED', reason: 'Auditor Unauthorized Attempt' })
    });
    assert(auditorFreezeRes.status === 403, 'RBAC Level 1 (AUDITOR) correctly blocked from mutating account status (403 Forbidden)');

    // Attempt 2: INVESTIGATOR_LEAD (Level 3) executes Section 102 CrPC Lien -> Must return 200 OK
    const leadFreezeRes = await fetch(`${BASE_URL}/accounts/918237491024/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-investigator-role': 'INVESTIGATOR_LEAD' // Level 3 (Lead)
      },
      body: JSON.stringify({ status: 'SUSPENDED', reason: 'Section 102 CrPC Statutory Freeze Notice' })
    });
    const leadFreezeData = await leadFreezeRes.json();
    assert(leadFreezeRes.status === 200, 'RBAC Level 3 (INVESTIGATOR_LEAD) authorized to execute Section 102 CrPC freeze');
    assert(leadFreezeData.data?.status === 'SUSPENDED', 'Account status confirmed as SUSPENDED');

    // ---------------------------------------------------------
    // TEST 7: Forensic Audit Trail Integrity
    // ---------------------------------------------------------
    console.log(`\n${COLORS.bold}7. Forensic Audit Trail Verification${COLORS.reset}`);
    const auditRes = await fetch(`${BASE_URL}/audit-trail?limit=20`, {
      headers: { 'x-investigator-role': 'INVESTIGATOR_LEAD' }
    });
    const auditData = await auditRes.json();
    assert(auditRes.status === 200, 'Audit trail responds with 200 OK');
    assert(Array.isArray(auditData.data) && auditData.data.length > 0, `Audit trail log contains immutable entries (${auditData.data.length} records)`);
    
    const hasFreezeEvent = auditData.data.some(entry => 
      entry.actionType === 'ACCOUNT_LIEN_FREEZE' || 
      entry.endpoint?.includes('918237491024')
    );
    assert(hasFreezeEvent, 'Account freeze mutation event recorded in immutable audit trail');

    const hasSecurityViolation = auditData.data.some(entry => 
      entry.actionType === 'UNAUTHORIZED_ACCESS_BLOCKED' ||
      entry.statusCode === 403
    );
    assert(hasSecurityViolation, 'Auditor unauthorized mutation attempt recorded as security violation');

    // ---------------------------------------------------------
    // SUMMARY
    // ---------------------------------------------------------
    console.log(`\n${COLORS.bold}${COLORS.cyan}================================================================${COLORS.reset}`);
    console.log(`${COLORS.bold}TOTAL TESTS EXECUTED: ${passedTests + failedTests}${COLORS.reset}`);
    console.log(`${COLORS.bold}${COLORS.green}PASSED: ${passedTests}${COLORS.reset}`);
    console.log(`${COLORS.bold}${failedTests === 0 ? COLORS.green : COLORS.red}FAILED: ${failedTests}${COLORS.reset}`);
    console.log(`${COLORS.bold}${COLORS.cyan}================================================================${COLORS.reset}\n`);

    if (failedTests > 0) {
      process.exitCode = 1;
    } else {
      process.exitCode = 0;
    }
  } catch (error) {
    console.error(`\n${COLORS.red}FATAL ERROR DURING TEST EXECUTION:${COLORS.reset}`, error);
    process.exitCode = 1;
  }
}

runTestSuite();
