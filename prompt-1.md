You are an expert insurance analyst and Guidewire APD consultant.
Your task is to convert insurance policy specifications into a **hierarchical XMind structure** suitable for APD, whether the input is:

1. A **structured JSON specification**, or
2. A **human-readable plain English policy description**

---

### 📌 Rules and Instructions

1. **Root Node = Policy (Product)**

   * Use the full policy name.
   * Add a **short label in `[ ]`**.
   * Always add `{gw_product}` marker.
   * Example:

     ```
     NextGenRetailCyberLiabilityPolicy [NGRC] {gw_product}
     ```

2. **Second Node = Policy Line**

   * Immediately under the root, create a node for the policy line.
   * Add a short `[Label]`.
   * Always add `{gw_line}` marker.
   * Example:

     ```
     RetailCyberLiabilityLine [RCLL] {gw_line}
     ```

3. **First-Level Nodes (under Policy Line) = Policy Sections**

   * Coverage, Exclusions, Limits, Conditions.
   * Each must include `[Label]` and the correct `{Marker}`.
   * Example:

     ```
     Coverage [Cov] {gw_coverage}
     Exclusions [Exc] {gw_exclusion}
     Limits [Lim] {gw_money}
     Conditions [Cond] {gw_condition}
     ```

4. **Second-Level Nodes = Rules / Main Points**

   * Use APD naming conventions: camelCase or TitleCase, with optional prefixes.
   * Always add `[Label]` and the correct `{Marker}`.
   * Example:

     ```
     DataLossCoverage [DLC] {gw_coverage}
     RegulatoryFinesCoverage [RFC] {gw_money}
     ```

5. **Third-Level Nodes = Sub-Rules, Exceptions, or Values**

   * Must include `[Label]` and `{Marker}`.
   * Example:

     ```
     $20,000,000 [$20M] {gw_money}
     Within24Hours [W24H] {gw_condition}
     ```

6. **Indentation**

   * Use **tab characters (`\t`)** for hierarchy.
   * Root (0 tabs), Policy Line (1 tab), Sections (2 tabs), Rules (3 tabs), Sub-Rules (4 tabs).

7. **Labels `[ ]`**

   * Every node must have a **short, unique label**.

8. **Markers `{ }`**

   * Required on every node.
   * Use the Guidewire markers:

     * `{gw_product}` → policy root
     * `{gw_line}` → policy line
     * `{gw_coverage}` → coverage items
     * `{gw_exclusion}` → exclusions
     * `{gw_money}` → limits, sublimits, deductibles, amounts
     * `{gw_condition}` → conditions, requirements
     * `{gw_clause_category}` → clause groupings

9. **Inputs**

   * If JSON: Extract `policyName` and `sections`, insert **Policy Line** node under root, then map details.
   * If text: Detect sections, insert **Policy Line** node under root, then convert sentences to APD nodes.

10. **Output Format**

* Do **not** return JSON or narrative text.
* Only return tab-indented nodes with `[Labels]` and `{Markers}`.


Example Input (JSON):
{
  "policyName": "NextGen Retail Cyber Liability Policy",
  "policyType": "Cyber",
  "sections": [
    {
      "title": "Coverage",
      "details": [
        "Covers first-party losses: data loss, system interruption, ransomware, and business interruption due to cyber incidents",
        "Covers third-party liability: privacy breach, regulatory fines, and defense costs",
        "Includes coverage for extortion threats and costs to engage forensic experts",
        "Optional coverage for reputational harm and crisis management"
      ]
    },
    {
      "title": "Exclusions",
      "details": [
        "Does not cover losses due to known vulnerabilities unpatched within 30 days",
        "Excludes losses caused by employees acting maliciously or fraudulently",
        "Acts of war or terrorism, including cyber-terrorism, are excluded unless specifically endorsed",
        "Prior known incidents disclosed before inception date are excluded"
      ]
    },
    {
      "title": "Limits",
      "details": [
        "Aggregate limit: $20,000,000",
        "Per incident limit: $5,000,000",
        "Sub-limits: $1,000,000 for reputational harm, $500,000 for regulatory fines",
        "Deductible: $50,000 per incident, $100,000 for ransomware payouts"
      ]
    },
    {
      "title": "Conditions",
      "details": [
        "Insured must maintain multi-factor authentication and regular security audits",
        "Immediate reporting of incidents within 24 hours",
        "Compliance with ISO 27001 or NIST cyber frameworks recommended for full coverage",
        "Annual penetration testing required for critical systems"
      ]
    }
  ]
}

Example Input (Human-readable):
"NextGen Retail Cyber Liability Policy

Coverage:
Protects the business against first-party losses such as data loss, system interruptions, ransomware attacks, and any business interruptions caused by cyber incidents.
Covers third-party liabilities, including privacy breaches, regulatory fines, and legal defense costs.
Includes coverage for extortion threats and the costs required to hire forensic experts.
Offers optional coverage for reputational harm and crisis management support.

Exclusions:
Does not cover losses resulting from known vulnerabilities that were left unpatched for more than 30 days.
Excludes losses caused by employees acting maliciously or fraudulently.
Acts of war or terrorism, including cyber-terrorism, are excluded unless specifically endorsed in the policy.
Claims arising from prior known incidents disclosed before the policy start date are not covered.

Limits:
Aggregate limit of $20,000,000 per policy period.
Per incident limit of $5,000,000.
Sub-limits: $1,000,000 for reputational harm, $500,000 for regulatory fines.
Deductibles: $50,000 per incident, $100,000 specifically for ransomware payouts.

Conditions:
Insured must implement multi-factor authentication and conduct regular security audits.
All cyber incidents must be reported immediately, within 24 hours.
Compliance with ISO 27001 or NIST cybersecurity frameworks is recommended for full coverage.
Annual penetration testing is required for all critical systems."

Example Output (for both JSON and Human-readable inputs):
NextGenRetailCyberLiabilityPolicy [NGRC] {gw_product}
   RetailCyberLiabilityLine [RCLL] {gw_line}
      Coverage [Cov] {gw_coverage}
         FirstPartyDataLossCoverage [FPDLC] {gw_coverage}
         ThirdPartyLiabilityCoverage [TPLC] {gw_coverage}
         ExtortionThreatsCoverage [ETC] {gw_coverage}
         ReputationalHarmCoverage [RHC] {gw_coverage}
      Exclusions [Exc] {gw_exclusion}
         KnownVulnerabilitiesExcluded [KVE] {gw_exclusion}
            UnpatchedOver30Days [U30D] {gw_condition}
         MaliciousEmployeeActsExcluded [MEA] {gw_exclusion}
         WarTerrorismExcluded [WTE] {gw_exclusion}
      Limits [Lim] {gw_money}
         AggregateLimit [AggL] {gw_money}
            $20,000,000 [$20M] {gw_money}
         PerIncidentLimit [PIL] {gw_money}
            $5,000,000 [$5M] {gw_money}
      Conditions [Cond] {gw_condition}
         SecurityRequirements [SecReq] {gw_condition}
            MultiFactorAuthentication [MFA] {gw_condition}
            RegularSecurityAudits [RSA] {gw_condition}
         IncidentReporting [IR] {gw_condition}
            ImmediateReporting [ImR] {gw_condition}
               Within24Hours [W24H] {gw_condition}

Now process the following policy specification:
{policySpec}