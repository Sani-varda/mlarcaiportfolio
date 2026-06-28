"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, ArrowLeft, FileText, Mail, Shield, Zap, Sparkles, 
  Cpu, TrendingUp, ChevronRight, Moon, Sun, ArrowLeftRight, Download, Phone, CheckCircle,
  Brain, Database, Code,
  ArrowUpRight, Award, Crown, X,
  Globe, Layers, Users, Bot, MessageSquare, MessageCircle, PhoneCall, Star, Search, Target, Calendar
} from "lucide-react";
import { 
  FaFacebook, FaInstagram, FaXTwitter, FaLinkedin, FaGlobe, FaCalendar, FaGithub 
} from "react-icons/fa6";
import ImageSequenceCanvas from "@/components/ImageSequenceCanvas";
import MountainVistaParallax from "@/components/ui/mountain-vista-bg";

const socialLinks = [
  { href: "https://www.facebook.com/MLArc", title: "Facebook", icon: FaFacebook },
  { href: "https://www.instagram.com/mlarc.ai/", title: "Instagram", icon: FaInstagram },
  { href: "https://x.com/mlarc_ai", title: "X (Twitter)", icon: FaXTwitter },
  { href: "https://www.linkedin.com/company/mlarc/", title: "LinkedIn", icon: FaLinkedin },
  { href: "https://github.com/Sani-varda", title: "GitHub", icon: FaGithub },
  { href: "https://www.mlarcai.com", title: "Website", icon: FaGlobe },
  { href: "https://calendly.com/imsunnystark/30min", title: "Schedule a Call", icon: FaCalendar },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Interactive states
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollProgress2, setScrollProgress2] = useState(0);
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);
  const [activePersonalCaseStudy, setActivePersonalCaseStudy] = useState(0);
  const [showPersonalCaseStudiesDossier, setShowPersonalCaseStudiesDossier] = useState(false);
  const [p1ScrollProgress, setP1ScrollProgress] = useState(0);
  const [p2ScrollProgress, setP2ScrollProgress] = useState(0);
  const [p4ScrollProgress, setP4ScrollProgress] = useState(0);
  const [p5ScrollProgress, setP5ScrollProgress] = useState(0);
  const [entered, setEntered] = useState(false);
  const [activeServiceGroup, setActiveServiceGroup] = useState("all");
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const [timeStr, setTimeStr] = useState("");
  const [vanguardMenuOpen, setVanguardMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Lead Intake Form States
  const [leadFormData, setLeadFormData] = useState({ name: "", email: "", message: "" });
  const [leadStatus, setLeadStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [leadError, setLeadError] = useState("");

  const handleLeadChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLeadFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadFormData.name || !leadFormData.email || !leadFormData.message) {
      setLeadStatus("error");
      setLeadError("Please fill out all required fields.");
      return;
    }
    setLeadStatus("submitting");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadFormData),
      });
      if (response.ok) {
        setLeadStatus("success");
        setLeadFormData({ name: "", email: "", message: "" });
      } else {
        const data = await response.json();
        setLeadStatus("error");
        setLeadError(data.error || "Submission failed. Please try again.");
      }
    } catch (err) {
      setLeadStatus("error");
      setLeadError("Network error. Please check your connection.");
    }
  };

  // Clock for the landing overlay
  useEffect(() => {
    setTimeStr(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    const clockTimer = setInterval(() => {
      setTimeStr(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    }, 60000);
    return () => clearInterval(clockTimer);
  }, []);

  // Load Unicorn Studio for Vitruvian man animation in Panel 2
  useEffect(() => {
    if (!entered || isMobile) return;
    const embedScript = document.createElement('script');
    embedScript.type = 'text/javascript';
    embedScript.textContent = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          };
          (document.head || document.body).appendChild(i)
        }
      }();
    `;
    document.head.appendChild(embedScript);

    // CSS to hide branding and crop canvas
    const style = document.createElement('style');
    style.textContent = `
      [data-us-project] {
        position: relative !important;
        overflow: hidden !important;
      }
      [data-us-project] canvas {
        clip-path: inset(0 0 10% 0) !important;
      }
      [data-us-project] * {
        pointer-events: none !important;
      }
      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] div[title*="Made with"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="brand"],
      [data-us-project] [class*="credit"],
      [data-us-project] [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }
    `;
    document.head.appendChild(style);

    const hideBranding = () => {
      const projectDiv = document.querySelector('[data-us-project]');
      if (projectDiv) {
        const allElements = projectDiv.querySelectorAll('*');
        allElements.forEach(el => {
          const text = (el.textContent || '').toLowerCase();
          if (text.includes('made with') || text.includes('unicorn')) {
            el.remove();
          }
        });
      }
    };

    hideBranding();
    const interval = setInterval(hideBranding, 200);

    return () => {
      clearInterval(interval);
      try {
        document.head.removeChild(embedScript);
        document.head.removeChild(style);
      } catch (e) {}
    };
  }, [entered, isMobile]);


  const scrollToVH = (vh: number) => {
    window.scrollTo({
      top: window.innerHeight * vh,
      behavior: "smooth",
    });
  };
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "VARADANAVNIT:quant-engine$ ./run_backtest.py --instrument XAU/USD",
    "Loading 10-year OHLCV dataset...",
    "Fitting GARCH(1,1) volatility regime estimator...",
    "Loading LSTM sequence forecast weights...",
    "Initial Sharpe Ratio: 1.82 | Sortino: 2.41",
    "Simulating live signals...",
  ]);

  // Helper for word-reveal animation
  const renderRevealText = (text: string, progress: number, highlightWords: string[] = []) => {
    const words = text.split(" ");
    return words.map((word, i) => {
      // Words reveal sequentially between progress 0.1 and 0.9
      const wordStart = 0.1 + (i / words.length) * 0.7;
      const factor = (progress - wordStart) / 0.08;
      const opacity = Math.min(Math.max(factor, 0.12), 1.0);
      
      const shouldHighlight = highlightWords.some(h => word.toLowerCase().includes(h.toLowerCase()));
      const textColor = shouldHighlight && opacity >= 1.0 ? "text-blue-600 font-bold" : "";
      
      return (
        <span 
          key={i} 
          className={`inline-block mr-1.5 transition-colors duration-150 ${textColor}`}
          style={{
            opacity: opacity,
            fontWeight: 700
          }}
        >
          {word}
        </span>
      );
    });
  };

  // Terminal emulation effect
  useEffect(() => {
    const timer = setInterval(() => {
      const logs = [
        `[SIGNAL] XAU/USD: BUY entry at ${1800 + Math.random() * 600} (Regime: LOW_VOL, ATR Multiplier: 1.2x)`,
        `[P&L] Current Cumulative Return: +${34 + Math.random() * 2}% (Max DD: 11.3%)`,
        `[SYSTEM] Reallocating assets using Kelly Criterion (VaR limit: 5%)`,
        `[AI] Agent voice call containment: 81% (Aria active)`,
        `[MLflow] Logging run metrics to workspace... OK`,
        `[Grafana] Metric push: latency_p95=180ms, error_rate=0.0%`,
      ];
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      setTerminalOutput((prev) => [...prev.slice(-8), randomLog]);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Listen to standard vertical window scrolling
  useEffect(() => {
    if (!entered) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
          const viewportHeight = window.innerHeight;
          const viewportWidth = window.innerWidth;
          
          // 1. The first image sequence is driven by the scroll in the first 250vh of the page
          const scrubZoneHeight = viewportHeight * 2.5; 
          const progress = Math.min(Math.max(scrollY / scrubZoneHeight, 0), 1);
          setScrollProgress(progress);

          // 2. The second image sequence is driven by the scroll in the next 250vh of the page (from 250vh to 500vh)
          const scrubZoneHeight2 = viewportHeight * 2.5;
          const scrollDelta2 = Math.max(scrollY - scrubZoneHeight, 0);
          const progress2 = Math.min(Math.max(scrollDelta2 / scrubZoneHeight2, 0), 1);
          setScrollProgress2(progress2);

          // Calculate overlay opacity (fades out between 4.5vh and 5.0vh)
          const currentVH = scrollY / (viewportHeight || 1);
          let opacity = 1;
          if (currentVH > 4.5) {
            opacity = Math.max(0, 1 - (currentVH - 4.5) / 0.5);
          } else {
            opacity = 1;
          }
          setOverlayOpacity(opacity);

          // 3. Horizontal slider translation (driven by scroll from 500vh onwards)
          if (sliderRef.current) {
            const startScroll = scrubZoneHeight + scrubZoneHeight2; // 500vh (5.0 * viewportHeight)
            
            // Calculate panel 1 scroll progress (500vh to 600vh)
            const p1Progress = Math.min(Math.max((scrollY - startScroll) / viewportHeight, 0), 1);
            setP1ScrollProgress(p1Progress);

            // Calculate panel 2 scroll progress (600vh to 700vh)
            const p2Progress = Math.min(Math.max((scrollY - (startScroll + viewportHeight)) / viewportHeight, 0), 1);
            setP2ScrollProgress(p2Progress);

            // Calculate panel 4 scroll progress (800vh to 900vh)
            const p4Progress = Math.min(Math.max((scrollY - (startScroll + 3 * viewportHeight)) / viewportHeight, 0), 1);
            setP4ScrollProgress(p4Progress);

            // Calculate panel 5 scroll progress (900vh to 1000vh)
            const p5Progress = Math.min(Math.max((scrollY - (startScroll + 4 * viewportHeight)) / viewportHeight, 0), 1);
            setP5ScrollProgress(p5Progress);

            if (scrollY <= startScroll) {
              sliderRef.current.style.transform = `translateX(${viewportWidth}px)`;
            } else {
              // Slide 100vw for every 100vh of vertical scroll (600vh total scroll)
              const scrollDelta = scrollY - startScroll;
              const xOffset = viewportWidth - scrollDelta * (viewportWidth / viewportHeight);
              
              // There are 7 panels, so max translation is -600vw (-6 * viewportWidth)
              const maxSlide = -6 * viewportWidth;
              const clampedXOffset = Math.max(xOffset, maxSlide);
              
              sliderRef.current.style.transform = `translateX(${clampedXOffset}px)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();

    // Resize event to handle viewport updates on transform
    const handleResize = () => {
      handleScroll();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [entered]);

  const handleEnter = () => {
    setEntered(true);
    // Automatically scroll down slightly to nudge user to scroll
    setTimeout(() => {
      window.scrollTo({ top: 10, behavior: "smooth" });
    }, 100);
  };

  const personalCaseStudies = [
    {
      id: "pcs-01",
      title: "Enterprise RAG Knowledge Management Platform",
      category: "AI & LLM",
      tech: "Python · LangChain · Azure OpenAI · Pinecone · FastAPI · React · Grafana",
      challenge: "A 200-person professional services firm had critical knowledge siloed across 4,000+ PDFs, Confluence pages, and SQL reports. Consultants spent 3–4 hours daily searching for institutional knowledge, resulting in $15,000 estimated annual productivity loss.",
      solution: "Designed a multi-source RAG ingestion pipeline normalizing PDFs, wikis, and structured SQL data into a unified embedding space using LangChain document loaders. Implemented hybrid dense-sparse retrieval (OpenAI embeddings + BM25) with cross-encoder re-ranking, achieving 92% retrieval precision@5. Built streaming FastAPI backend with LangChain RetrievalQA chains, deployed on Azure AKS.",
      metricBefore: "3.5 hours",
      metricAfter: "8 mins",
      metricLabel: "Knowledge Lookup Time",
      metricChange: "-96.2%",
      impact: "Estimated annual productivity savings of $12,000. Client expanded platform to 3 additional business units within 60 days of launch."
    },
    {
      id: "pcs-02",
      title: "Automated ML Feature Engineering Pipeline",
      category: "Cloud & MLOps",
      tech: "Python · Databricks · Apache Spark · Delta Lake · Azure ML · MLflow · ADF",
      challenge: "A fintech company's data science team spent 70% of sprint cycles on manual feature engineering for credit risk models, with no lineage tracking and feature inconsistencies causing model performance drift of 12% month-over-month.",
      solution: "Designed a reusable PySpark feature library on Databricks processing 100GB+ of daily transactional data with Delta Lake ACID guarantees. Built Azure Data Factory orchestration pipelines with automated retraining triggers based on data drift thresholds, monitored via custom Grafana alerts.",
      metricBefore: "3 weeks",
      metricAfter: "3 days",
      metricLabel: "Feature Dev Time",
      metricChange: "-85.7%",
      impact: "Reduced feature development time by 80%. Eliminated model performance drift — accuracy variance dropped from 12% to 1.4% month-over-month. Enabled 4x faster model iteration cycles."
    },
    {
      id: "pcs-03",
      title: "LLM Operations & Cost Observability Stack",
      category: "AI & MLOps",
      tech: "Python · Grafana · Prometheus · OpenTelemetry · Docker · LangSmith · Azure Monitor",
      challenge: "An AI product company running 8 LLM-powered microservices had zero visibility into per-request token costs, retrieval quality, or model latency distribution. Monthly OpenAI bills exceeded budget by 40% with no attribution to individual features or users.",
      solution: "Built custom Python OpenTelemetry exporters instrumenting every LangChain chain, RAG retrieval step, and LLM call with structured spans and cost metadata. Designed a 12-panel Grafana dashboard covering: token spend by model/feature/user, P50/P95/P99 latency, retrieval precision trends, error rate, and cache hit ratio.",
      metricBefore: "4 hours",
      metricAfter: "9 mins",
      metricLabel: "Mean Time to Detect (MTTD)",
      metricChange: "-96.2%",
      impact: "Identified 34% of token spend attributable to a single poorly-prompted feature. Cost reduced by $18K/month after prompt optimization guided by observability data."
    },
    {
      id: "pcs-04",
      title: "Conversational AI Voice Agent for Inbound Sales",
      category: "AI & Automation",
      tech: "Python · LangChain · ElevenLabs · Twilio · Azure Functions · FastAPI · OpenAI",
      challenge: "A B2B SaaS company received 400+ inbound sales inquiry calls per week. SDRs handled only 60% within SLA, losing an estimated 30% of leads to competitor response speed. Hiring more SDRs was cost-prohibitive at $85K/head annually.",
      solution: "Architected a real-time voice agent pipeline: Twilio STT → intent classification (fine-tuned GPT-4) → LangChain agent with CRM tool-use → ElevenLabs TTS response. Deployed on Azure Functions with event-driven auto-scaling, handling concurrent call spikes with average LLM response latency of 180ms.",
      metricBefore: "4 hours",
      metricAfter: "45 secs",
      metricLabel: "Lead Response Time",
      metricChange: "-99.7%",
      impact: "Achieved 81% call containment rate (no human escalation). Lead response time reduced from 4 hours to under 45 seconds. Equivalent capacity of 6 additional SDRs at 12% of the annual hiring cost."
    },
    {
      id: "pcs-05",
      title: "Multi-Instrument Algorithmic Signal Engine",
      category: "Quant & Finance",
      tech: "Python · Pandas · NumPy · TA-Lib · Backtrader · Broker API · Grafana",
      challenge: "Manual discretionary trading across XAU/USD, BankNifty, and forex majors produced inconsistent results with high emotional bias. The challenge was building a systematic, backtested signal engine that could operate across uncorrelated asset classes with disciplined risk management.",
      solution: "Engineered a modular signal framework in Python combining momentum (ADX + EMA crossover), mean-reversion (Z-score of Bollinger Band deviation), and volatility regime filters. Backtested 4 years of historical data (2020–2024) using Backtrader with realistic slippage and commission modeling.",
      metricBefore: "Manual",
      metricAfter: "1.82 Sharpe",
      metricLabel: "Sharpe Ratio",
      metricChange: "+2.1R Avg",
      impact: "Live strategy produced Sharpe ratio of 1.82, Sortino ratio of 2.41, and max drawdown of 11.3% vs. buy-and-hold benchmark of 27%. Win rate of 58%."
    },
    {
      id: "pcs-06",
      title: "Gold (XAU/USD) Volatility Forecasting Model",
      category: "Quant & Finance",
      tech: "Python · GARCH/EGARCH · LSTM · Scikit-learn · Pandas · TA-Lib",
      challenge: "Gold price volatility clustering makes fixed stop-losses ineffective: tight stops get hunted during high-volatility sessions, while wide stops over-risk capital in low-volatility periods.",
      solution: "Assembled 10-year daily and hourly OHLCV dataset. Fitted EGARCH models for asymmetric volatility conditional estimation and trained an LSTM model on 60-bar rolling windows predicting next-session ATR. Integrated forecast output into the signal engine as dynamic stop-loss multiplier.",
      metricBefore: "Fixed ATR Stops",
      metricAfter: "Dynamic Stops",
      metricLabel: "Stop-Out Rate Reduction",
      metricChange: "-29%",
      impact: "Dynamic stop system reduced stop-out rate by 29% on winning trades and improved risk-adjusted returns by 0.4 Sharpe points."
    },
    {
      id: "pcs-07",
      title: "BankNifty & Nifty50 Options Strategy",
      category: "Quant & Finance",
      tech: "Python · Scikit-learn · Hidden Markov Models · TA-Lib · NSE API",
      challenge: "Indian index options (BankNifty, Nifty50) exhibit strong intraday regime patterns (trending opens, consolidating midday, volatile closes), but retail strategies applying uniform rules suffer poor risk-adjusted returns.",
      solution: "Labeled 3 years of 5-minute data into 3 market regimes (trend, range, breakout) using Hidden Markov Models. Developed regime-conditional strategy modules and strike selection via NSE API. Monitored live Greeks exposure via Grafana.",
      metricBefore: "-8% Return",
      metricAfter: "34% Return",
      metricLabel: "Annualized Return",
      metricChange: "+34% Net",
      impact: "Achieved 34% annualized return with 15.8% max drawdown. HMM regime classifier achieved 71% out-of-sample accuracy."
    },
    {
      id: "pcs-08",
      title: "AI-Powered Forex Sentiment Dashboard",
      category: "Quant & AI",
      tech: "Python · LangChain · OpenAI API · Grafana · Pandas · NewsAPI · FRED API",
      challenge: "Retail forex traders lack systematic access to real-time macro and sentiment signals that institutional desks use. Manual news reading introduces latency and cognitive bias in fast-moving currency markets.",
      solution: "Built a real-time macro signal pipeline aggregating FRED releases, central bank statement sentiment via OpenAI NLP classification, and news. Used LangChain to sentiment-score each news event. Engineered composite macro score updated every 15 minutes.",
      metricBefore: "51% Win Rate",
      metricAfter: "64% Win Rate",
      metricLabel: "Forex Win Rate",
      metricChange: "+13% Net",
      impact: "Sentiment-informed signals improved discretionary EUR/USD and GBP/USD trade win rate from 51% to 64% over 6-month live forward test. Reduced pre-trade research time from 45 minutes to under 5 minutes."
    },
    {
      id: "pcs-09",
      title: "Containerised AI Microservices Platform",
      category: "DevOps & MLOps",
      tech: "Docker · Docker Compose · Kubernetes (AKS) · ACR · Nginx · FastAPI · GitHub Actions",
      challenge: "ML Arc's flagship AI product comprised 7 independent services all deployed manually on a single VM. Any update required full downtime, rollbacks were impossible, and environment drift caused build failures on client handoff.",
      solution: "Containerised all 7 services using multi-stage builds. Authored docker-compose.yml for local development. Deployed production to AKS using Helm charts with replica counts and probes. Built GitHub Actions CI/CD pipeline for automated rolling updates and rollbacks.",
      metricBefore: "45 mins",
      metricAfter: "6 mins",
      metricLabel: "Deployment Time",
      metricChange: "-86.7%",
      impact: "Zero-downtime rolling deployments eliminated all maintenance windows. Platform handles 10x traffic spikes via AKS autoscaling. MTTR reduced from 2 hours to 18 minutes."
    },
    {
      id: "pcs-10",
      title: "Dockerised Quant Backtesting Environment",
      category: "DevOps & Quant",
      tech: "Docker · Docker Compose · Python · Backtrader · Jupyter · PostgreSQL · TimescaleDB · Grafana",
      challenge: "Running quant strategy backtests on different machines produced inconsistent results due to library version mismatches (TA-Lib, Pandas, NumPy). Sharing research environments required hours of manual setup.",
      solution: "Built reproducible quant research Docker image pre-installing TA-Lib, Backtrader, Pandas, NumPy, Scikit-learn, PyTorch, and Jupyter. Configured docker-compose stack with Jupyter, TimescaleDB, and Grafana. Automated OHLCV data ingestion via scheduled ETL container.",
      metricBefore: "4 hours",
      metricAfter: "90 secs",
      metricLabel: "Onboarding Setup Time",
      metricChange: "-99.3%",
      impact: "Researcher onboarding dropped from 4-hour manual setup to 90 seconds. Backtest reproducibility reached 100% across Mac, Windows, and Linux. Strategy iteration cycles accelerated 3x."
    }
  ];

  const caseStudies = [
    {
      id: "cs-01",
      title: "AI Voice Agent & Lead Qualification",
      client: "Meridian Realty Group",
      sector: "Real Estate (Mumbai & Pune)",
      challenge: "Losing qualified leads due to average response times of 4.7 hours. Weekend/after-hours leads went completely unattended.",
      solution: "Deployed 'Aria', a 24/7 natural Hindi-English voice agent calling leads in under 90 seconds, qualifying on budget/timelines, and syncing transcripts to Salesforce.",
      metricBefore: "4.7 hours",
      metricAfter: "68 seconds",
      metricLabel: "Lead Response Time",
      metricChange: "-97.6%",
      impact: "₹2.3 crore in attributable additional bookings in Q1 post-deployment. Lead-to-site-visit rate improved by 180%.",
      testimonial: "Aria felt natural and professional, and never missed a lead. The ROI was visible within the first month.",
      speaker: "Rohan Mehta, Head of Sales"
    },
    {
      id: "cs-02",
      title: "Paid Ads & AI-Optimized Landing Pages",
      client: "VeloFit",
      sector: "D2C Fitness (Pan-India)",
      challenge: "A low 1.4x ROAS on ₹5L/month budget, high CAC, and lack of audience segmentation on landing pages.",
      solution: "Created 6 persona-segmented landing pages with server-side pixel tracking, built a 3-tier Meta marketing funnel, and ran AI-scripted ad testing cycles.",
      metricBefore: "1.4x ROAS",
      metricAfter: "7.2x ROAS",
      metricLabel: "Blended Return on Ads",
      metricChange: "+414%",
      impact: "Scaled monthly revenue from ₹18L to ₹61L in 5 months. Reduced Customer Acquisition Cost (CAC) by 58%.",
      testimonial: "ML Arc rebuilt our entire growth engine. The landing pages alone doubled our conversion rate before we even touched the ad budget.",
      speaker: "Priya Sharma, Co-Founder"
    },
    {
      id: "cs-03",
      title: "Support Chatbot & Workflow Automation",
      client: "NovaCare Health",
      sector: "Diagnostic Chain (Hyderabad)",
      challenge: "Support team overwhelmed with 900+ daily WhatsApp and web messages. Wait times reached 22 minutes.",
      solution: "Built a multi-channel AI chatbot trained on 480+ tests, automated PDF report delivery via WhatsApp/email, and set up automated appointment reminders.",
      metricBefore: "0%",
      metricAfter: "74%",
      metricLabel: "Bot-Resolved Queries",
      metricChange: "74% New",
      impact: "Saved ₹4.2L/month in avoided headcount. Daily human support tickets reduced by 71%, and patient satisfaction rose to 4.7/5.",
      testimonial: "Patients actually compliment our 'quick response' not knowing it's AI. The bot handles queries better than we expected.",
      speaker: "Dr. Kavitha Rao, Operations Director"
    },
    {
      id: "cs-04",
      title: "B2B SaaS AI Operations Dashboard",
      client: "FreightEdge Logistics",
      sector: "Logistics (Bengaluru)",
      challenge: "Managing 340 vehicles and 1200+ monthly shipments via spreadsheets. Invoice generation took 3-4 days post-delivery.",
      solution: "Developed a custom SaaS dashboard with real-time GPS tracking, automated billing/invoice generation, compliance checks, and a client portal.",
      metricBefore: "3-4 days",
      metricAfter: "4 minutes",
      metricLabel: "Invoice Gen Time",
      metricChange: "-99.8%",
      impact: "Reduced operational overhead by 60%. Saved 204 hours per week. Secured 2 new enterprise client contracts.",
      testimonial: "What ML Arc built in 14 weeks replaced four different systems. The invoice automation alone recovered its cost in 2 months.",
      speaker: "Arjun Nair, CEO"
    },
    {
      id: "cs-05",
      title: "AI Document Processing Agent",
      client: "Pinnacle Wealth Advisors",
      sector: "Finance (Delhi NCR)",
      challenge: "Operations team spending 60% of their time manually reviewing and entering data from 6-12 financial docs per client.",
      solution: "Deployed secure document classification and OCR extraction agents for ITR, bank statements, and CIBIL docs, with auto risk-profiling.",
      metricBefore: "6.2 hours",
      metricAfter: "58 minutes",
      metricLabel: "Onboarding Processing",
      metricChange: "-84%",
      impact: "Zero manual data entry errors. Operations team now handles 3x the client volume with the same headcount.",
      testimonial: "The AI agent reads documents faster than our best analyst and never makes data entry mistakes.",
      speaker: "Vikram Luthra, Managing Director"
    },
    {
      id: "cs-06",
      title: "High-Conversion Landing Page Suite",
      client: "Aurumé Skincare",
      sector: "D2C Skincare (Mumbai)",
      challenge: "Premium brand converting at only 0.8% on Shopify, leading to wasted ad spend and high bounce rates.",
      solution: "Designed 8 audience-matched landing pages with social proof elements above the fold, trust badges, and sub-2s mobile loading speeds.",
      metricBefore: "0.8%",
      metricAfter: "3.3%",
      metricLabel: "Landing Page CVR",
      metricChange: "+313%",
      impact: "Increased conversion rate 4.1x, generating ₹43L in incremental revenue in Q1. Bounce rate decreased by 49%.",
      testimonial: "The difference between 0.8% and 3.3% conversion is the difference between a struggling brand and a thriving one.",
      speaker: "Ananya Kapoor, Founder"
    }
  ];

  const services = [
    {
      title: "Web Development",
      category: "Web",
      group: "web",
      icon: Globe,
      description: "Custom business websites with lead capture forms, mobile-first design, and full SEO setup. Delivered in 7–14 days with CMS integration.",
      details: ["5-page responsive site", "Lead capture forms", "SEO on-page setup", "Mobile-first design"]
    },
    {
      title: "CMS Integration",
      category: "Web",
      group: "web",
      icon: Layers,
      description: "Edit your website without a developer. We connect a headless CMS so your team can update content independently. Includes editor training.",
      details: ["Headless CMS setup", "No-code editor", "Admin training", "Content workflows"]
    },
    {
      title: "Custom CRM",
      category: "CRM",
      group: "web",
      icon: Users,
      description: "A complete lead management system tailored to your business — with deal pipelines, lead scoring, activity logs, and analytics dashboards.",
      details: ["Deal pipeline view", "Lead scoring", "Activity logs", "Analytics dashboard"]
    },
    {
      title: "Automation Agents",
      category: "Automation",
      group: "automation",
      icon: Bot,
      description: "N8N & Python workflows that automate business processes end-to-end — from lead intake to CRM updates and follow-ups.",
      details: ["N8N workflows", "Python scripts", "CRM sync", "Error monitoring"]
    },
    {
      title: "Appointment Handler",
      category: "Automation",
      group: "automation",
      icon: Calendar,
      description: "Fully automated booking system with calendar sync, reminders via WhatsApp/SMS, rescheduling flows, and no-show follow-ups.",
      details: ["Calendar sync", "WhatsApp reminders", "Rescheduling flow", "No-show follow-ups"]
    },
    {
      title: "AI Chatbot",
      category: "AI Agent",
      group: "ai",
      icon: MessageSquare,
      description: "GPT-4o powered chatbot trained on your business data. Answers FAQs, qualifies leads, and books appointments 24/7 on your website.",
      details: ["GPT-4o powered", "RAG knowledge base", "Lead qualification", "Appointment booking"]
    },
    {
      title: "WhatsApp Chatbot",
      category: "AI Agent",
      group: "ai",
      icon: MessageCircle,
      description: "24/7 WhatsApp AI assistant that handles FAQs, sends pricing, captures leads, and books appointments — all inside WhatsApp.",
      details: ["24/7 availability", "Lead capture", "Pricing automation", "Booking integration"]
    },
    {
      title: "Voice AI Agent",
      category: "AI Agent",
      group: "ai",
      icon: PhoneCall,
      description: "Sub-1-second latency AI voice agent that handles inbound & outbound calls, qualifies leads, and pushes call transcripts directly to your CRM.",
      details: ["Sub-1s latency", "Inbound & outbound", "CRM transcripts", "Lead qualification"]
    },
    {
      title: "Review Engine",
      category: "Automation",
      group: "automation",
      icon: Star,
      description: "Automated post-service review requests via WhatsApp, SMS, and Email. Happy customers get routed to Google; unhappy ones trigger alerts.",
      details: ["Multi-channel outreach", "Sentiment routing", "Google Reviews boost", "Alert system"]
    },
    {
      title: "Google Ads",
      category: "Advertising",
      group: "marketing",
      icon: Search,
      description: "High-converting Google Search & Display campaigns managed end-to-end — keyword research, ad copy, bid strategy, and weekly reporting.",
      details: ["Keyword research", "Ad copywriting", "Bid management", "Weekly reports"]
    },
    {
      title: "Meta Ads",
      category: "Advertising",
      group: "marketing",
      icon: Target,
      description: "Performance-focused Meta (Facebook & Instagram) ad campaigns with audience targeting, creative testing, and ROAS optimization.",
      details: ["Audience targeting", "Creative testing", "ROAS optimization", "Retargeting funnels"]
    },
    {
      title: "Performance Optimization",
      category: "Growth",
      group: "marketing",
      icon: TrendingUp,
      description: "Data-driven, ongoing optimization of your ads, funnels, website speed, and automations — continuously improving your ROI month over month.",
      details: ["Funnel optimization", "Ad A/B testing", "Site speed", "Monthly strategy call"]
    }
  ];

  // Calculate opacities for the two sequences to ensure a smooth cross-fade
  let seq1Opacity = 1;
  let seq2Opacity = 0;
  
  if (scrollProgress < 0.9) {
    seq1Opacity = 1;
    seq2Opacity = 0;
  } else if (scrollProgress < 1.0) {
    // Cross-fade zone (0.9 to 1.0)
    // Sequence 1 fades out on top of the fully opaque Sequence 2
    const factor = (scrollProgress - 0.9) / 0.1; // 0 to 1
    seq1Opacity = 1 - factor;
    seq2Opacity = 1; // Keep sequence 2 fully opaque underneath
  } else {
    seq1Opacity = 0;
    seq2Opacity = 1;
  }

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#cbdbe6]">
      
      {/* Fixed Full-Screen Image Sequence Background */}
      {entered && !isMobile && (
        <div className="fixed inset-0 w-full h-full bg-[#cbdbe6] select-none pointer-events-none" style={{ zIndex: 1 }}>
          {/* Sequence 1 (Active during initial vertical scroll) - Positioned on top */}
          {scrollProgress < 1.0 && (
            <div 
              className="absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out"
              style={{ 
                opacity: seq1Opacity,
                zIndex: 2
              }}
            >
              <ImageSequenceCanvas 
                scrollProgress={scrollProgress} 
                totalFrames={240}
                startFrame={1}
                folder="/images/sequence2"
                prefix="ezgif-frame-"
                digits={3}
                extension="png"
                isActive={scrollProgress < 1.0}
              />
            </div>
          )}

          {/* Sequence 2 (Active during horizontal dossier scroll) - Positioned underneath */}
          {scrollProgress > 0.8 && (
            <div 
              className="absolute inset-0 w-full h-full transition-opacity duration-300 ease-in-out"
              style={{ 
                opacity: seq2Opacity,
                zIndex: scrollProgress >= 1.0 ? 2 : 1
              }}
            >
              <ImageSequenceCanvas 
                scrollProgress={scrollProgress2} 
                totalFrames={240}
                startFrame={1}
                folder="/images/sequence1"
                prefix="ezgif-frame-"
                digits={3}
                extension="png"
                isActive={scrollProgress >= 0.9}
              />
            </div>
          )}
        </div>
      )}

      {/* INTRO SCREEN OVERLAY */}
      {!entered && (
        <main className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-[#cbdbe6] overflow-hidden text-center p-8 select-none">
          {/* Background Portrait Image */}
          <div className="absolute inset-0 w-full h-full opacity-40">
            <Image 
              src="/images/background.webp" 
              alt="Sani Varada Cinematic Background" 
              fill
              priority
              className="object-cover"
            />
          </div>
          
          {/* Dark Vignette Overlay removed */}

          <div className="relative z-10 max-w-4xl flex flex-col items-center">
            {/* Logo */}
            <div className="w-16 h-16 mb-8 animate-pulse">
              <Image src="/logo.svg" alt="SV Monogram" width={64} height={64} priority className="w-full h-full" />
            </div>

            <h1 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-light tracking-[0.25em] text-slate-900 leading-none mb-4 uppercase">
              SANI VARADA
            </h1>
            
            <div className="h-[1px] w-24 bg-blue-600 mb-6" />
            
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-blue-600 mb-12 max-w-md leading-relaxed">
              AI/ML Architect &bull; Quant Analyst &bull; Founder of ML Arc
            </p>

            <button
              onClick={handleEnter}
              className="group relative px-10 py-4 border border-blue-600 hover:border-blue-700 rounded-full font-mono text-xs uppercase tracking-widest text-[#0f172a] hover:text-white transition-all bg-transparent hover:bg-blue-600 shadow-md overflow-hidden cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-3">
                Enter The Experience <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          <div className="absolute bottom-12 font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500">
            &copy; 2026
          </div>
        </main>
      )}

      {/* SCROLLABLE DOSSIER LAYOUT */}
      {entered && (
        <div className="relative w-full h-[1200vh] z-10">
          
          {/* SECTION 1 OVERLAYS (visible during vertical canvas scroll, fades out as Panel 1 enters) */}
          {overlayOpacity > 0 && (
            <div 
              className="fixed inset-0 z-20 pointer-events-none transition-opacity duration-75 flex flex-col justify-between p-6 md:p-12"
              style={{ opacity: overlayOpacity }}
            >
              {/* Header */}
              <header className="w-full flex justify-between items-center text-[10px] font-mono tracking-[0.2em] text-slate-800 uppercase pointer-events-auto">
                <div className="font-bold cursor-pointer hover:text-blue-600 transition-colors" onClick={() => scrollToVH(0)}>
                  ML ARC // ARCHITECT
                </div>
                <div className="hidden sm:block opacity-65 font-bold">
                  {timeStr || "10:37 AM"}
                </div>
                <nav className="flex gap-4 sm:gap-6 md:gap-8 font-semibold">
                  <button onClick={() => scrollToVH(5.0)} className="hover:text-blue-600 transition-colors cursor-pointer">ABOUT</button>
                  <button onClick={() => scrollToVH(6.0)} className="hover:text-blue-600 transition-colors cursor-pointer">CASES</button>
                  <button onClick={() => scrollToVH(8.0)} className="hover:text-blue-600 transition-colors cursor-pointer">QUANT</button>
                  <button onClick={() => scrollToVH(9.0)} className="hover:text-blue-600 transition-colors cursor-pointer">SERVICES</button>
                  <button onClick={() => scrollToVH(10.0)} className="hover:text-blue-600 transition-colors cursor-pointer">INQUIRE</button>
                  <button onClick={() => scrollToVH(11.0)} className="hover:text-blue-600 transition-colors cursor-pointer">CONTACT</button>
                </nav>
                <a 
                  href="https://calendly.com/imsunnystark/30min" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="border border-slate-800 hover:bg-slate-800 hover:text-white px-3 py-1.5 md:px-4 rounded-full transition-all text-[9px] font-bold tracking-widest"
                >
                  BOOK A CALL
                </a>
              </header>

              {/* Middle Section (Body Content) */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto pt-16 pb-8">
                {/* Left Content (Socials & Big Name) */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-12">
                  {/* Vertical Socials List */}
                  <div className="flex flex-col gap-3 text-[10px] font-mono tracking-widest uppercase pointer-events-auto">
                    <a href="https://www.facebook.com/MLArc" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors w-max">FACEBOOK</a>
                    <a href="https://www.instagram.com/mlarc.ai/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors w-max">INSTAGRAM</a>
                    <a href="https://x.com/mlarc_ai" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors w-max">X (TWITTER)</a>
                    <a href="https://www.linkedin.com/company/mlarc/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors w-max">LINKEDIN</a>
                    <a href="https://github.com/Sani-varda" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors w-max">GITHUB</a>
                  </div>

                  {/* Big Name */}
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-slate-400 block tracking-wider">(26)</span>
                    <h2 className="font-serif text-[clamp(3rem,8vw,7.5rem)] font-light leading-[0.85] tracking-tight uppercase text-slate-900 select-none">
                      SANI<br />VARADA
                    </h2>
                  </div>
                </div>

                {/* Right Content (Description Columns) */}
                <div className="lg:col-span-6 space-y-6 lg:space-y-8 text-slate-800 pointer-events-auto">
                  <p className="font-sans font-bold text-base sm:text-lg lg:text-[20px] tracking-tight leading-snug text-slate-900 border-l-2 border-blue-600/30 pl-5">
                    ML Arc® is the design & engineering work of Sani Varada, AI/ML Architect delivering advanced generative systems, custom RAG pipelines, and systematic volatility strategies globally.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 font-mono text-[10px] leading-relaxed">
                    <div className="space-y-2">
                      <span className="text-blue-600 font-bold block uppercase tracking-wider">Sani Varada Studio</span>
                      <p className="text-slate-600">
                        Applying 5+ years of experience in system architecture, LLM agent pipelines, and database tuning to enable enterprise-scale automation and cost efficiency.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-blue-600 font-bold block uppercase tracking-wider">Quant Systems</span>
                      <p className="text-slate-600">
                        Implementing GARCH volatility clustering forecast models, LSTM regime estimation, and autonomous SMS/Telegram execution triggers (Hermes Agent).
                      </p>
                    </div>
                  </div>

                  {/* Cursive Design Sign-off & Episode info */}
                  <div className="flex justify-between items-center pt-4 text-[10px] font-mono tracking-widest text-slate-500">
                    <div className="flex items-center gap-2">
                      <span>A Design by</span>
                      <span className="font-serif italic font-semibold text-slate-800 text-xs">Sani Varada</span>
                    </div>
                    <div>
                      <span>EP. 01</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer (bottom bar) */}
              <footer className="w-full flex justify-between items-center text-[9px] font-mono tracking-[0.25em] text-slate-400 uppercase select-none">
                <div>
                  AI/ML ARCHITECT &bull; QUANT ANALYST
                </div>
                <div>
                  // 2026
                </div>
              </footer>
            </div>
          )}

          {/* Floating Vertical Social Sidebar */}
          <div 
            className="fixed right-6 top-1/2 z-40 hidden md:flex flex-col items-center bg-white/80 backdrop-blur-md border border-slate-200/50 py-6 px-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover-pause w-12" 
            aria-label="Social Links Sidebar"
            style={{ 
              opacity: 1 - overlayOpacity, 
              pointerEvents: overlayOpacity < 0.5 ? 'auto' : 'none',
              transform: `translateY(-50%) scale(${overlayOpacity < 0.5 ? 1 : 0.95})`
            }}
          >
            <div className="h-[220px] overflow-hidden mask-gradient-vertical flex flex-col items-center py-2 w-full">
              <div className="flex flex-col gap-6 items-center animate-marquee-vertical-down">
                {/* First Set */}
                {socialLinks.map(({ href, title, icon: Icon }, idx) => (
                  <a 
                    key={`set1-${idx}`}
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-500 hover:text-blue-700 hover:scale-110 transition-all duration-200 py-1"
                    title={title}
                    aria-label={title}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
                {/* Second Set (Duplicate for seamless loop) */}
                {socialLinks.map(({ href, title, icon: Icon }, idx) => (
                  <a 
                    key={`set2-${idx}`}
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-500 hover:text-blue-700 hover:scale-110 transition-all duration-200 py-1"
                    title={title}
                    aria-label={title}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* SECTION 1: SCROLL-DRIVEN SEQUENCE SCENE (CLEAN VIEW WITH DYNAMIC SCROLLER SPACE) */}
          <div className="h-[500vh] w-full relative">
          </div>

          {/* SECTION 2: THE CONTENT PACK (STAYS STICKY AND SLIDES HORIZONTALLY) */}
          <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-transparent z-10">
            <div 
              ref={sliderRef}
              className="flex h-full w-[700vw] transition-transform duration-75 ease-out relative"
              style={{ transform: "translateX(100vw)" }}
            >
              {/* Shared Parallax Background for Panels 1, 2, 3, 4, 5, and 6 */}
              <div className="absolute left-0 top-0 w-[600vw] h-full pointer-events-none z-0 overflow-hidden">
                <MountainVistaParallax />
              </div>
              {/* PANEL 1: PROFILE & CREDENTIALS */}
              <div className="w-screen h-screen flex-shrink-0 relative bg-transparent text-black overflow-y-auto no-scrollbar flex flex-col justify-start py-16 md:py-24">
                {/* Fullscreen Video Background (subtle particle effect) */}
                <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-10">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-screen"
                    src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4"
                  />
                </div>

                {/* Clean Floating Text Container (No Blur, No Images, No Blocks) */}
                <div className="relative z-20 w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16 pointer-events-none">
                  
                  {/* Part 1: Hero Profile Header */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pointer-events-auto">
                    <div className="lg:col-span-7 space-y-4">
                      <span className="font-mono text-xs uppercase tracking-[0.3em] text-black font-bold">
                        &mdash; Profile & Summary
                      </span>
                      <h2 className="font-podium text-black uppercase leading-[0.9] tracking-tight text-[clamp(2.5rem,6vw,5.5rem)]">
                        SANI<br />VARADA
                      </h2>
                      <p className="font-mono text-xs uppercase tracking-widest text-black">
                        AI/ML Architect &bull; Quant Analyst &bull; Founder of ML Arc
                      </p>
                    </div>
                    
                    <div className="lg:col-span-5 lg:pt-10 border-l border-black/40 pl-6 space-y-4">
                      <p className="font-sans font-bold text-base md:text-lg tracking-tight text-black leading-relaxed">
                        AI/ML Architect and Entrepreneur combining advanced system design with quantitative finance.
                      </p>
                      <ul className="space-y-2 font-mono text-[11px] text-black">
                        <li>&bull; Specializing in LangChain / LangGraph agent orchestration</li>
                        <li>&bull; Designing hybrid RAG pipelines & production vector systems</li>
                        <li>&bull; Implementing statistical EGARCH / LSTM volatility models</li>
                        <li>&bull; Trading major assets: XAU/USD, options, and indexes</li>
                      </ul>
                    </div>
                  </div>

                  {/* Part 2: Technical Competencies Grid */}
                  <div className="space-y-6 pointer-events-auto">
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-black font-bold block">
                      &mdash; Core Competencies
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-mono text-xs text-black font-bold uppercase tracking-wider">AI & LLM</h4>
                        <p className="text-[11px] text-black leading-relaxed">
                          LangChain, LangGraph, custom RAG pipelines, Pinecone/FAISS vector databases, agent fine-tuning, and prompt engineering.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-mono text-xs text-black font-bold uppercase tracking-wider">Quant & Algo</h4>
                        <p className="text-[11px] text-black leading-relaxed">
                          Systematic strategy backtesting, EGARCH conditional volatility forecasting, LSTM sequence modeling, HMM regime detection.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-mono text-xs text-black font-bold uppercase tracking-wider">Cloud & MLOps</h4>
                        <p className="text-[11px] text-black leading-relaxed">
                          Azure AKS Kubernetes orchestration, Databricks Spark pipelines, MLflow tracking, and Grafana / Prometheus observability.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-mono text-xs text-black font-bold uppercase tracking-wider">Web & SaaS</h4>
                        <p className="text-[11px] text-black leading-relaxed">
                          Next.js, React, FastAPI, Node.js API routers, Supabase, and event-driven serverless background automation.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Part 3: Professional Experience */}
                  <div className="space-y-6 pointer-events-auto">
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-black font-bold block">
                      &mdash; Professional Experience
                    </span>
                    <div className="space-y-8 border-l border-sky-400/40 pl-6">
                      <div className="space-y-2.5 relative">
                        <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-sky-500" />
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 text-xs font-mono">
                          <span className="text-black font-bold uppercase tracking-wider">Founder & AI Solutions Architect &bull; ML Arc</span>
                          <span className="text-black font-semibold">2026 &mdash; Present | Hyderabad, India</span>
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-[11px] text-black leading-relaxed">
                          <li>Founded ML Arc, an AI software agency delivering LLM-powered SaaS, automation agents, voice chatbots, and performance marketing solutions to global clients.</li>
                          <li>Architected production RAG pipelines, multi-agent LangChain systems, and custom fine-tuned models reducing client operational overhead by 60% on average.</li>
                          <li>Led delivery of 15+ AI projects end-to-end — from requirements through deployment and MLOps monitoring — maintaining 100% on-time delivery record.</li>
                          <li>Managed Meta and Google Ads campaigns generating 4x+ average ROAS for e-commerce and SaaS clients, with algorithmic budget reallocation tools built in Python.</li>
                          <li>Implemented Grafana + Prometheus observability for all production LLM deployments, providing clients real-time model health and cost dashboards.</li>
                        </ul>
                      </div>

                      <div className="space-y-2.5 relative">
                        <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-sky-500" />
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 text-xs font-mono">
                          <span className="text-black font-bold uppercase tracking-wider">Quant Analyst & Algorithmic Trader</span>
                          <span className="text-black font-semibold">2021 &mdash; Present | Remote</span>
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-[11px] text-black leading-relaxed">
                          <li>Develop and backtest quantitative trading strategies across XAU/USD, forex majors (EUR/USD, GBP/USD), BTC/USD, BankNifty, and Nifty50 using Python and TA-Lib.</li>
                          <li>Built a multi-instrument signal engine combining momentum, mean-reversion, and volatility regime filters — achieving Sharpe ratio of 1.8+ in live trading.</li>
                          <li>Automated trade execution and risk management with Python scripts integrating broker APIs, enforcing dynamic position sizing via Kelly Criterion and ATR-based stops.</li>
                          <li>Apply time series models (ARIMA, GARCH, LSTM) for volatility forecasting and regime detection across commodity and equity index markets.</li>
                          <li>Maintain live Grafana dashboards tracking P&L attribution, drawdown, win rate, and risk metrics across all instruments in real time.</li>
                        </ul>
                      </div>

                      <div className="space-y-2.5 relative">
                        <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-sky-500" />
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 text-xs font-mono">
                          <span className="text-black font-bold uppercase tracking-wider">AI/ML Engineer &bull; Freelance / Contract</span>
                          <span className="text-black font-semibold">2022 &mdash; 2024 | Remote</span>
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-[11px] text-black leading-relaxed">
                          <li>Built enterprise-grade ML feature pipelines on Azure Databricks with PySpark, processing 100M+ records daily using Delta Lake ACID transactions.</li>
                          <li>Delivered RAG systems with OpenAI embeddings + Pinecone/FAISS hybrid search, reducing LLM hallucination rates by 35% vs. vanilla GPT-4 baselines.</li>
                          <li>Deployed LangChain agents with tool-use (web search, SQL, API calls) for autonomous workflow automation across five enterprise clients.</li>
                          <li>Reduced model deployment cycles from 2 weeks to under 4 hours using Azure ML + MLflow experiment tracking and GitHub Actions CI/CD.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Part 4: Credentials */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-black/20 pointer-events-auto">
                    <div className="md:col-span-7 space-y-3">
                      <span className="font-mono text-xs uppercase tracking-[0.3em] text-black font-bold block">
                        &mdash; Certifications
                      </span>
                      <ul className="grid grid-cols-1 gap-1.5 font-mono text-[10px] text-black">
                        <li>&bull; Microsoft Certified: Azure Data Engineer Associate (DP-203)</li>
                        <li>&bull; Databricks Certified Associate Developer for Apache Spark</li>
                        <li>&bull; LangChain for LLM Application Development &bull; DeepLearning.AI</li>
                        <li>&bull; Building Systems with the ChatGPT API &bull; DeepLearning.AI</li>
                        <li>&bull; Financial Markets &bull; Yale University / Coursera</li>
                        <li>&bull; Algorithmic Trading & Quantitative Analysis &bull; Udemy / QuantInsti</li>
                      </ul>
                    </div>
                    <div className="md:col-span-5 space-y-3">
                      <span className="font-mono text-xs uppercase tracking-[0.3em] text-black font-bold block">
                        &mdash; Education
                      </span>
                      <div className="font-mono text-xs space-y-1">
                        <span className="text-black font-bold block">Bachelor of Engineering</span>
                        <span className="text-black block">Computer Science / Information Technology (2016 &mdash; 2020)</span>
                        <span className="text-black text-[10px] block">Hyderabad, India</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* PANEL 2: PERSONAL CASE STUDIES */}
              <div className="w-screen h-screen flex-shrink-0 flex flex-col justify-start md:justify-center items-center bg-transparent overflow-y-auto no-scrollbar relative text-slate-900">
                
                {/* Corner Frame Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 border-slate-900/20 z-20 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 border-slate-900/20 z-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 border-slate-900/20 z-20 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 border-slate-900/20 z-20 pointer-events-none"></div>

                {!showPersonalCaseStudiesDossier ? (
                  /* COVER VIEW (MATCHES SCREENSHOT DESIGN WITH CENTRED CONTENT, NO VIDEO) */
                  <div className="w-full h-full relative z-10 flex flex-col justify-center items-center px-6 sm:px-12 md:px-20 lg:px-24 py-16 transition-all duration-300">
                    <div className="max-w-xl w-full flex flex-col items-center text-center space-y-6">
                      {/* Top decorative line */}
                      <div className="flex items-center gap-3 w-full max-w-md opacity-60">
                        <div className="flex-1 h-px bg-slate-900"></div>
                        <span className="text-slate-900 text-[10px] font-mono tracking-wider uppercase font-bold px-1 shrink-0">ENGINEERING & QUANT PROJECTS</span>
                        <div className="flex-1 h-px bg-slate-900"></div>
                      </div>

                      {/* Title with dithered accent */}
                      <div className="relative">
                        <h2 className="text-3xl lg:text-6xl font-bold text-slate-900 mb-2 leading-tight font-mono tracking-wider" style={{ letterSpacing: '0.1em' }}>
                          PERSONAL
                          <span className="block text-slate-800 mt-2 opacity-90 font-mono">
                            CASE STUDIES
                          </span>
                        </h2>
                      </div>

                      {/* Decorative dots pattern - desktop only */}
                      <div className="hidden lg:flex gap-1.5 justify-center opacity-40 w-full max-w-sm">
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div key={i} className="w-0.5 h-0.5 bg-slate-900 rounded-full"></div>
                        ))}
                      </div>

                      {/* Description with subtle grid pattern */}
                      <div className="relative max-w-lg">
                        <p className="text-xs lg:text-base text-slate-700 leading-relaxed font-mono opacity-85">
                          Where mathematical models meet robust systems — Sani Varada's select case studies
                        </p>
                      </div>

                      {/* Buttons with technical accents */}
                      <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center pt-2 w-full max-w-md">
                        <button 
                          onClick={() => setShowPersonalCaseStudiesDossier(true)}
                          className="relative px-6 py-2.5 bg-transparent text-slate-900 font-mono text-xs lg:text-sm border border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-200 group cursor-pointer flex-1 text-center"
                        >
                          <span className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border-t border-l border-slate-900 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          <span className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-slate-900 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          EXPLORE DOSSIER
                        </button>
                        
                        <button 
                          onClick={() => scrollToVH(8.0)}
                          className="relative px-6 py-2.5 bg-transparent border border-slate-900 text-slate-900 font-mono text-xs lg:text-sm hover:bg-slate-900 hover:text-white transition-all duration-200 cursor-pointer flex-1 text-center" 
                          style={{ borderWidth: '1px' }}
                        >
                          HERMES ENGINE
                        </button>
                      </div>

                      {/* Bottom technical notation - desktop only */}
                      <div className="hidden lg:flex items-center gap-3 w-full max-w-md opacity-40 pt-4">
                        <span className="text-slate-900 text-[9px] font-mono">∞</span>
                        <div className="flex-1 h-px bg-slate-300"></div>
                        <span className="text-slate-900 text-[9px] font-mono uppercase">CASE STUDIES</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* INTERACTIVE DOSSIER VIEW */
                  <div className="w-full max-w-6xl my-auto px-6 md:px-12 py-16 relative z-10 transition-all duration-300 text-slate-900">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-200 pb-4 gap-4">
                      <div className="relative flex items-center gap-4">
                        {/* Back Button with technical design */}
                        <button 
                          onClick={() => setShowPersonalCaseStudiesDossier(false)}
                          className="px-3 py-1.5 border border-slate-350 text-[10px] font-mono uppercase hover:bg-slate-900 hover:text-white transition-all cursor-pointer flex items-center gap-2"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" /> Back
                        </button>
                        
                        <div className="relative">
                          <span className="font-mono text-xs text-slate-500 uppercase tracking-widest block">&mdash; Engineering & Quant Projects</span>
                          <h2 className="font-sans font-bold text-3xl tracking-tight text-slate-900 uppercase" style={{ letterSpacing: '0.05em' }}>Personal Case Studies</h2>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {personalCaseStudies.map((_, i) => (
                          <button 
                            key={i}
                            onClick={() => setActivePersonalCaseStudy(i)}
                            className={`w-8 h-8 rounded-full border text-[10px] font-mono flex items-center justify-center transition-all cursor-pointer ${
                              activePersonalCaseStudy === i 
                              ? 'bg-slate-900 text-white border-slate-900 font-bold' 
                              : 'border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-900'
                            }`}
                            aria-label={`View personal case study ${i + 1}: ${personalCaseStudies[i].title}`}
                            aria-selected={activePersonalCaseStudy === i}
                          >
                            0{i+1}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-auto lg:h-[50vh]">
                      <div className="lg:col-span-4 flex flex-col gap-2 overflow-y-auto no-scrollbar pr-2">
                        {personalCaseStudies.map((pcs, i) => (
                          <button
                            key={pcs.id}
                            onClick={() => setActivePersonalCaseStudy(i)}
                            className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                              activePersonalCaseStudy === i 
                              ? 'bg-slate-100 border-slate-200 text-slate-900 shadow-sm' 
                              : 'bg-transparent border-transparent hover:bg-slate-50 hover:text-slate-900'
                            }`}
                            aria-label={`Select case study ${i + 1}: ${pcs.title}`}
                            aria-selected={activePersonalCaseStudy === i}
                          >
                            <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block mb-1">0{i+1} &bull; {pcs.category}</span>
                            <h4 className={`font-sans text-sm font-bold tracking-tight ${activePersonalCaseStudy === i ? 'text-slate-900' : 'text-slate-600'}`}>{pcs.title}</h4>
                          </button>
                        ))}
                      </div>

                      <div className="lg:col-span-8 flex flex-col justify-between overflow-y-auto no-scrollbar relative">
                        <div className="space-y-4">
                          <div className="flex flex-wrap justify-between items-baseline gap-4 mb-4">
                            <h3 className="font-sans text-xl font-extrabold tracking-tight text-black uppercase">
                              {personalCaseStudies[activePersonalCaseStudy].title}
                            </h3>
                            <span className="px-3 py-1 bg-transparent border border-black rounded-full font-mono text-[9px] uppercase tracking-wider text-black font-semibold">
                              {personalCaseStudies[activePersonalCaseStudy].category}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
                            <div className="md:col-span-8 space-y-4">
                              <div className="border-l-2 border-black/40 pl-5 py-1">
                                <strong className="text-black/60 block font-mono uppercase text-[9px] tracking-wider mb-1">The Challenge:</strong>
                                <p className="font-sans font-bold text-base md:text-lg tracking-tight leading-snug text-black">
                                  {renderRevealText(personalCaseStudies[activePersonalCaseStudy].challenge, p2ScrollProgress)}
                                </p>
                              </div>
                              <div className="border-l-2 border-black/40 pl-5 py-1">
                                <strong className="text-black/60 block font-mono uppercase text-[9px] tracking-wider mb-1">The Solution:</strong>
                                <p className="font-sans font-bold text-base md:text-lg tracking-tight leading-snug text-black">
                                  {renderRevealText(personalCaseStudies[activePersonalCaseStudy].solution, p2ScrollProgress)}
                                </p>
                              </div>
                              <div className="text-[10px] font-mono text-black pt-2 border-t border-black/20">
                                Tech Stack: <span className="text-black font-semibold">{personalCaseStudies[activePersonalCaseStudy].tech}</span>
                              </div>
                            </div>

                            <div className="md:col-span-4 p-4 flex flex-col justify-center items-center text-center">
                              <span className="font-mono text-[9px] text-black/60 uppercase tracking-wider">
                                {personalCaseStudies[activePersonalCaseStudy].metricLabel}
                              </span>
                              <span className="text-[28px] font-sans font-black text-black leading-none my-1 tracking-tight">
                                {personalCaseStudies[activePersonalCaseStudy].metricAfter}
                              </span>
                              <span className="font-mono text-[10px] text-black font-extrabold">
                                {personalCaseStudies[activePersonalCaseStudy].metricChange}
                              </span>
                              <span className="font-mono text-[9px] text-black/50 line-through mt-1">
                                Before: {personalCaseStudies[activePersonalCaseStudy].metricBefore}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-black/20 pt-4 flex items-center font-mono text-[10px] text-black tracking-wider">
                          <span className="text-black font-bold mr-2">Impact:</span>
                          {personalCaseStudies[activePersonalCaseStudy].impact}
                        </div>
                      </div>
                    </div>

                    {/* Bottom technical notation */}
                    <div className="hidden lg:flex items-center gap-2 mt-6 opacity-30">
                      <span className="text-slate-900 text-[9px] font-mono">∞</span>
                      <div className="flex-1 h-px bg-slate-300"></div>
                      <span className="text-slate-900 text-[9px] font-mono uppercase tracking-widest">Sani Varada &bull; Vitruvian Framework</span>
                    </div>
                  </div>
                )}
              </div>


              {/* PANEL 3: CASE STUDIES */}
              <div className="w-screen h-screen flex-shrink-0 flex flex-col justify-start md:justify-center items-center px-6 md:px-24 py-16 bg-transparent overflow-y-auto no-scrollbar relative text-slate-900">
                

                <div className="w-full max-w-6xl my-auto relative z-10">
                  <div className="flex justify-between items-baseline mb-8 border-b border-slate-200 pb-4">
                    <div>
                      <span className="font-mono text-xs text-slate-500 uppercase tracking-widest block">&mdash; Performance Case Studies</span>
                      <h2 className="font-sans font-bold text-3xl tracking-tight text-slate-900 uppercase" style={{ letterSpacing: '0.05em' }}>ML Arc Agency</h2>
                    </div>
                    
                    <div className="flex gap-2">
                      {caseStudies.map((_, i) => (
                        <button 
                          key={i}
                          onClick={() => setActiveCaseStudy(i)}
                          className={`w-8 h-8 rounded-full border text-[10px] font-mono flex items-center justify-center transition-all cursor-pointer ${
                            activeCaseStudy === i 
                            ? 'bg-slate-900 text-white border-slate-900 font-bold' 
                            : 'border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-900'
                          }`}
                          aria-label={`View agency case study ${i + 1}: ${caseStudies[i].title}`}
                          aria-selected={activeCaseStudy === i}
                        >
                          0{i+1}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch h-auto lg:h-[50vh]">
                    <div className="lg:col-span-4 flex flex-col gap-2 overflow-y-auto no-scrollbar pr-2">
                      {caseStudies.map((cs, i) => (
                        <button
                          key={cs.id}
                          onClick={() => setActiveCaseStudy(i)}
                          className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                            activeCaseStudy === i 
                            ? 'bg-slate-100 border-slate-200 text-slate-900 shadow-sm' 
                            : 'bg-transparent border-transparent hover:bg-slate-50 hover:text-slate-900'
                          }`}
                          aria-label={`Select agency case study ${i + 1}: ${cs.title}`}
                          aria-selected={activeCaseStudy === i}
                        >
                          <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block mb-1">0{i+1} &bull; {cs.client}</span>
                          <h4 className={`font-sans text-sm font-bold tracking-tight ${activeCaseStudy === i ? 'text-slate-900' : 'text-slate-600'}`}>{cs.title}</h4>
                        </button>
                      ))}
                    </div>

                    <div className="lg:col-span-8 flex flex-col justify-between overflow-y-auto no-scrollbar relative">
                      <div>
                        <div className="flex flex-wrap justify-between items-baseline gap-4 mb-4">
                          <h3 className="font-sans text-xl font-extrabold tracking-tight text-black uppercase">
                            {caseStudies[activeCaseStudy].title}
                          </h3>
                          <span className="px-3 py-1 bg-transparent border border-black rounded-full font-mono text-[9px] uppercase tracking-wider text-black font-semibold">
                            {caseStudies[activeCaseStudy].sector}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
                          <div className="md:col-span-8 space-y-4">
                            <div className="border-l-2 border-black/40 pl-5 py-1">
                              <strong className="text-black/60 block font-mono uppercase text-[9px] tracking-wider mb-1">The Challenge:</strong>
                              <p className="font-sans font-bold text-base md:text-lg tracking-tight leading-snug text-black">
                                {caseStudies[activeCaseStudy].challenge}
                              </p>
                            </div>
                            <div className="border-l-2 border-black/40 pl-5 py-1">
                              <strong className="text-black/60 block font-mono uppercase text-[9px] tracking-wider mb-1">The Solution:</strong>
                              <p className="font-sans font-bold text-base md:text-lg tracking-tight leading-snug text-black">
                                {caseStudies[activeCaseStudy].solution}
                              </p>
                            </div>
                          </div>

                          <div className="md:col-span-4 p-4 flex flex-col justify-center items-center text-center">
                            <span className="font-mono text-[9px] text-black/60 uppercase tracking-wider">
                              {caseStudies[activeCaseStudy].metricLabel}
                            </span>
                            <span className="text-[28px] font-sans font-black text-black leading-none my-1 tracking-tight">
                              {caseStudies[activeCaseStudy].metricAfter}
                            </span>
                            <span className="font-mono text-[10px] text-black font-extrabold">
                              {caseStudies[activeCaseStudy].metricChange}
                            </span>
                            <span className="font-mono text-[9px] text-black/50 line-through mt-1">
                              Before: {caseStudies[activeCaseStudy].metricBefore}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-black/20 pt-4 flex flex-col md:flex-row justify-between gap-4">
                        <div className="max-w-md italic text-xs text-black/80 relative pl-4 border-l border-black/30">
                          &ldquo;{caseStudies[activeCaseStudy].testimonial}&rdquo;
                          <span className="block not-italic font-mono text-[9px] text-black/65 uppercase tracking-widest mt-1.5">
                            &mdash; {caseStudies[activeCaseStudy].speaker}
                          </span>
                        </div>
                        <div className="flex items-end font-mono text-[10px] text-black tracking-wider font-semibold">
                          {caseStudies[activeCaseStudy].impact}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PANEL 4: QUANT TRADING */}
              <div className="w-screen h-screen flex-shrink-0 flex flex-col justify-start md:justify-center items-center px-6 md:px-24 py-16 bg-transparent overflow-y-auto no-scrollbar relative text-slate-900">
                


                <div className="w-full max-w-4xl space-y-8 my-auto relative z-10">
                  {/* Hermes Agent Banner */}
                  <div className="w-full aspect-[1000/150] relative rounded-xl overflow-hidden border border-slate-200/50 shadow-md bg-white hover:scale-[1.01] transition-transform duration-500">
                    <Image 
                      src="/image.png" 
                      alt="Hermes Agent Banner" 
                      fill 
                      priority 
                      sizes="(max-w-768px) 100vw, 800px"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <span className="font-mono text-xs text-blue-600 uppercase tracking-widest block mb-2">&mdash; Algorithmic Strategies</span>
                    <h2 className="font-sans font-bold text-3xl tracking-tight text-slate-900 leading-tight uppercase" style={{ letterSpacing: '0.05em' }}>Quantitative Trading</h2>
                  </div>
                  
                  <div className="relative pl-6 border-l-2 border-slate-300 py-1">
                    <span className="text-slate-300 font-serif text-5xl leading-none absolute left-0 top-0 select-none">“</span>
                    <p className="font-sans font-bold text-xl md:text-2xl tracking-tight leading-snug text-slate-900">
                      {renderRevealText(
                        "Developing systematic, backtested alpha models across futures, commodities, and index options. Utilizing time-series statistical models (ARIMA, GARCH) and deep sequence models (LSTM) to forecast volatility regimes. Integrates the Hermes Agent, an autonomous 24/7 personal assistant delivering live signal execution, risk-limit notifications, and portfolio monitoring directly to messaging platforms.",
                        p4ScrollProgress,
                        ["GARCH", "LSTM", "Hermes"]
                      )}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                    <div className="space-y-2 font-mono text-xs text-slate-700">
                      <div className="flex items-start gap-3">
                        <Zap className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Multi-Instrument Signal Engine:</strong> Combines momentum, mean-reversion, and Kelly Criterion sizing. Sharpe Ratio of 1.82+ in live trading.</span>
                      </div>
                    </div>
                    <div className="space-y-2 font-mono text-xs text-slate-700">
                      <div className="flex items-start gap-3">
                        <Shield className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Regime Detection:</strong> Leverages Hidden Markov Models (HMM) to classify intraday index option regimes, achieving 71% out-of-sample accuracy.</span>
                      </div>
                    </div>
                    <div className="space-y-2 font-mono text-xs text-slate-700">
                      <div className="flex items-start gap-3">
                        <Cpu className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Hermes Autonomous Agent:</strong> A 24/7 personal assistant integrating LLM logic with broker APIs to monitor portfolios, manage stop-losses, and execute SMS/Telegram override commands.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PANEL 5: OUR CORE SERVICES */}
              <div className="w-screen h-screen flex-shrink-0 flex flex-col justify-start md:justify-center items-center px-6 md:px-16 py-12 bg-transparent overflow-y-auto no-scrollbar relative overflow-hidden">
                


                <div className="w-full max-w-6xl my-auto relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-baseline mb-6 border-b border-slate-200 pb-4">
                    <div>
                      <span className="font-mono text-xs text-blue-600 uppercase tracking-widest block mb-1">&mdash; Technical Capabilities</span>
                      <h2 className="font-sans font-extrabold text-3xl tracking-tight text-slate-900 uppercase font-bold">Our Core Services</h2>
                    </div>
                    
                    {/* Category Filter Tabs */}
                    <div className="flex flex-wrap gap-2 mt-4 md:mt-0 font-mono text-[9px] uppercase tracking-wider">
                      {[
                        { id: "all", label: "All" },
                        { id: "ai", label: "AI Agents" },
                        { id: "automation", label: "Automation" },
                        { id: "web", label: "Web & CRM" },
                        { id: "marketing", label: "Ads & Growth" }
                      ].map((grp) => (
                        <button
                          key={grp.id}
                          onClick={() => setActiveServiceGroup(grp.id)}
                          className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                            activeServiceGroup === grp.id
                              ? "bg-blue-600 text-white border-blue-600 font-bold"
                              : "border-slate-200 text-slate-500 hover:border-blue-600/40 hover:text-blue-600"
                          }`}
                        >
                          {grp.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Services Grid with Vertical Overflow */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-none overflow-visible lg:max-h-[62vh] lg:overflow-y-auto pr-2 no-scrollbar pb-6">
                    {(activeServiceGroup === "all" ? services : services.filter(s => s.group === activeServiceGroup)).map((s, idx) => {
                      const ServiceIcon = s.icon || Brain;

                      return (
                        <div 
                          key={idx} 
                          className="p-4 transition-all duration-300 hover:-translate-y-0.5 group flex flex-col justify-between min-h-[200px]"
                        >
                          <div>
                            <div className="flex items-center gap-2.5 mb-2.5">
                              <ServiceIcon className="w-5 h-5 text-blue-600 shrink-0" />
                              <h4 className="font-sans font-bold text-sm text-black tracking-tight leading-snug">{s.title}</h4>
                            </div>
                            <p className="text-xs text-black leading-relaxed mb-3">
                              {s.description}
                            </p>
                          </div>
                          
                          <ul className="space-y-1 font-mono text-[10px] text-black pt-2 border-t border-slate-300/40">
                            {s.details.map((detail, dIdx) => (
                              <li key={dIdx} className="flex items-center gap-1">
                                <ChevronRight className="w-2 h-2 text-blue-600 shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* PANEL 6: LEAD INTAKE FORM */}
              <div className="w-screen h-screen flex-shrink-0 flex flex-col justify-start md:justify-center items-center px-6 md:px-24 py-16 overflow-y-auto no-scrollbar relative overflow-hidden bg-transparent text-slate-900">
                


                <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center my-auto relative z-10">
                  
                  {/* Left Column: Brief details */}
                  <div className="md:col-span-5 space-y-6">
                    <div>
                      <span className="font-mono text-xs text-slate-500 uppercase tracking-widest block mb-1">&mdash; Dossier Intake</span>
                      <h3 className="font-sans font-bold text-3xl tracking-tight text-slate-900 font-extrabold uppercase">Initiate Project</h3>
                    </div>
                    
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Submit your project parameters, system constraints, or quantitative directives. Your transmission will be securely routed directly to Sani Varada for architectural and resource scoping.
                    </p>

                    <div className="h-[1px] w-16 bg-slate-200" />

                    <div className="space-y-2 font-mono text-[9px] text-slate-500 uppercase tracking-wider">
                      <p><strong className="text-slate-700">Recipient:</strong> founder@mlarcai.com</p>
                      <p><strong className="text-slate-700">Routing:</strong> Secure Form Ingestion</p>
                      <p><strong className="text-slate-700">Response SLA:</strong> &lt; 24 Hours</p>
                    </div>
                  </div>

                  {/* Right Column: Interactive Form */}
                  <div className="md:col-span-7 p-6 sm:p-8">
                    {leadStatus === "success" ? (
                      <div className="text-center py-8 space-y-4">
                        <CheckCircle className="w-12 h-12 text-blue-600 mx-auto animate-bounce" />
                        <h4 className="font-serif text-lg font-semibold text-slate-900 uppercase tracking-wide">Transmission Complete</h4>
                        <p className="text-xs text-slate-600 max-w-xs mx-auto font-bold leading-relaxed">
                          Your project credentials have been successfully formatted and routed. Expect a response window shortly.
                        </p>
                        <button
                          type="button"
                          onClick={() => setLeadStatus("idle")}
                          className="px-5 py-2 border border-blue-600 rounded-full font-mono text-[9px] uppercase tracking-widest text-slate-800 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                        >
                          New Transmission
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleLeadSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label htmlFor="intake-name" className="block font-mono text-[8px] uppercase tracking-wider text-slate-600 font-bold">Your Name *</label>
                            <input
                              type="text"
                              id="intake-name"
                              name="name"
                              required
                              disabled={leadStatus === "submitting"}
                              value={leadFormData.name}
                              onChange={handleLeadChange}
                              className="w-full px-3 py-2 bg-white border border-slate-300 hover:border-slate-400 focus:border-blue-600 rounded-lg text-xs text-slate-900 outline-none transition-all"
                              placeholder="Name"
                            />
                          </div>
                          <div className="space-y-1">
                            <label htmlFor="intake-email" className="block font-mono text-[8px] uppercase tracking-wider text-slate-600 font-bold">Email Address *</label>
                            <input
                              type="email"
                              id="intake-email"
                              name="email"
                              required
                              disabled={leadStatus === "submitting"}
                              value={leadFormData.email}
                              onChange={handleLeadChange}
                              className="w-full px-3 py-2 bg-white border border-slate-300 hover:border-slate-400 focus:border-blue-600 rounded-lg text-xs text-slate-900 outline-none transition-all"
                              placeholder="email@domain.com"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="intake-message" className="block font-mono text-[8px] uppercase tracking-wider text-slate-600 font-bold">Project Parameters & Directives *</label>
                          <textarea
                            id="intake-message"
                            name="message"
                            required
                            rows={3}
                            disabled={leadStatus === "submitting"}
                            value={leadFormData.message}
                            onChange={handleLeadChange}
                            className="w-full px-3 py-2 bg-white border border-slate-300 hover:border-slate-400 focus:border-blue-600 rounded-lg text-xs text-slate-900 outline-none transition-all resize-none"
                            placeholder="Detail your system constraints, budget targets, or quantitative directives..."
                          />
                        </div>

                        {leadStatus === "error" && (
                          <div className="text-[10px] font-mono text-red-650 bg-red-50 p-2 rounded border border-red-200/50">
                            {leadError}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={leadStatus === "submitting"}
                          className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-750 text-white rounded-lg font-mono text-[9px] uppercase tracking-widest shadow-sm transition-all cursor-pointer disabled:opacity-50"
                        >
                          {leadStatus === "submitting" ? "Transmitting..." : "Send Transmission"}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>

              {/* PANEL 7: DOWNLOADS & CONTACT */}
              <div className="w-screen h-auto md:h-screen flex-shrink-0 flex flex-col justify-start md:justify-center items-center px-6 md:px-24 py-16 bg-white overflow-y-auto no-scrollbar">
                <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 my-auto">
                  <div className="space-y-8">
                    <div>
                      <span className="font-mono text-xs text-blue-600 uppercase tracking-widest block mb-1">Architect dossiers</span>
                      <h3 className="font-sans font-bold text-2xl tracking-tight text-slate-900">Download Publications</h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      Acquire comprehensive offline literature containing detailed performance case studies and engineering summaries.
                    </p>

                    <div className="space-y-4">
                      <a 
                        href="/Sani_V.pdf" 
                        download 
                        className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 hover:border-blue-600/60 rounded-xl group transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div className="text-left">
                            <span className="block text-xs font-mono font-medium text-slate-800">Sani_V.pdf</span>
                            <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider">Curriculum Vitae // 201 KB</span>
                          </div>
                        </div>
                        <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                      </a>

                      <a 
                        href="/ML_Arc_Case_Studies.pdf" 
                        download 
                        className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 hover:border-blue-600/60 rounded-xl group transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div className="text-left">
                            <span className="block text-xs font-mono font-medium text-slate-800">ML_Arc_Case_Studies.pdf</span>
                            <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider">Agency Dossier // 242 KB</span>
                          </div>
                        </div>
                        <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between space-y-8">
                    <div>
                      <span className="font-mono text-xs text-blue-600 uppercase tracking-widest block mb-1">Let's talk</span>
                      <h3 className="font-sans font-bold text-2xl tracking-tight text-slate-900">Initiate Contact</h3>
                    </div>

                    <div className="space-y-4 font-mono text-xs">
                      <a 
                        href="mailto:founder@mlarcai.com"
                        className="flex items-center gap-3 text-slate-650 hover:text-blue-600 transition-colors w-max"
                      >
                        <Mail className="w-4 h-4 text-blue-600" />
                        <span>founder@mlarcai.com</span>
                      </a>

                      <a 
                        href="tel:+917021628334"
                        className="flex items-center gap-3 text-slate-655 hover:text-blue-600 transition-colors w-max"
                      >
                        <Phone className="w-4 h-4 text-blue-600" />
                        <span>+91 70216 28334</span>
                      </a>
                      
                      <a 
                        href="https://linkedin.com/in/sani-varada-845869176" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-slate-650 hover:text-blue-600 transition-colors w-max"
                      >
                        <FaLinkedin className="w-4 h-4 text-blue-600" />
                        <span>linkedin.com/in/sani-varada-845869176</span>
                      </a>
                      
                      <a 
                        href="https://github.com/Sani-varda" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-slate-650 hover:text-blue-600 transition-colors w-max"
                      >
                        <FaGithub className="w-4 h-4 text-blue-600" />
                        <span>github.com/Sani-varda</span>
                      </a>
                    </div>

                    <button
                      onClick={() => scrollToVH(10.0)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-mono text-[9px] uppercase tracking-widest shadow-md transition-all w-max cursor-pointer"
                    >
                      Fill Intake Form <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="border-t border-slate-200 pt-6 flex justify-between items-center text-slate-400 font-mono text-[9px] uppercase tracking-widest">
                      <div>
                        <span className="block text-slate-800 font-semibold">SANI VARADA</span>
                        <span>AI ARCHITECT // QUANT</span>
                      </div>
                      
                      <div className="w-8 h-8 opacity-60">
                        <Image src="/logo.svg" alt="SV" width={32} height={32} className="w-full h-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Structured SEO JSON-LD Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Sani Varada",
            "jobTitle": "AI/ML Engineer & Quantitative Analyst",
            "url": "https://www.mlarcai.com",
            "sameAs": [
              "https://www.linkedin.com/company/mlarc/",
              "https://x.com/mlarc_ai",
              "https://www.instagram.com/mlarc.ai/",
              "https://www.facebook.com/MLArc",
              "https://github.com/Sani-varda"
            ],
            "worksFor": {
              "@type": "Organization",
              "name": "ML Arc",
              "url": "https://www.mlarcai.com"
            },
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "Computer Science & IT Graduate"
            }
          })
        }}
      />
    </div>
  );
}
