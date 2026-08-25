import {
  ArrowDown,
  ArrowLeftRight,
  Compass,
  Database,
  Globe,
  Layers,
  LayoutDashboard,
  RotateCcw,
  Server,
  UserCheck,
} from 'lucide-react'

export function MvcArchitectureDiagram() {
  return (
    <section className="my-10 overflow-hidden rounded-[24px] border border-white/10 bg-[rgba(11,14,21,0.85)] p-5 sm:p-7 lg:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-4 sm:pb-5">
        <div className="flex items-center gap-2 text-[#69e6cd]">
          <Layers size={16} />
          <p className="eyebrow text-[#69e6cd]">Visual Architecture</p>
        </div>
        <h3 className="display mt-1.5 text-xl sm:text-2xl font-bold text-[#f2f3f7]">
          Laravel MVC Request &amp; Data Flow Lifecycle
        </h3>
        <p className="muted mt-1 text-xs sm:text-sm leading-relaxed">
          Technical flow of an incoming HTTP request through Routing, Controller coordination, Model logic, external Database queries, and View presentation.
        </p>
      </div>

      {/* Structured Lifecycle Flow */}
      <div className="mx-auto mt-6 max-w-2xl space-y-1.5">
        {/* Step 1: User / Browser */}
        <div className="flex flex-col items-center">
          <div className="w-full rounded-xl border border-[rgba(97,218,251,0.3)] bg-[rgba(97,218,251,0.06)] p-3.5 transition hover:border-[rgba(97,218,251,0.45)]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[rgba(97,218,251,0.3)] bg-[rgba(97,218,251,0.1)] text-[#7dd3fc]">
                  <Globe size={16} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-[#747b8b]">01</span>
                    <span className="rounded-full border border-[rgba(97,218,251,0.25)] bg-[rgba(97,218,251,0.08)] px-2 py-0.2 text-[9px] font-semibold uppercase tracking-wider text-[#7dd3fc]">
                      Request Initiation
                    </span>
                  </div>
                  <h4 className="display mt-0.5 text-sm font-bold text-[#f2f3f7]">
                    User / Browser
                  </h4>
                </div>
              </div>
              <span className="hidden sm:inline font-mono text-[11px] text-[#747b8b]">
                HTTP GET / POST
              </span>
            </div>
            <p className="muted mt-1.5 pl-11 text-xs leading-relaxed">
              Client sends an HTTP request triggered by a form submission, link navigation, or API fetch.
            </p>
          </div>

          <div className="my-0.5 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#747b8b]">
              <ArrowDown size={12} className="text-[#69e6cd]" />
              <span>HTTP Request</span>
            </div>
          </div>
        </div>

        {/* Step 2: Route */}
        <div className="flex flex-col items-center">
          <div className="w-full rounded-xl border border-white/15 bg-white/[0.035] p-3.5 transition hover:border-white/25">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-white">
                  <Compass size={16} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-[#747b8b]">02</span>
                    <span className="rounded-full border border-white/15 bg-white/[0.04] px-2 py-0.2 text-[9px] font-semibold uppercase tracking-wider text-[#d9dee7]">
                      Request Mapping
                    </span>
                  </div>
                  <h4 className="display mt-0.5 text-sm font-bold text-[#f2f3f7]">
                    Route (routes/web.php · api.php)
                  </h4>
                </div>
              </div>
              <span className="hidden sm:inline font-mono text-[11px] text-[#747b8b]">
                URL Matching
              </span>
            </div>
            <p className="muted mt-1.5 pl-11 text-xs leading-relaxed">
              Routing engine evaluates URL path and HTTP verb, applying route middleware and dispatching to targeted Controller.
            </p>
          </div>

          <div className="my-0.5 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#747b8b]">
              <ArrowDown size={12} className="text-[#aa96ff]" />
              <span>Dispatches Action</span>
            </div>
          </div>
        </div>

        {/* Step 3: Controller (Entry) */}
        <div className="flex flex-col items-center">
          <div className="w-full rounded-xl border border-[rgba(240,83,64,0.3)] bg-[rgba(240,83,64,0.06)] p-3.5 transition hover:border-[rgba(240,83,64,0.45)]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[rgba(240,83,64,0.3)] bg-[rgba(240,83,64,0.1)] text-[#ff9c90]">
                  <Server size={16} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-[#747b8b]">03</span>
                    <span className="rounded-full border border-[rgba(240,83,64,0.25)] bg-[rgba(240,83,64,0.08)] px-2 py-0.2 text-[9px] font-semibold uppercase tracking-wider text-[#ffb5ac]">
                      Traffic Coordinator
                    </span>
                  </div>
                  <h4 className="display mt-0.5 text-sm font-bold text-[#f2f3f7]">
                    Controller (Receives &amp; Validates Request)
                  </h4>
                </div>
              </div>
              <span className="hidden sm:inline font-mono text-[11px] text-[#747b8b]">
                FormRequest &middot; Logic
              </span>
            </div>
            <p className="muted mt-1.5 pl-11 text-xs leading-relaxed">
              Coordinates incoming payload, validates inputs via FormRequest, and invokes the Model / Service layer.
            </p>
          </div>

          <div className="my-0.5 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#747b8b]">
              <ArrowDown size={12} className="text-[#c4b5fd]" />
              <span>Invokes Domain Query</span>
            </div>
          </div>
        </div>

        {/* Step 4: Model ↔ Database (Two-way Persistence Relationship) */}
        <div className="flex flex-col items-center">
          <div className="w-full rounded-2xl border border-[rgba(168,130,255,0.35)] bg-[rgba(18,16,28,0.8)] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition hover:border-[rgba(168,130,255,0.5)]">
            <div className="grid gap-3.5 sm:grid-cols-[1.1fr_auto_1.1fr] sm:items-center">
              {/* Model Card (MVC Domain Layer) */}
              <div className="rounded-xl border border-[rgba(168,130,255,0.3)] bg-[rgba(168,130,255,0.08)] p-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[rgba(168,130,255,0.15)] text-[#c4b5fd]">
                    <Layers size={15} />
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[9px] font-bold text-[#747b8b]">04A</span>
                      <span className="rounded border border-[rgba(168,130,255,0.3)] bg-[rgba(168,130,255,0.1)] px-1.5 py-0.2 text-[8.5px] font-semibold uppercase tracking-wider text-[#ddd6fe]">
                        MVC Component
                      </span>
                    </div>
                    <h5 className="display mt-0.5 text-xs sm:text-sm font-bold text-[#f2f3f7]">
                      Model (Eloquent ORM)
                    </h5>
                  </div>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-[#c4b8ff]">
                  Encapsulates business rules, casts, relationships, and queries.
                </p>
              </div>

              {/* 2-Way Connection Indicator */}
              <div className="flex flex-row items-center justify-center gap-1.5 sm:flex-col">
                <span className="rounded-full border border-white/15 bg-[#090d15] p-1.5 text-[#2bd9b5]">
                  <ArrowLeftRight size={13} />
                </span>
                <span className="text-[9.5px] font-mono text-[#747b8b] text-center">
                  SQL Queries <br className="hidden sm:inline" />&harr; Rows
                </span>
              </div>

              {/* Database Card (External Persistence Engine - NOT MVC) */}
              <div className="rounded-xl border border-[rgba(245,158,11,0.35)] bg-[rgba(245,158,11,0.07)] p-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[rgba(245,158,11,0.15)] text-[#fbbf24]">
                    <Database size={15} />
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[9px] font-bold text-[#747b8b]">04B</span>
                      <span className="rounded border border-[rgba(245,158,11,0.35)] bg-[rgba(245,158,11,0.12)] px-1.5 py-0.2 text-[8.5px] font-semibold uppercase tracking-wider text-[#fde68a]">
                        External &middot; Not MVC
                      </span>
                    </div>
                    <h5 className="display mt-0.5 text-xs sm:text-sm font-bold text-[#f2f3f7]">
                      Database (MySQL)
                    </h5>
                  </div>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-[#fef3c7]/80">
                  External persistence storage executing raw SQL transactions.
                </p>
              </div>
            </div>
          </div>

          <div className="my-0.5 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#747b8b]">
              <ArrowDown size={12} className="text-[#ff9c90]" />
              <span>Hydrated Models Return to Controller</span>
            </div>
          </div>
        </div>

        {/* Step 5: Controller (Post-Model Delegation) */}
        <div className="flex flex-col items-center">
          <div className="w-full rounded-xl border border-[rgba(240,83,64,0.3)] bg-[rgba(240,83,64,0.06)] p-3.5 transition hover:border-[rgba(240,83,64,0.45)]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[rgba(240,83,64,0.3)] bg-[rgba(240,83,64,0.1)] text-[#ff9c90]">
                  <RotateCcw size={16} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-[#747b8b]">05</span>
                    <span className="rounded-full border border-[rgba(240,83,64,0.25)] bg-[rgba(240,83,64,0.08)] px-2 py-0.2 text-[9px] font-semibold uppercase tracking-wider text-[#ffb5ac]">
                      Response Delegation
                    </span>
                  </div>
                  <h4 className="display mt-0.5 text-sm font-bold text-[#f2f3f7]">
                    Controller (Processes Model Results)
                  </h4>
                </div>
              </div>
              <span className="hidden sm:inline font-mono text-[11px] text-[#747b8b]">
                Prepares Response
              </span>
            </div>
            <p className="muted mt-1.5 pl-11 text-xs leading-relaxed">
              Controller receives fetched entity collections, applies formatting or status headers, and forwards data to the Presentation layer.
            </p>
          </div>

          <div className="my-0.5 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#747b8b]">
              <ArrowDown size={12} className="text-[#aa96ff]" />
              <span>Passes Prepared Data</span>
            </div>
          </div>
        </div>

        {/* Step 6: View / JSON Response */}
        <div className="flex flex-col items-center">
          <div className="w-full rounded-xl border border-[rgba(124,92,255,0.3)] bg-[rgba(124,92,255,0.06)] p-3.5 transition hover:border-[rgba(124,92,255,0.45)]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[rgba(124,92,255,0.3)] bg-[rgba(124,92,255,0.1)] text-[#aa96ff]">
                  <LayoutDashboard size={16} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-[#747b8b]">06</span>
                    <span className="rounded-full border border-[rgba(124,92,255,0.25)] bg-[rgba(124,92,255,0.08)] px-2 py-0.2 text-[9px] font-semibold uppercase tracking-wider text-[#c4b8ff]">
                      Presentation Layer
                    </span>
                  </div>
                  <h4 className="display mt-0.5 text-sm font-bold text-[#f2f3f7]">
                    View / JSON Response (Blade Template &middot; REST JSON)
                  </h4>
                </div>
              </div>
              <span className="hidden sm:inline font-mono text-[11px] text-[#747b8b]">
                HTML / JSON
              </span>
            </div>
            <p className="muted mt-1.5 pl-11 text-xs leading-relaxed">
              Formats model data into human-readable HTML markup (Blade) or serialized JSON payloads with HTTP status codes.
            </p>
          </div>

          <div className="my-0.5 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#747b8b]">
              <ArrowDown size={12} className="text-[#2bd9b5]" />
              <span>Delivers Output</span>
            </div>
          </div>
        </div>

        {/* Step 7: User / Browser (Feedback) */}
        <div className="flex flex-col items-center">
          <div className="w-full rounded-xl border border-[rgba(43,217,181,0.35)] bg-[rgba(43,217,181,0.08)] p-3.5 transition hover:border-[rgba(43,217,181,0.5)]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[rgba(43,217,181,0.35)] bg-[rgba(43,217,181,0.12)] text-[#2bd9b5]">
                  <UserCheck size={16} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-[#747b8b]">07</span>
                    <span className="rounded-full border border-[rgba(43,217,181,0.3)] bg-[rgba(43,217,181,0.1)] px-2 py-0.2 text-[9px] font-semibold uppercase tracking-wider text-[#2bd9b5]">
                      Response Delivery
                    </span>
                  </div>
                  <h4 className="display mt-0.5 text-sm font-bold text-[#f2f3f7]">
                    User / Browser (Client Renders Output)
                  </h4>
                </div>
              </div>
              <span className="hidden sm:inline font-mono text-[11px] text-[#2bd9b5]">
                200 OK &middot; Rendered
              </span>
            </div>
            <p className="muted mt-1.5 pl-11 text-xs leading-relaxed">
              Browser receives the completed response, rendering the web interface or updating client-side state.
            </p>
          </div>
        </div>
      </div>

      {/* Explanatory Narrative Box Below Diagram */}
      <div className="mt-7 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5 text-xs leading-relaxed text-[#d9dee7]">
        <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-2.5 mb-3">
          <p className="font-semibold text-[#69e6cd] text-xs uppercase tracking-wider">
            7-Step Lifecycle Summary
          </p>
          <span className="font-mono text-[10px] text-[#747b8b]">
            Request &rarr; Response
          </span>
        </div>

        <ol className="space-y-2 text-[#d9dee7]">
          <li className="flex items-start gap-2.5">
            <span className="font-mono text-[10px] font-bold text-[#69e6cd] shrink-0 mt-0.5">1.</span>
            <span><strong className="text-white">User / Browser:</strong> Initiates an HTTP request from the client.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-mono text-[10px] font-bold text-[#69e6cd] shrink-0 mt-0.5">2.</span>
            <span><strong className="text-white">Route:</strong> Maps the URL/verb and dispatches the targeted Controller.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-mono text-[10px] font-bold text-[#69e6cd] shrink-0 mt-0.5">3.</span>
            <span><strong className="text-white">Controller:</strong> Validates the payload and requests data from the Model layer.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-mono text-[10px] font-bold text-[#69e6cd] shrink-0 mt-0.5">4.</span>
            <span><strong className="text-white">Model &harr; Database:</strong> Model queries MySQL, which returns rows hydrated into Eloquent models. <span className="text-[#fde68a]/90 font-medium">(Database is external persistence, not part of MVC core)</span>.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-mono text-[10px] font-bold text-[#69e6cd] shrink-0 mt-0.5">5.</span>
            <span><strong className="text-white">Controller:</strong> Receives hydrated data and delegates it to the presentation layer.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-mono text-[10px] font-bold text-[#69e6cd] shrink-0 mt-0.5">6.</span>
            <span><strong className="text-white">View / JSON Response:</strong> Renders HTML (Blade) or serializes API JSON.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-mono text-[10px] font-bold text-[#69e6cd] shrink-0 mt-0.5">7.</span>
            <span><strong className="text-white">User / Browser:</strong> Receives rendered page or JSON feedback in browser.</span>
          </li>
        </ol>
      </div>
    </section>
  )
}
