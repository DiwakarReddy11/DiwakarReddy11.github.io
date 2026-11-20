/* =========================================================
   SITE CONTENT: every text, image, project, education entry and
   certificate on the portfolio comes from this file.

   Easiest way to edit: open the site with ?edit at the end of the
   address (for example index.html?edit), make your changes in the
   editor, click "Download content.js" and replace this file with it.

   Images can be uploaded in the editor (they are stored inside this
   file) or set to a path such as "assets/photo.jpg".
   ========================================================= */
window.CONTENT = {
  "profile": {
    "name": "Diwakar Reddy",
    "photo": "",
    "badge": "Applied AI Engineer · Accenture · Hyderabad, India",
    "typedPrefix": "I build",
    "typedRoles": [
      "production RAG pipelines.",
      "multi-agent systems with LangGraph.",
      "LLM evaluation & CI quality gates.",
      "NL-to-SQL engines.",
      "MCP servers for AI assistants."
    ],
    "summary": "2.5+ years shipping production Generative AI: RAG pipelines, agentic workflows with LangGraph, NL-to-SQL and LLM evaluation. I treat quality as something you measure with golden datasets, RAGAS and DeepEval metrics, and CI quality gates.",
    "floatingTags": [
      "RAG",
      "LangGraph",
      "RAGAS",
      "MCP"
    ],
    "stats": [
      {
        "pre": "",
        "v": 2.5,
        "dec": 1,
        "suf": "+",
        "label": "Years in production GenAI"
      },
      {
        "pre": "",
        "v": 1000,
        "dec": 0,
        "suf": "+",
        "label": "Documents served by my RAG system"
      },
      {
        "pre": "",
        "v": 89.6,
        "dec": 1,
        "suf": "%",
        "label": "Obligation coverage, multi-agent testgen"
      },
      {
        "pre": "",
        "v": 6,
        "dec": 0,
        "suf": "",
        "label": "End-to-end AI systems built"
      }
    ],
    "email": "divakarreddyvengalreddy1107@gmail.com",
    "linkedin": "https://www.linkedin.com/in/diwakar-reddy-a46508236/",
    "github": "https://github.com/DiwakarReddy11",
    "resume": "assets/Diwakar_Reddy_Resume.pdf",
    "location": "Hyderabad, India"
  },
  "about": {
    "title1": "Making LLMs",
    "title2": "reliable in production.",
    "photo": "",
    "paragraphs": [
      "I'm an <strong>Applied AI Engineer at Accenture</strong>, working with Pfizer, where I architected a production RAG system that engineering teams use to search more than 1,000 technical documents.",
      "Calling an LLM is the easy part. My work is everything around the call: <strong>hybrid retrieval and reranking</strong>, <strong>guardrails</strong> against bad input and bad output, <strong>retries and idempotency</strong> so the system survives failures, and <strong>evaluation</strong> that shows whether a change made things better or worse.",
      "Outside work I build open-source AI systems end to end, from ingestion to CI quality gates, most of them on free infrastructure."
    ],
    "principles": [
      {
        "icon": "chart",
        "title": "Evaluation first",
        "text": "I define what \"correct\" means with hand-labelled golden datasets before I build the system."
      },
      {
        "icon": "search",
        "title": "Retrieval is the product",
        "text": "Hybrid BM25 + dense search, reranking and HyDE, tuned with measured thresholds rather than guesses."
      },
      {
        "icon": "shield",
        "title": "Guardrails at every stage",
        "text": "PII masking, prompt-injection detection, schema validation, token budgets and model fallbacks."
      },
      {
        "icon": "server",
        "title": "Built to survive production",
        "text": "Async I/O, retries, idempotent requests, advisory locks and structured logs."
      }
    ]
  },
  "experience": [
    {
      "company": "Accenture Solutions Pvt. Ltd.",
      "logo": "",
      "role": "AI Engineer · Pfizer client",
      "dates": "Mar 2024 – Present",
      "bullets": [
        "Architected and deployed a production RAG system for document retrieval across 1,000+ technical documents, making it faster for engineering teams to find information.",
        "Optimised the retrieval pipeline with hybrid search, vector embeddings, metadata filtering and reranking.",
        "Improved REST API performance and conversational response orchestration through asynchronous processing and backend optimisation.",
        "Made the application more reliable with retry mechanisms, idempotent request handling, PostgreSQL advisory locking and structured logging."
      ],
      "metrics": [
        {
          "pre": "+",
          "v": 20,
          "dec": 0,
          "suf": "%",
          "label": "retrieval accuracy"
        },
        {
          "pre": "+",
          "v": 25,
          "dec": 0,
          "suf": "%",
          "label": "response relevance"
        },
        {
          "pre": "−",
          "v": 150,
          "dec": 0,
          "suf": "ms",
          "label": "end-to-end latency"
        },
        {
          "pre": "−",
          "v": 35,
          "dec": 0,
          "suf": "%",
          "label": "processing failures"
        }
      ]
    }
  ],
  "education": [
    {
      "level": "Undergraduate",
      "degree": "B.Tech, Electronics and Communication Engineering",
      "school": "Kakatiya Institute of Technology and Science",
      "location": "Warangal, Telangana",
      "years": "2019 – 2023",
      "scoreLabel": "CGPA",
      "score": 9.0,
      "scoreMax": 10,
      "logo": "",
      "details": "Graduated with a CGPA of 9.0 out of 10."
    },
    {
      "level": "Secondary School",
      "degree": "Class 10",
      "school": "Montessori High School",
      "location": "Alampur, Jogulamba Gadwal District, Telangana",
      "years": "",
      "scoreLabel": "",
      "score": null,
      "scoreMax": 10,
      "logo": "",
      "details": ""
    }
  ],
  "projects": [
    {
      "id": "multi-agent-testgen",
      "title": "Multi-Agent Test Case Generation System",
      "short": "Five LangGraph agents turn a requirements document into traceable, validated test cases, measured against hand-labelled golden datasets.",
      "tagline": "Five AI agents work as a team to turn a Software Requirements Specification into an Excel workbook of traceable test cases. Every result is scored against a hand-made answer key, and it all runs on free LLM tiers.",
      "status": "live",
      "repo": "https://github.com/DiwakarReddy11/Multi-Agent-TestCase-Generation",
      "glow": "#5eead4",
      "problem": "Writing test cases by hand is slow: boundary values get missed, tests get duplicated, and nobody records which test covers which requirement. Asking an LLM directly is worse. It invents rules the document never states, writes vague results like \"works as expected\" and gives you no way to measure quality.",
      "solution": "A LangGraph pipeline with five specialised agents, a self-correcting refinement loop, guardrails at every stage and SQLite checkpointing for human-in-the-loop review. Correctness was defined with golden datasets before any agent was built, and a CI quality gate enforces it.",
      "metrics": [
        {
          "v": 89.6,
          "dec": 1,
          "suf": "%",
          "label": "Obligation coverage (60 of 67, target 85%)"
        },
        {
          "v": 0.97,
          "dec": 2,
          "label": "Requirement extraction F1"
        },
        {
          "v": 100,
          "suf": "%",
          "label": "Retrieval hit rate on both datasets"
        },
        {
          "v": 0,
          "pre": "$",
          "label": "Running cost, entirely on free LLM tiers"
        }
      ],
      "flow": {
        "steps": [
          {
            "icon": "doc",
            "t": "SRS Upload",
            "s": "PDF, DOCX, MD or TXT"
          },
          {
            "icon": "shield",
            "t": "Input Guardrails",
            "s": "PII masking · Prompt Guard 2"
          },
          {
            "icon": "db",
            "t": "Index",
            "s": "Chunk · embed · Chroma"
          },
          {
            "icon": "bot",
            "t": "Requirement Analyst",
            "s": "Atomic reqs, IDs set by code"
          },
          {
            "icon": "spark",
            "t": "Test Generator",
            "s": "RAG per requirement"
          },
          {
            "icon": "check",
            "t": "Validator",
            "s": "Different model, rejects with reason"
          },
          {
            "icon": "copy",
            "t": "De-duplicator",
            "s": "Meaning + identical numbers"
          },
          {
            "icon": "chart",
            "t": "Coverage Analyzer",
            "s": "Deterministic code, no LLM"
          },
          {
            "icon": "user",
            "t": "Review & Export",
            "s": "HITL · Excel / CSV / JSON"
          }
        ],
        "loop": {
          "from": 7,
          "to": 4,
          "label": "↺ gaps + validator feedback → regenerate (≤ 2 passes)"
        }
      },
      "how": [
        "<b>Guardrails check the file.</b> Emails, phone, card, Aadhaar and PAN numbers are masked. Prompt-injection attempts are caught by Llama Prompt Guard 2 (an attack scored 0.999, a normal requirement 0.0004) and removed.",
        "<b>The document is indexed.</b> Sections are split into chunks of about 800 characters, embedded locally with bge-small-en-v1.5 and stored in Chroma.",
        "<b>Agent 1 extracts requirements.</b> 17 SRS lines become 18 atomic requirements. Code assigns the IDs, not the LLM, so traceability can't break.",
        "<b>Agent 2 writes tests</b> for each requirement (positive, negative, boundary, edge), using only that requirement's retrieved section.",
        "<b>Agent 5 validates and Agent 3 de-duplicates.</b> Off-topic or invented tests are rejected with a written reason.",
        "<b>Agent 4 checks coverage.</b> Requirements missing a required test type go back to the generator with feedback, then the run pauses for optional human approval and exports four sheets."
      ],
      "decisions": [
        {
          "t": "Retrieval threshold set by measurement",
          "d": "The small embedding model scores unrelated text at about 0.5. At a 0.65 cutoff, chosen from two datasets, all unanswerable questions correctly return nothing."
        },
        {
          "t": "De-dup needs the same numbers too",
          "d": "\"50 days overdue\" was merged into \"51 days\" at 0.987 similarity. Requiring identical numbers keeps both boundary tests."
        },
        {
          "t": "A calibrated, independent judge",
          "d": "The judge is a different model family (Qwen) from the generator (gpt-oss), and it had to score 100% on known-answer trap cases before I trusted it."
        },
        {
          "t": "Retries skip the cache",
          "d": "A broken JSON answer had been cached, so every retry repeated it. Now one failed call produces a warning instead of failing the run."
        }
      ],
      "stack": [
        "Python",
        "LangGraph",
        "LangChain",
        "Groq gpt-oss-120b / 20b",
        "Chroma",
        "fastembed",
        "Llama Prompt Guard 2",
        "Pydantic",
        "RAGAS",
        "DeepEval",
        "LangSmith",
        "FastAPI",
        "Streamlit",
        "Docker",
        "GitHub Actions",
        "pytest (78 tests)"
      ],
      "image": "",
      "imageCaption": "",
      "demo": ""
    },
    {
      "id": "india-stock-mcp",
      "title": "India Stock MCP Server",
      "short": "A production MCP server that gives Claude, Cursor and VS Code live NSE/BSE quotes, technical indicators and fundamentals.",
      "tagline": "A production Model Context Protocol server that gives AI assistants like Claude, Cursor and VS Code Copilot live access to Indian stock market data from NSE and BSE. Clients connect over Streamable HTTP with only a URL.",
      "status": "live",
      "repo": "https://github.com/DiwakarReddy11/india-stock-mcp",
      "glow": "#fbbf77",
      "problem": "AI assistants can't see live market data. Ask one \"Is Infosys overbought?\" and it either refuses or guesses from stale training data. Market data APIs are also flaky and rate-limited, so a naive wrapper fails under real use.",
      "solution": "A stateless MCP server exposing seven typed tools plus an analyze_stock prompt. Requests pass through per-IP rate limiting and input validation, are served from tiered TTL caches, and fall back to Yahoo Finance with retry and backoff. It ships in a multi-stage, non-root Docker image.",
      "metrics": [
        {
          "v": 7,
          "label": "MCP tools: quotes, history, technicals, fundamentals and more"
        },
        {
          "v": 36,
          "label": "Offline tests with Yahoo Finance mocked"
        },
        {
          "v": 60,
          "suf": "/min",
          "label": "Per-client token-bucket rate limit"
        },
        {
          "v": 3,
          "label": "Cache tiers: 1 min · 15 min · 6 h"
        }
      ],
      "flow": {
        "steps": [
          {
            "icon": "msg",
            "t": "AI Client",
            "s": "Claude · Cursor · VS Code"
          },
          {
            "icon": "zap",
            "t": "POST /mcp",
            "s": "Stateless Streamable HTTP"
          },
          {
            "icon": "gate",
            "t": "Rate Limiter",
            "s": "Token bucket, per client IP"
          },
          {
            "icon": "filter",
            "t": "Validation",
            "s": "Symbol · period · interval"
          },
          {
            "icon": "layers",
            "t": "MCP Tool",
            "s": "7 tools + analyze_stock prompt"
          },
          {
            "icon": "clock",
            "t": "TTL Cache",
            "s": "Quotes 1m · history 15m · info 6h"
          },
          {
            "icon": "trend",
            "t": "Yahoo Finance",
            "s": "Retry with backoff on miss"
          }
        ],
        "loop": null
      },
      "how": [
        "<b>Connect with a URL.</b> Add the server as a custom connector in Claude, or run <code>claude mcp add --transport http</code>. There's nothing to install.",
        "<b>The rate limiter checks the client.</b> A token bucket is keyed on the real client IP and is resistant to forged X-Forwarded-For headers. Trusted proxy hops are configurable.",
        "<b>Inputs are validated</b> before any network call: NSE symbols like RELIANCE, M&amp;M or BAJAJ-AUTO, plus periods and intervals.",
        "<b>The tool runs.</b> <code>get_technical_analysis</code>, for example, computes SMA 20/50/200, EMA 20, RSI(14), MACD and Bollinger Bands and returns plain-English signals.",
        "<b>Cache first, upstream second.</b> Popular stocks cost one upstream call per TTL window. Transient failures are retried, and real outages return a clear message."
      ],
      "decisions": [
        {
          "t": "Stateless by design",
          "d": "Each request stands alone, so the server scales horizontally behind a load balancer."
        },
        {
          "t": "Cache TTLs match the data",
          "d": "Quotes change every minute and fundamentals only a few times a day, so each data type gets its own cache lifetime."
        },
        {
          "t": "Honest about limitations",
          "d": "It documents delayed data, unofficial-API terms, BSE history gaps and holiday-unaware market hours, and says it is not investment advice."
        }
      ],
      "stack": [
        "Python 3.11",
        "MCP (Streamable HTTP)",
        "yfinance",
        "uv",
        "pytest",
        "ruff",
        "Docker (multi-stage, non-root)",
        "Render"
      ],
      "image": "",
      "imageCaption": "",
      "demo": ""
    },
    {
      "id": "ragas-eval",
      "title": "RAGAS Evaluation Framework",
      "short": "Multi-model LLM evaluation in CI that blocks pull requests when answer quality regresses.",
      "tagline": "An automated, multi-model LLM evaluation that runs in CI and blocks a pull request when answer quality drops. It is built on the modern RAGAS v0.2 API and runs entirely on free infrastructure.",
      "status": "live",
      "repo": "https://github.com/DiwakarReddy11/ragas-eval-framework",
      "glow": "#818cf8",
      "problem": "Teams change a prompt or swap a model and only find out in production that answers got worse. Manual spot checks don't scale, and a model grading its own output can't be trusted.",
      "solution": "Each model under test answers a deliberately tricky golden dataset. A separate, larger judge LLM scores every answer on four RAGAS metrics while latency, tokens and cost are recorded. A threshold script then fails the GitHub Actions build if quality drops.",
      "metrics": [
        {
          "v": 1,
          "dec": 3,
          "label": "Faithfulness, gpt-oss-20b (hallucination trap passed)"
        },
        {
          "v": 0.95,
          "dec": 2,
          "label": "Context precision, best model"
        },
        {
          "v": 2,
          "suf": "×",
          "label": "Qwen faster than gpt-oss-20b at equal quality"
        },
        {
          "v": 4,
          "label": "RAGAS metrics enforced as a CI gate"
        }
      ],
      "flow": {
        "steps": [
          {
            "icon": "doc",
            "t": "Golden Dataset",
            "s": "golden.json + contexts.json"
          },
          {
            "icon": "bot",
            "t": "Models Under Test",
            "s": "gpt-oss-20b · qwen3.8-27b (async)"
          },
          {
            "icon": "eye",
            "t": "Judge LLM",
            "s": "gpt-oss-120b, never grades itself"
          },
          {
            "icon": "chart",
            "t": "4 RAGAS Metrics",
            "s": "+ latency, tokens, cost"
          },
          {
            "icon": "gate",
            "t": "Threshold Check",
            "s": "check_thresholds.py → exit 0/1"
          },
          {
            "icon": "pr",
            "t": "Pull Request",
            "s": "Merge allowed or blocked"
          }
        ],
        "loop": null
      },
      "how": [
        "<b>The dataset is designed to test each metric:</b> distractor passages (context precision), answers spread over several passages (context recall) and one unanswerable question (faithfulness).",
        "<b>Each model answers every question</b> asynchronously through Groq's free tier.",
        "<b>A separate judge scores</b> faithfulness, answer relevancy, context precision and context recall, using local all-MiniLM-L6-v2 embeddings.",
        "<b>Results are recorded</b> per query (avg and p95 latency, tokens, estimated production cost) and uploaded as build artifacts.",
        "<b>The quality gate runs on every PR to main.</b> Minimums: faithfulness 0.90, relevancy 0.75, precision 0.80, recall 0.90."
      ],
      "decisions": [
        {
          "t": "Thresholds below baseline",
          "d": "The judge scored the same Q9 context 1.0 for one model and 0.5 for the other. LLM-as-judge scores are noisy, so the gate leaves headroom."
        },
        {
          "t": "Correct refusals are accounted for",
          "d": "RAGAS gives a non-committal \"I don't know\" a relevancy score of 0, which lowers averages by about 0.1. The threshold allows for this."
        },
        {
          "t": "Pinned for stability",
          "d": "ragas==0.2.15 needs LangChain 0.3, and the free-tier limit of about 30 RPM sets max_workers=2."
        }
      ],
      "stack": [
        "Python",
        "RAGAS 0.2",
        "LangChain 0.3",
        "Groq",
        "sentence-transformers",
        "GitHub Actions",
        "asyncio"
      ],
      "image": "",
      "imageCaption": "",
      "demo": ""
    },
    {
      "id": "adaptive-rag",
      "title": "Adaptive Multi-Strategy RAG Platform",
      "short": "A FastAPI service that routes each query to the best retrieval strategy, benchmarked with BEIR and RAGAS.",
      "tagline": "A FastAPI service that routes each query to the retrieval strategy that suits it best (BM25, dense, hybrid or HyDE), generates grounded answers, and benchmarks every choice with BEIR for retrieval and RAGAS for generation.",
      "status": "wip",
      "repo": "https://github.com/DiwakarReddy11/adaptive-rag-platform",
      "glow": "#f0abfc",
      "problem": "No single retrieval strategy wins on every query. Keyword-heavy questions favour BM25, conceptual ones favour dense vectors, and vague ones benefit from HyDE. Most RAG systems pick one strategy and accept the losses on the rest.",
      "solution": "A strategy router chooses the retriever for each query, and an LLM generates an answer grounded in the retrieved chunks. Every component is benchmarked on standard BEIR datasets, starting with SciFact, so routing decisions rest on measured retrieval quality.",
      "metrics": [
        {
          "v": 4,
          "label": "Retrieval strategies: BM25, dense, hybrid, HyDE"
        },
        {
          "v": 200,
          "label": "Word chunks, with a 50-word overlap"
        },
        {
          "v": 2,
          "label": "Benchmarks: BEIR (retrieval) and RAGAS (generation)"
        },
        {
          "v": 2,
          "label": "Build steps shipped so far, with tests"
        }
      ],
      "flow": {
        "steps": [
          {
            "icon": "msg",
            "t": "Query",
            "s": "FastAPI endpoint"
          },
          {
            "icon": "route",
            "t": "Strategy Router",
            "s": "Chooses retriever per query"
          },
          {
            "icon": "search",
            "t": "Retrieval",
            "s": "BM25 · Dense · Hybrid · HyDE"
          },
          {
            "icon": "spark",
            "t": "Grounded Answer",
            "s": "LLM over retrieved chunks"
          },
          {
            "icon": "chart",
            "t": "Benchmark",
            "s": "BEIR nDCG · RAGAS"
          }
        ],
        "loop": null
      },
      "how": [
        "<b>Step 0, shipped:</b> the project skeleton, a FastAPI health endpoint and Pydantic settings loaded once from .env.",
        "<b>Step 1, shipped:</b> a BEIR SciFact loader (corpus, queries and qrels) with streamed download, plus frozen dataclasses for Document, Chunk and Query.",
        "<b>Sliding-window chunker:</b> 200-word windows with a 50-word overlap. The title goes into the first chunk because titles carry strong signal in scientific text. Chunk IDs like <code>4983#0</code> link back to the source document for BEIR scoring.",
        "<b>Next:</b> BM25 and dense indexes, hybrid fusion, HyDE, the router and the evaluation harness."
      ],
      "decisions": [
        {
          "t": "Benchmark before building",
          "d": "Using BEIR's standard qrels means every retriever is scored on the same public ground truth from day one."
        },
        {
          "t": "Chunk IDs keep lineage",
          "d": "Each chunk records its parent doc_id and position, which is needed to map chunk hits back to document-level relevance."
        },
        {
          "t": "Tested from step one",
          "d": "The chunker and health endpoint have unit tests, including edge cases for invalid sizes and overlaps."
        }
      ],
      "stack": [
        "Python",
        "FastAPI",
        "Pydantic Settings",
        "BEIR (SciFact)",
        "httpx",
        "RAGAS",
        "pytest"
      ],
      "image": "",
      "imageCaption": "",
      "demo": ""
    },
    {
      "id": "nl-to-sql",
      "title": "NL-to-SQL Query System",
      "short": "Plain-English questions become safe, validated PostgreSQL queries across 25+ tables, with 88% execution accuracy.",
      "tagline": "An LLM-powered engine that turns plain-English questions into optimised PostgreSQL queries across 25+ tables. Schema-aware retrieval handles multi-table joins and aggregations.",
      "status": "resume",
      "repo": null,
      "glow": "#5eead4",
      "problem": "Business users depend on engineers for every data question. Pointing an LLM at a large schema doesn't work: the whole schema won't fit in context, the model invents joins, and it might generate a DROP or DELETE.",
      "solution": "RAG over table and column metadata selects only the relevant schema. The LLM drafts SQL, a validation layer parses it, enforces read-only access and checks the schema, and execution errors are fed back to the model for automatic correction.",
      "metrics": [
        {
          "v": 88,
          "suf": "%",
          "label": "Execution accuracy on 150 test questions"
        },
        {
          "v": 25,
          "suf": "+",
          "label": "PostgreSQL tables covered"
        },
        {
          "v": 0.85,
          "dec": 2,
          "label": "RAGAS faithfulness"
        },
        {
          "v": 0.88,
          "dec": 2,
          "label": "RAGAS answer relevancy"
        }
      ],
      "flow": {
        "steps": [
          {
            "icon": "msg",
            "t": "Question",
            "s": "Plain English, in Streamlit"
          },
          {
            "icon": "search",
            "t": "Schema Retrieval",
            "s": "RAG over table & column metadata"
          },
          {
            "icon": "spark",
            "t": "SQL Generation",
            "s": "LLM writes joins & aggregations"
          },
          {
            "icon": "shield",
            "t": "Validation",
            "s": "Parse · read-only · schema checks"
          },
          {
            "icon": "db",
            "t": "Execute",
            "s": "PostgreSQL via SQLAlchemy"
          },
          {
            "icon": "table",
            "t": "Answer",
            "s": "Results in plain language"
          }
        ],
        "loop": {
          "from": 4,
          "to": 2,
          "label": "↺ error-driven self-correction"
        }
      },
      "how": [
        "<b>The user asks a question</b> in plain English through the Streamlit interface.",
        "<b>Schema-aware retrieval</b> pulls only the tables and columns relevant to the question, so the prompt stays small and focused.",
        "<b>The LLM generates SQL</b>, including multi-table joins and aggregations.",
        "<b>The validation layer</b> parses the SQL, blocks DROP, DELETE and UPDATE, and confirms every table and column exists.",
        "<b>The query executes.</b> If PostgreSQL returns an error, the error message goes back to the LLM to correct the query automatically."
      ],
      "decisions": [
        {
          "t": "Read-only by construction",
          "d": "Destructive statements are blocked in code before anything reaches the database."
        },
        {
          "t": "Retrieve the schema, not all of it",
          "d": "Treating table and column metadata as a retrieval corpus is what makes 25+ tables workable."
        },
        {
          "t": "Measured, not eyeballed",
          "d": "150 test questions for execution accuracy, plus RAGAS context precision of 0.82."
        }
      ],
      "stack": [
        "Python",
        "LangChain",
        "PostgreSQL",
        "SQLAlchemy",
        "RAGAS",
        "Streamlit"
      ],
      "image": "",
      "imageCaption": "",
      "demo": ""
    },
    {
      "id": "production-rag",
      "title": "Production RAG Document Intelligence",
      "short": "Hybrid BM25 + dense retrieval with Cohere reranking and HyDE, with 0.86 RAGAS faithfulness.",
      "tagline": "A hybrid RAG pipeline that combines BM25 and dense retrieval with Cohere reranking and HyDE query rewriting. It is deployed with FastAPI and Docker and traced end to end with LangSmith.",
      "status": "resume",
      "repo": null,
      "glow": "#818cf8",
      "problem": "Pure vector search misses exact terms like part numbers and acronyms, while pure keyword search misses paraphrases. Short, vague user questions also embed poorly, so the right passage never reaches the LLM.",
      "solution": "HyDE rewrites the query into a hypothetical answer. BM25 and dense retrieval run together, Cohere's cross-encoder reranks the merged candidates, and only the best context reaches the LLM. RAGAS measures quality and LangSmith traces every step.",
      "metrics": [
        {
          "v": 0.86,
          "dec": 2,
          "label": "RAGAS faithfulness"
        },
        {
          "v": 0.84,
          "dec": 2,
          "label": "RAGAS context precision"
        },
        {
          "v": 50,
          "label": "Question evaluation set"
        },
        {
          "v": 2,
          "label": "Retrievers fused: BM25 + dense"
        }
      ],
      "flow": {
        "steps": [
          {
            "icon": "doc",
            "t": "Documents",
            "s": "Chunked & embedded"
          },
          {
            "icon": "db",
            "t": "ChromaDB",
            "s": "Vector + keyword indexes"
          },
          {
            "icon": "refresh",
            "t": "HyDE Rewrite",
            "s": "Hypothetical answer as query"
          },
          {
            "icon": "search",
            "t": "Hybrid Retrieval",
            "s": "BM25 + dense"
          },
          {
            "icon": "filter",
            "t": "Cohere Rerank",
            "s": "Cross-encoder scoring"
          },
          {
            "icon": "spark",
            "t": "LLM Answer",
            "s": "Grounded in top context"
          },
          {
            "icon": "eye",
            "t": "Observe & Evaluate",
            "s": "LangSmith · RAGAS"
          }
        ],
        "loop": null
      },
      "how": [
        "<b>Documents are chunked, embedded</b> and stored in ChromaDB alongside a BM25 keyword index.",
        "<b>HyDE rewrites the query.</b> The LLM drafts a hypothetical answer, which embeds closer to real passages than a short question does.",
        "<b>Hybrid retrieval</b> combines exact-term BM25 matches with semantic dense matches.",
        "<b>The Cohere reranker</b> rescores the merged candidates so the most relevant passages come first.",
        "<b>The LLM answers</b> from the top context. The service is exposed with FastAPI in Docker and traced in LangSmith."
      ],
      "decisions": [
        {
          "t": "Hybrid over pure vector",
          "d": "BM25 handles identifiers and jargon, and dense retrieval handles paraphrase. Combining them covers both failure modes."
        },
        {
          "t": "Rerank before generation",
          "d": "A cross-encoder pass is cheap compared with a wrong answer, and it raised context precision."
        },
        {
          "t": "Observability built in",
          "d": "LangSmith traces show the exact prompt, context and latency of every step for debugging."
        }
      ],
      "stack": [
        "Python",
        "LangChain",
        "ChromaDB",
        "BM25",
        "Cohere Rerank",
        "HyDE",
        "FastAPI",
        "Docker",
        "RAGAS",
        "LangSmith"
      ],
      "image": "",
      "imageCaption": "",
      "demo": ""
    }
  ],
  "beyond": {
    "title1": "Rooted in",
    "title2": "the soil.",
    "paragraphs": [
      "Away from the keyboard, I'm a farmer at heart. Working the land keeps me grounded and gives me a different sense of time: you prepare the soil, plant at the right moment, watch closely, and wait for the harvest.",
      "Farming taught me lessons I use in engineering every day. Good results come from good foundations. Feedback loops take patience. You read the conditions and adjust rather than force an outcome."
    ],
    "sceneImage": "",
    "sceneCaption": "Season after season",
    "cards": [
      {
        "icon": "leaf",
        "tone": "green",
        "title": "Farming",
        "text": "Hands-on time in the fields: preparing soil, sowing, tending crops and bringing in the harvest. It's where I recharge, and where I learned that consistency compounds."
      },
      {
        "icon": "trend",
        "tone": "warm",
        "title": "Indian Markets",
        "text": "I follow NSE and BSE closely. That interest led me to build an MCP server that gives AI assistants live Indian market data, technical indicators and fundamentals."
      },
      {
        "icon": "book",
        "tone": "cool",
        "title": "Always Learning",
        "text": "Certified by Anthropic and Microsoft, and building in public on GitHub. I learn a new technique best by shipping a small, honest, measured project with it."
      }
    ],
    "photos": [],
    "quote": "\"Both a field and a model reward the same things: <span>good foundations</span>, close attention and patience with the feedback loop.\""
  },
  "skills": [
    {
      "icon": "spark",
      "group": "Generative AI",
      "items": [
        "LLMs",
        "RAG",
        "Hybrid Search (BM25 + Dense)",
        "Cross-Encoder Reranking",
        "Agentic AI",
        "Multi-Agent Systems",
        "NL2SQL",
        "Prompt Engineering",
        "RAGAS",
        "DeepEval",
        "LLM-as-Judge",
        "Guardrails",
        "Model Routing & Fallbacks"
      ]
    },
    {
      "icon": "layers",
      "group": "Frameworks",
      "items": [
        "LangChain",
        "LangGraph",
        "CrewAI",
        "FastAPI",
        "Pydantic",
        "SQLAlchemy",
        "Streamlit",
        "MCP",
        "Tool Calling"
      ]
    },
    {
      "icon": "db",
      "group": "Data & Infra",
      "items": [
        "PostgreSQL",
        "MySQL",
        "Redis",
        "Qdrant",
        "ChromaDB",
        "Docker",
        "GitHub Actions"
      ]
    },
    {
      "icon": "code",
      "group": "Languages & Tools",
      "items": [
        "Python",
        "SQL",
        "LangSmith",
        "Git",
        "VS Code",
        "uv",
        "pytest",
        "ruff"
      ]
    }
  ],
  "marquee": [
    "Retrieval-Augmented Generation",
    "Agentic Workflows",
    "LLM Evaluation",
    "NL-to-SQL",
    "Model Context Protocol",
    "Guardrails"
  ],
  "certifications": [
    {
      "title": "Claude Developer: Foundations",
      "issuer": "Anthropic Certified",
      "date": "",
      "url": "https://www.credly.com/badges/ad15c4ca-4cbc-43fb-9e3a-925c6458c26e/linked_in_profile",
      "image": ""
    },
    {
      "title": "Azure AI Fundamentals",
      "issuer": "Microsoft Certified",
      "date": "",
      "url": "https://learn.microsoft.com/api/credentials/share/en-gb/DiwakarReddyVengalReddy-8780/1F3B853ED0F34833?sharingId=40F689B242DDE3D6",
      "image": ""
    }
  ],
  "documents": {
    "title1": "Documents",
    "title2": "& resources.",
    "text": "Resumes, certificates, project write-ups and other documents. Open any of them in the viewer or download a copy.",
    "items": [
      {
        "title": "Resume: Diwakar Reddy",
        "category": "Career",
        "description": "My current one-page resume: experience, projects, skills and certifications.",
        "date": "2026",
        "file": "assets/Diwakar_Reddy_Resume.pdf"
      }
    ]
  },
  "contact": {
    "title1": "Let's build",
    "title2": "something reliable.",
    "text": "I'm open to Applied AI and GenAI engineering roles and collaborations. The quickest way to reach me is email."
  }
};
