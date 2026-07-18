# Parqo AI-Native GTM Platform Architecture

Status: Recommended high-level target architecture  
Date: 2026-07-09

## 1. Objective

Turn the acquisition website into an AI-native GTM platform that captures employer demand and hotel/facility supply, qualifies and nurtures leads, keeps humans in control of commercial decisions, and surfaces district-level pilot opportunities.

The key shift is from a static website-to-Airtable flow to a durable lead operations platform:

```text
Capture intent → enrich and qualify → recommend next action → nurture → match supply and demand → promote to marketplace records
```

## 2. Platform view

```mermaid
flowchart TB
  subgraph Capture[Public capture surfaces]
    Landing[District landing pages]
    Forms[Employer and hotel forms]
    Chat[AI guided website assistant]
    WhatsApp[WhatsApp click-to-chat]
    Phone[Inbound phone / voice agent]
    Email[Outbound and reply email]
  end

  subgraph Intake[Public intake API]
    PublicAPI[Public intake endpoints]
    Validate[Validation, consent, rate limits]
    Dedupe[Dedupe and receipt ID]
  end

  subgraph LeadOps[Lead operations store]
    LeadProfiles[Lead profiles]
    IntakeEvents[Lead intake events]
    Touchpoints[Touchpoints and conversations]
    AIArtifacts[AI summaries, drafts, call notes]
    NurtureTasks[Nurture tasks]
    DistrictSignals[District signals]
  end

  subgraph Intelligence[AI and rules intelligence]
    Normalize[Normalize area, district, budget, phone]
    Score[Deterministic qualification scoring]
    Enrich[Company/contact/context enrichment]
    Summarize[AI summary and missing fields]
    NextAction[Next-best-action recommendation]
    MatchHints[Supply/demand match hints]
  end

  subgraph Workflow[Durable workflow layer]
    Outbox[Postgres outbox events]
    Workers[Scheduled workers]
    Notify[Founder alerts]
    Sync[Airtable sync]
    Nurture[Nurture sequence execution]
    Routing[Human/agent routing]
  end

  subgraph Operator[Operator surfaces]
    Airtable[Airtable lead desk]
    StaffConsole[Staff lead and district console]
    DailyBrief[AI daily GTM brief]
  end

  subgraph Marketplace[Canonical marketplace records]
    EmployerProfiles[Employer profiles]
    DemandRequests[Demand requests]
    Properties[Properties and facilities]
    Availability[Inventory and availability]
    MatchRuns[Match runs and candidates]
    Proposals[Proposals and pilots]
  end

  Capture --> PublicAPI
  PublicAPI --> Validate --> Dedupe --> IntakeEvents
  IntakeEvents --> Outbox
  Outbox --> Workers
  Workers --> Normalize --> Score --> Enrich --> Summarize --> NextAction --> MatchHints
  MatchHints --> LeadProfiles
  LeadProfiles --> Touchpoints
  LeadProfiles --> AIArtifacts
  LeadProfiles --> NurtureTasks
  LeadProfiles --> DistrictSignals
  Workers --> Notify
  Workers --> Sync
  Workers --> Nurture
  Workers --> Routing
  Notify --> StaffConsole
  Sync --> Airtable
  DistrictSignals --> StaffConsole
  AIArtifacts --> StaffConsole
  NurtureTasks --> StaffConsole
  StaffConsole --> EmployerProfiles
  StaffConsole --> DemandRequests
  StaffConsole --> Properties
  StaffConsole --> Availability
  DemandRequests --> MatchRuns
  Availability --> MatchRuns
  MatchRuns --> Proposals
```

## 3. Lead lifecycle

```mermaid
sequenceDiagram
  participant Visitor as Employer or hotel visitor
  participant Site as Website / chat / WhatsApp
  participant API as Public intake API
  participant DB as Lead operations store
  participant Outbox as Outbox worker
  participant AI as Lead intelligence
  participant Founder as Founder / operator
  participant CRM as Airtable or staff console
  participant Market as Marketplace records

  Visitor->>Site: Shares parking demand or supply intent
  Site->>API: Submit intake payload
  API->>API: Validate, rate limit, consent check, dedupe
  API->>DB: Store lead_intake_event and receipt
  API-->>Visitor: Return receipt / success
  DB->>Outbox: Emit lead.intake_received
  Outbox->>AI: Normalize, score, enrich, summarize
  AI->>DB: Store score, AI summary, next action, nurture plan
  AI->>CRM: Sync operational view
  AI->>Founder: Send hot lead alert / daily brief
  Founder->>CRM: Call, WhatsApp, qualify, update status
  CRM->>DB: Store touchpoint and qualification update
  DB->>AI: Recompute match hints and district signals
  Founder->>Market: Promote qualified lead to demand request or facility
  Market->>Market: Run match, create proposal, launch pilot
```

## 4. Data model extension

```mermaid
erDiagram
  lead_profiles ||--o{ lead_intake_events : receives
  lead_profiles ||--o{ lead_touchpoints : has
  lead_profiles ||--o{ lead_ai_artifacts : has
  lead_profiles ||--o{ lead_nurture_tasks : schedules
  lead_profiles }o--|| districts : belongs_to
  districts ||--o{ district_signals : aggregates
  lead_profiles }o--o{ demand_requests : promotes_to
  lead_profiles }o--o{ properties : promotes_to
  properties ||--o{ facilities : contains
  facilities ||--o{ inventory_pools : has
  inventory_pools ||--o{ availability_windows : exposes
  demand_requests ||--o{ match_runs : triggers
  availability_windows ||--o{ match_candidates : considered_in
  match_runs ||--o{ match_candidates : produces
  match_candidates ||--o{ proposals : can_create

  lead_profiles {
    uuid id
    string kind
    string organization_name
    string contact_name
    string phone
    string email
    string status
    int qualification_score
    string score_band
    string ai_summary
    string ai_next_action
    timestamp next_touch_due_at
  }

  lead_intake_events {
    uuid id
    uuid lead_profile_id
    string channel
    json raw_payload
    json normalized_payload
    string dedupe_key
    timestamp received_at
  }

  lead_touchpoints {
    uuid id
    uuid lead_profile_id
    string channel
    string direction
    string status
    string message_summary
    timestamp occurred_at
  }

  lead_ai_artifacts {
    uuid id
    uuid lead_profile_id
    string artifact_type
    string model
    string prompt_version
    json input_snapshot
    text output
    timestamp created_at
  }

  lead_nurture_tasks {
    uuid id
    uuid lead_profile_id
    string task_type
    timestamp due_at
    string status
    text suggested_copy
    timestamp completed_at
  }

  district_signals {
    uuid id
    uuid district_id
    int employer_leads
    int hotel_leads
    int spaces_requested
    int spaces_available
    string ai_recommendation
    timestamp computed_at
  }
```

## 5. Event and workflow model

```mermaid
flowchart LR
  A[lead.intake_received] --> B[lead.normalization_requested]
  B --> C[lead.qualification_scored]
  C --> D[lead.ai_summary_requested]
  D --> E[lead.ai_summary_completed]
  E --> F{Hot lead?}
  F -- yes --> G[lead.hot_alert_requested]
  F -- no --> H[lead.nurture_planned]
  G --> I[notification.sent]
  H --> J[nurture.task_created]
  C --> K[airtable.sync_requested]
  K --> L[airtable.synced]
  E --> M[district.signal_recomputed]
  M --> N{Supply/demand overlap?}
  N -- yes --> O[match_hint.created]
  O --> P[operator.review_requested]
```

Recommended initial event types:

- `lead.intake_received`
- `lead.qualification_scored`
- `lead.ai_summary_requested`
- `lead.ai_summary_completed`
- `lead.hot_alert_requested`
- `lead.nurture_planned`
- `lead.followup_overdue`
- `airtable.sync_requested`
- `district.signal_recomputed`
- `match_hint.created`
- `operator.review_requested`

## 6. Agent authority model

```mermaid
flowchart TB
  subgraph Auto[Agent may do automatically]
    Auto1[Classify and score leads]
    Auto2[Summarize conversations]
    Auto3[Draft WhatsApp/email follow-up]
    Auto4[Create internal tasks]
    Auto5[Detect missing fields]
    Auto6[Suggest district match hints]
  end

  subgraph Approval[Agent requires human approval]
    Approval1[Send outbound nurture]
    Approval2[Place warm-up calls]
    Approval3[Mark lead qualified]
    Approval4[Create proposal draft]
    Approval5[Book meeting on behalf of founder]
  end

  subgraph Never[Agent must not do]
    Never1[Promise parking availability]
    Never2[Set final commercial terms]
    Never3[Commit capacity]
    Never4[Approve access credentials]
    Never5[Issue final invoices or tax documents]
    Never6[Change privacy or retention policy]
  end
```

## 7. Recommended implementation phases

### Phase 1: Intelligence inside current stack

- Keep the current public website and Airtable workflow.
- Add AI summary, deterministic score explanation, next action, and suggested WhatsApp/email copy.
- Store these outputs in Airtable metadata fields and founder notifications.

### Phase 2: Durable lead operations store

- Add Postgres tables for lead profiles, intake events, touchpoints, AI artifacts, nurture tasks, and district signals.
- Make Airtable a synced operator view rather than the source of truth.
- Add outbox events for enrichment, notifications, Airtable sync, and nurture.

### Phase 3: Staff lead and district console

- Build `/staff/leads`, `/staff/districts`, `/staff/matches`, and `/staff/nurture`.
- Promote qualified leads into canonical demand requests, properties, facilities, inventory, and availability windows.

### Phase 4: Conversational and multi-channel agents

- Add an AI guided website assistant.
- Add WhatsApp/email nurture agents with human approval.
- Add voice qualification only after consent, conversation storage, and authority controls exist.
