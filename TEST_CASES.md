# Student-to-Student Marketplace (CampusLoop) — Functional QA and User Evaluation Plan

Use this document with Assessment 3, Section 3.6 (Prototype Evaluation). **No participant test results have been invented.**

## A. Functional developer smoke test

Automated developer checks performed on this JCU-specific version using a Chromium browser with in-memory page assets. All 20 automated checks passed; the checks below summarise the core cases:

| ID | Verification | Developer check |
|---|---|---|
| F01 | Initial page shows 12 demonstration product listings | Passed |
| F02 | Searching for “lamp” narrows results to one product | Passed |
| F03 | Save an item and see it on Saved page | Passed |
| F04 | Selling action asks for JCU-format demo email first | Passed |
| F05 | Create a listing and see it in My listings | Passed |
| F06 | Edit listing price and view changed value | Passed |
| F07 | Mark a listing as sold | Passed |
| F08 | Open a product detail and start demo conversation | Passed |
| F09 | Type and display an outgoing simulated message | Passed |
| F10 | Desktop page reports no uncaught JavaScript errors | Passed |
| F11 | Mobile page at 390 px reports no horizontal overflow | Passed |
| F12 | A non-`@jcu.edu` address is rejected in the demo sign-in form | Passed (Chromium developer test) |
| F13 | Default items and new listings use James Cook University Singapore as the location | Passed (Chromium developer test) |

**Caveat:** These are developer-side checks, not a usability experiment, real user research, penetration test or production security verification. Cross-browser testing and persistent-storage behavior in each participant's browser should be checked separately.

## B. Proposed primary usability research — record genuine results

Recruit **8–12 voluntary student testers** if feasible, with a mix of potential buyers and sellers. Avoid collecting full names, real university addresses, passwords or student IDs. If you have fewer participants, report the actual sample rather than claiming you met this suggested range.

**Suggested participant tasks**

1. Find a textbook below S$25 using search and filters.
2. Open its listing and identify condition and proposed handover location.
3. Save that listing and find it again on the Saved page.
4. Enter the fictional test email `student@jcu.edu` and create a listing.
5. Edit the listing price, then mark it sold.
6. Start a simulated conversation and send a mock question.

For each attempt, record the actual start/end times, whether it was completed without assistance, issues and ease-of-use rating from 1 (very difficult) to 5 (very easy). **Only record times from real observations.**

## C. Proposed evaluation metrics

| Metric | Formula / collection | Proposed criterion — not a result |
|---|---|---|
| Task completion rate | Successful tasks ÷ attempted tasks × 100% | ≥80% overall |
| Time to find an item | Time from start to correct listing | Report median in seconds; compare after iteration |
| Time to publish listing | Start of form to successful creation | Report median in seconds; set threshold after pilot |
| Perceived ease of use | Average of post-task ratings (1–5) | ≥4.0/5 |
| Critical defects | Count of defects that block core tasks | 0 unresolved at project sign-off |
| Issue resolution | Closed confirmed issues ÷ all confirmed issues × 100% | Report actual percentage |

Sample results in the proposal or this workbook should never be presented as actual participants' findings. With a small convenience sample, findings are exploratory and not statistically representative of all university students.

## D. Iteration log (fill with real evidence)

| Date | Evidence source | Observed issue | Change implemented | Before/after proof | Retest outcome |
|---|---|---|---|---|---|
| [Actual date] | [User ID/test notes] | [Genuine issue] | [Commit or design change] | [Screenshots/commit] | [Measured result] |
| [Actual date] | [User ID/test notes] | [Genuine issue] | [Commit or design change] | [Screenshots/commit] | [Measured result] |

## E. PebblePad evidence checklist

- Screenshot of homepage and product listing/filter flow.
- Screenshot of the listing creation form, edit screen and My listings page.
- Screenshot of a demo chat clearly marked **simulated**.
- Figma/design rationale if available, plus linked source repository.
- Actual participant consent/recruitment summary and anonymous raw response data.
- Completed usability testing spreadsheet and metrics (with denominators).
- At least one documented design improvement with a before/after visual comparison.
- Five **genuine**, dated meeting agendas and minutes with action owners.
- Accurate planned-versus-actual Gantt chart and individual contribution evidence.
- Financial assumptions checked against real quotations or disclosed as assumptions.
