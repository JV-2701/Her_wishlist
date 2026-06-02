import { useState, useEffect, useRef } from "react";
 
const CATEGORIES = [
  { id: "makeup", label: "Makeup", emoji: "💄", color: "#f4a0b5", light: "#fde8f0" },
  { id: "skincare", label: "Skincare & Beauty", emoji: "✨", color: "#e8a0c8", light: "#fce8f6" },
  { id: "dress", label: "Dresses", emoji: "👗", color: "#d48fb0", light: "#fae0ef" },
  { id: "tops", label: "Tops & Blouses", emoji: "👚", color: "#c97aad", light: "#f7d6ee" },
  { id: "bottoms", label: "Bottoms", emoji: "👖", color: "#b86fa2", light: "#f3ccec" },
  { id: "traditional", label: "Traditional Wear", emoji: "🥻", color: "#a86298", light: "#f0c4e8" },
  { id: "accessories", label: "Accessories", emoji: "👜", color: "#e8a0b4", light: "#fde8f0" },
  { id: "shoes", label: "Shoes & Heels", emoji: "👠", color: "#d490a8", light: "#fad8e8" },
  { id: "jewellery", label: "Jewellery", emoji: "💍", color: "#c880a0", light: "#f6d0e4" },
  { id: "hygiene", label: "Hygiene & Self-care", emoji: "🧴", color: "#de9fc0", light: "#fce4f2" },
];
 
const HEARTS = ["💗", "💕", "💖", "💝", "🌸", "✿", "꩜"];
const FLOATIES = ["🌸", "💕", "✨", "💗", "🌷", "💖", "🦋", "🌺", "⚓", "🏴‍☠️", "🌸", "💕"];
 
function FloatingPetals() {
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    emoji: FLOATIES[i % FLOATIES.length],
    left: `${(i * 8.3) + Math.random() * 5}%`,
    delay: `${i * 0.7}s`,
    duration: `${6 + (i % 4)}s`,
    size: i % 3 === 0 ? "1.4rem" : i % 2 === 0 ? "1rem" : "0.8rem",
  }));
 
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {petals.map(p => (
        <div key={p.id} style={{
          position: "absolute",
          top: "-2rem",
          left: p.left,
          fontSize: p.size,
          animation: `floatDown ${p.duration} ${p.delay} infinite linear`,
          opacity: 0.35,
        }}>
          {p.emoji}
        </div>
      ))}
      <style>{`
        @keyframes floatDown {
          0% { transform: translateY(-2rem) rotate(0deg); opacity: 0; }
          10% { opacity: 0.35; }
          90% { opacity: 0.35; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes popIn {
          0% { transform: scale(0.7); opacity: 0; }
          70% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideDown {
          0% { max-height: 0; opacity: 0; transform: translateY(-8px); }
          100% { max-height: 2000px; opacity: 1; transform: translateY(0); }
        }
        @keyframes heartPop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
 
function MetricsBar({ items }) {
  const total = Object.values(items).flat().length;
  const totalPrice = Object.values(items).flat().reduce((s, i) => s + (parseFloat(i.price) || 0), 0);
  const catCount = Object.values(items).filter(arr => arr.length > 0).length;
 
  return (
    <div style={{
      display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "28px",
      animation: "popIn 0.5s ease",
    }}>
      {[
        { label: "Total Wishlist Items", value: total, emoji: "🛍️" },
        { label: "Categories Used", value: `${catCount} / ${CATEGORIES.length}`, emoji: "📂" },
        { label: "Total Value", value: totalPrice > 0 ? `₹${totalPrice.toLocaleString("en-IN", { minimumFractionDigits: 0 })}` : "—", emoji: "💰" },
      ].map(m => (
        <div key={m.label} style={{
          flex: "1 1 140px",
          background: "linear-gradient(135deg, #fff0f6 0%, #ffe4f0 100%)",
          border: "1.5px solid #f4c0d8",
          borderRadius: "18px",
          padding: "14px 18px",
          textAlign: "center",
          boxShadow: "0 2px 12px rgba(220,100,150,0.10)",
        }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "4px" }}>{m.emoji}</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#c2185b", fontFamily: "'Georgia', serif", letterSpacing: "-0.5px" }}>{m.value}</div>
          <div style={{ fontSize: "0.72rem", color: "#c06090", marginTop: "2px", letterSpacing: "0.4px", textTransform: "uppercase", fontWeight: 600 }}>{m.label}</div>
        </div>
      ))}
    </div>
  );
}
 
function LinkCard({ item, onDelete, catColor }) {
  const [copied, setCopied] = useState(false);
  const heart = HEARTS[Math.floor(Math.random() * HEARTS.length)];
 
  const handleCopy = () => {
    navigator.clipboard.writeText(item.url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
 
  const short = item.url.length > 48 ? item.url.slice(0, 48) + "…" : item.url;
 
  return (
    <div style={{
      background: "#fff",
      border: `1.5px solid ${catColor}44`,
      borderLeft: `4px solid ${catColor}`,
      borderRadius: "14px",
      padding: "14px 16px",
      marginBottom: "10px",
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      animation: "popIn 0.35s ease",
      boxShadow: "0 2px 8px rgba(200,100,150,0.08)",
      transition: "box-shadow 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 18px rgba(200,100,150,0.18)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(200,100,150,0.08)"}
    >
      <div style={{ fontSize: "1.1rem", marginTop: "1px", flexShrink: 0 }}>{heart}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <a href={item.url} target="_blank" rel="noopener noreferrer"
          style={{ color: "#b5245c", fontSize: "0.82rem", wordBreak: "break-all", textDecoration: "none", display: "block", marginBottom: "4px", fontWeight: 500 }}
          onMouseEnter={e => e.target.style.textDecoration = "underline"}
          onMouseLeave={e => e.target.style.textDecoration = "none"}
        >{short}</a>
        {item.note && <div style={{ fontSize: "0.78rem", color: "#c07090", marginBottom: "4px", fontStyle: "italic" }}>📝 {item.note}</div>}
        {item.price && <div style={{ display: "inline-block", background: "linear-gradient(90deg,#fce4f0,#f9d0e8)", color: "#b5245c", fontSize: "0.78rem", padding: "2px 10px", borderRadius: "20px", fontWeight: 700, border: "1px solid #f4b0d0" }}>₹{parseFloat(item.price).toLocaleString("en-IN")}</div>}
        <div style={{ fontSize: "0.72rem", color: "#d4a0b8", marginTop: "4px" }}>{item.date}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", flexShrink: 0 }}>
        <button onClick={handleCopy} title="Copy link" style={{ background: copied ? "#f4c0d8" : "#fde8f4", border: "none", borderRadius: "8px", padding: "5px 8px", cursor: "pointer", fontSize: "0.75rem", color: "#b5245c", fontWeight: 600, transition: "background 0.2s" }}>{copied ? "✓ Copied" : "Copy"}</button>
        <button onClick={onDelete} title="Remove" style={{ background: "#fff0f4", border: "none", borderRadius: "8px", padding: "5px 8px", cursor: "pointer", fontSize: "0.75rem", color: "#e57090", fontWeight: 600 }}>✕</button>
      </div>
    </div>
  );
}
 
function CategoryPanel({ cat, items, onAdd, onDelete }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [err, setErr] = useState("");
  const inputRef = useRef();
 
  const handleAdd = () => {
    if (!url.trim()) { setErr("Please paste a link first 🌸"); return; }
    try { new URL(url.trim()); } catch { setErr("Hmm, that doesn't look like a valid link 🤔"); return; }
    onAdd({ url: url.trim(), price: price.trim(), note: note.trim(), date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) });
    setUrl(""); setPrice(""); setNote(""); setErr(""); setShowForm(false);
  };
 
  const catItems = items[cat.id] || [];
 
  return (
    <div style={{
      background: open ? `linear-gradient(135deg, ${cat.light} 0%, #fff 60%)` : "#fff",
      border: `1.5px solid ${open ? cat.color + "88" : "#f0d0e0"}`,
      borderRadius: "20px",
      marginBottom: "12px",
      overflow: "hidden",
      transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
      boxShadow: open ? `0 6px 24px ${cat.color}28` : "0 2px 8px rgba(200,100,150,0.07)",
    }}>
      {/* Header */}
      <button onClick={() => { setOpen(o => !o); setShowForm(false); }} style={{
        width: "100%", display: "flex", alignItems: "center", gap: "12px",
        padding: "16px 20px", background: "transparent", border: "none", cursor: "pointer",
        textAlign: "left",
      }}>
        <span style={{ fontSize: "1.6rem" }}>{cat.emoji}</span>
        <span style={{ flex: 1, fontWeight: 700, fontSize: "0.98rem", color: open ? cat.color.replace("#", "") && cat.color : "#8b3060", fontFamily: "'Georgia', serif" }}>{cat.label}</span>
        {catItems.length > 0 && (
          <span style={{ background: `linear-gradient(135deg, ${cat.color}, ${cat.color}cc)`, color: "#fff", borderRadius: "20px", padding: "2px 10px", fontSize: "0.76rem", fontWeight: 700 }}>{catItems.length} {catItems.length === 1 ? "item" : "items"}</span>
        )}
        <span style={{ fontSize: "1rem", color: cat.color, transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s", flexShrink: 0 }}>▾</span>
      </button>
 
      {/* Body */}
      {open && (
        <div style={{ padding: "0 20px 18px", animation: "slideDown 0.3s ease" }}>
          {catItems.length === 0 && !showForm && (
            <div style={{ textAlign: "center", padding: "18px 0", color: "#d4a0b8", fontSize: "0.85rem" }}>
              <div style={{ fontSize: "2rem", marginBottom: "6px" }}>🛒</div>
              Nothing saved yet — add your first find!
            </div>
          )}
          {catItems.map((item, i) => (
            <LinkCard key={i} item={item} catColor={cat.color} onDelete={() => onDelete(cat.id, i)} />
          ))}
 
          {showForm ? (
            <div style={{ background: "linear-gradient(135deg,#fff0f6,#fde8f2)", border: "1.5px solid #f4c0d8", borderRadius: "16px", padding: "16px", animation: "popIn 0.3s ease" }}>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", fontSize: "0.78rem", color: "#c06090", fontWeight: 700, marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.4px" }}>Paste Product Link 🔗</label>
                <input ref={inputRef} value={url} onChange={e => { setUrl(e.target.value); setErr(""); }}
                  placeholder="https://..."
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #f4b0d0", fontSize: "0.86rem", outline: "none", background: "#fff", color: "#8b3060", boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "#c06090", fontWeight: 700, marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.4px" }}>Price (₹)</label>
                  <input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="e.g. 1299"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #f4b0d0", fontSize: "0.86rem", outline: "none", background: "#fff", color: "#8b3060", boxSizing: "border-box" }} />
                </div>
                <div style={{ flex: 2 }}>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "#c06090", fontWeight: 700, marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.4px" }}>Note (optional)</label>
                  <input value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Size M, in red"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1.5px solid #f4b0d0", fontSize: "0.86rem", outline: "none", background: "#fff", color: "#8b3060", boxSizing: "border-box" }} />
                </div>
              </div>
              {err && <div style={{ color: "#e05070", fontSize: "0.8rem", marginBottom: "8px" }}>{err}</div>}
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={handleAdd} style={{ flex: 1, background: `linear-gradient(135deg, ${cat.color}, ${cat.color}bb)`, color: "#fff", border: "none", borderRadius: "12px", padding: "10px", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", boxShadow: `0 3px 10px ${cat.color}55`, transition: "transform 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >💖 Save to Wishlist</button>
                <button onClick={() => { setShowForm(false); setErr(""); setUrl(""); setPrice(""); setNote(""); }} style={{ padding: "10px 16px", background: "#fff", border: "1.5px solid #f4b0d0", borderRadius: "12px", color: "#c06090", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>Cancel</button>
              </div>
            </div>
          ) : (
            <button onClick={() => { setShowForm(true); setTimeout(() => inputRef.current?.focus(), 100); }}
              style={{ width: "100%", padding: "10px", background: `${cat.light}`, border: `1.5px dashed ${cat.color}88`, borderRadius: "14px", color: cat.color, fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", transition: "all 0.2s", marginTop: catItems.length > 0 ? "8px" : "0" }}
              onMouseEnter={e => { e.currentTarget.style.background = cat.color; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderStyle = "solid"; }}
              onMouseLeave={e => { e.currentTarget.style.background = cat.light; e.currentTarget.style.color = cat.color; e.currentTarget.style.borderStyle = "dashed"; }}
            >+ Add a link</button>
          )}
        </div>
      )}
    </div>
  );
}
 
export default function App() {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("her_wishlist_v1");
      return saved ? JSON.parse(saved) : Object.fromEntries(CATEGORIES.map(c => [c.id, []]));
    } catch {
      return Object.fromEntries(CATEGORIES.map(c => [c.id, []]));
    }
  });
 
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
 
  useEffect(() => {
    try { localStorage.setItem("her_wishlist_v1", JSON.stringify(items)); } catch {}
  }, [items]);
 
  const handleAdd = (catId, item) => {
    setItems(prev => ({ ...prev, [catId]: [...(prev[catId] || []), item] }));
  };
 
  const handleDelete = (catId, idx) => {
    setItems(prev => ({ ...prev, [catId]: prev[catId].filter((_, i) => i !== idx) }));
  };
 
  const filteredCats = CATEGORIES.filter(c => {
    if (activeTab !== "all" && c.id !== activeTab) return false;
    if (search) {
      const s = search.toLowerCase();
      return c.label.toLowerCase().includes(s) || (items[c.id] || []).some(i => i.url.toLowerCase().includes(s) || (i.note || "").toLowerCase().includes(s));
    }
    return true;
  });
 
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #fff0f6 0%, #fce4f0 40%, #f9d8eb 100%)", position: "relative", fontFamily: "'Georgia', serif" }}>
      <FloatingPetals />
 
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "36px 16px 60px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px", position: "relative" }}>
          {/* Nami tangerine left decoration */}
          <svg width="44" height="44" viewBox="0 0 44 44" style={{ position: "absolute", left: "0", top: "10px", opacity: 0.7, animation: "pulse 4s infinite 0.5s" }}>
            <circle cx="22" cy="26" r="16" fill="#ff8c42" />
            <ellipse cx="22" cy="12" rx="3" ry="6" fill="#4a8c3f" />
            <ellipse cx="17" cy="13" rx="5" ry="2.5" fill="#4a8c3f" transform="rotate(-20 17 13)" />
            <ellipse cx="27" cy="13" rx="5" ry="2.5" fill="#4a8c3f" transform="rotate(20 27 13)" />
            <circle cx="18" cy="24" r="2" fill="#ff6b1a" opacity="0.5" />
          </svg>
          {/* Luffy hat right decoration */}
          <svg width="52" height="32" viewBox="0 0 52 32" style={{ position: "absolute", right: "0", top: "0px", opacity: 0.7, animation: "pulse 3.5s infinite 1s" }}>
            <ellipse cx="26" cy="22" rx="24" ry="7" fill="#e8c840" />
            <ellipse cx="26" cy="17" rx="14" ry="10" fill="#e8c840" />
            <rect x="4" y="21" width="44" height="3" rx="1.5" fill="#c8a020" />
            <rect x="11" y="16" width="30" height="3" rx="1.5" fill="#f4a0b5" />
          </svg>
          <div style={{ fontSize: "2.8rem", marginBottom: "6px", animation: "pulse 3s infinite" }}>🌸</div>
          <h1 style={{ fontSize: "2.4rem", fontWeight: 900, color: "#b5245c", margin: 0, letterSpacing: "-1px", textShadow: "0 2px 16px rgba(180,36,92,0.15)" }}>
            Her Wishlist
          </h1>
          <p style={{ color: "#d07090", fontSize: "0.95rem", margin: "8px 0 0", fontStyle: "italic" }}>
            All the beautiful things Mera bubu loves, in one place ❤️
          </p>
          {/* Wanted poster style mini badge */}
          <div style={{ display: "inline-block", marginTop: "12px", background: "#fff8e0", border: "2px solid #c8a020", borderRadius: "8px", padding: "4px 14px", fontSize: "0.72rem", color: "#8b6010", fontWeight: 700, letterSpacing: "1px", boxShadow: "0 2px 8px rgba(200,160,30,0.2)" }}>
            ⚓ WANTED: All Beautiful Things ⚓
          </div>
        </div>
 
        {/* Metrics */}
        <MetricsBar items={items} />
 
        {/* Search */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "1rem", pointerEvents: "none" }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search your wishlist..."
            style={{ width: "100%", padding: "12px 14px 12px 40px", borderRadius: "50px", border: "1.5px solid #f4b0d0", background: "#fff", fontSize: "0.9rem", color: "#8b3060", outline: "none", boxSizing: "border-box", boxShadow: "0 2px 12px rgba(200,100,150,0.10)" }} />
        </div>
 
        {/* Category Quick Tabs */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "10px", marginBottom: "24px", scrollbarWidth: "none" }}>
          <button onClick={() => setActiveTab("all")} style={{ flexShrink: 0, padding: "7px 16px", borderRadius: "50px", border: `1.5px solid ${activeTab === "all" ? "#c2185b" : "#f4b0d0"}`, background: activeTab === "all" ? "#c2185b" : "#fff", color: activeTab === "all" ? "#fff" : "#c2185b", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", transition: "all 0.2s" }}>🌸 All</button>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setActiveTab(c.id === activeTab ? "all" : c.id)} style={{ flexShrink: 0, padding: "7px 14px", borderRadius: "50px", border: `1.5px solid ${activeTab === c.id ? c.color : "#f4b0d0"}`, background: activeTab === c.id ? c.color : "#fff", color: activeTab === c.id ? "#fff" : c.color, fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}>
              {c.emoji} {c.label}
              {(items[c.id] || []).length > 0 && <span style={{ marginLeft: "4px", background: activeTab === c.id ? "rgba(255,255,255,0.3)" : c.color + "22", borderRadius: "10px", padding: "0 5px", fontSize: "0.7rem" }}>{items[c.id].length}</span>}
            </button>
          ))}
        </div>
 
        {/* Category Panels */}
        {filteredCats.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#d4a0b8", fontSize: "1rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>🌷</div>
            Nothing found for "{search}"
          </div>
        )}
        {filteredCats.map(cat => (
          <CategoryPanel key={cat.id} cat={cat} items={items} onAdd={(item) => handleAdd(cat.id, item)} onDelete={handleDelete} />
        ))}
 
        {/* One Piece section — only on All tab */}
        {activeTab === "all" && (
          <>
            {/* Zoro showcase card */}
            <div style={{ margin: "36px 0 16px", background: "linear-gradient(135deg, #0d1a0d 0%, #1a2e10 40%, #0d1a0d 100%)", borderRadius: "20px", padding: "20px 24px", border: "2px solid #5db85d", boxShadow: "0 4px 28px rgba(30,100,30,0.35)", position: "relative", overflow: "hidden" }}>
              {/* diagonal stripe texture */}
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.06, backgroundImage: "repeating-linear-gradient(135deg, #5db85d 0, #5db85d 1px, transparent 0, transparent 50%)", backgroundSize: "14px 14px" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "18px", position: "relative" }}>
 
                {/* ===== ZORO SVG ===== */}
                <svg width="80" height="110" viewBox="0 0 80 110" style={{ flexShrink: 0, animation: "pulse 3s infinite" }}>
                  {/* green spiky hair */}
                  <ellipse cx="40" cy="22" rx="18" ry="16" fill="#2e8b2e" />
                  <polygon points="26,14 20,4 28,16" fill="#2e8b2e" />
                  <polygon points="34,10 30,0 36,12" fill="#2e8b2e" />
                  <polygon points="42,8 40,0 45,11" fill="#2e8b2e" />
                  <polygon points="50,10 52,1 54,13" fill="#2e8b2e" />
                  <polygon points="57,14 62,5 58,17" fill="#2e8b2e" />
                  {/* white bandana on head */}
                  <rect x="22" y="20" width="36" height="7" rx="3.5" fill="#e8e8e8" />
                  <line x1="22" y1="23" x2="58" y2="23" stroke="#ccc" strokeWidth="0.8" />
                  {/* bandana knot right side */}
                  <ellipse cx="59" cy="22" rx="4" ry="3" fill="#e0e0e0" />
                  {/* face */}
                  <ellipse cx="40" cy="38" rx="14" ry="14" fill="#f0c080" />
                  {/* left eye normal */}
                  <ellipse cx="34" cy="36" rx="2.5" ry="2.8" fill="#111" />
                  <circle cx="34.8" cy="35" r="0.8" fill="#fff" />
                  {/* right eye — scar closed */}
                  <line x1="44" y1="31" x2="47" y2="42" stroke="#c84040" strokeWidth="2" strokeLinecap="round" />
                  <line x1="42" y1="36" x2="49" y2="38" stroke="#c84040" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                  {/* closed right eye lid */}
                  <path d="M43 36 Q46 34 48 37" fill="none" stroke="#111" strokeWidth="1.4" strokeLinecap="round" />
                  {/* mouth — serious expression */}
                  <line x1="36" y1="43" x2="44" y2="43" stroke="#8b5020" strokeWidth="1.4" strokeLinecap="round" />
                  {/* earring left */}
                  <circle cx="26" cy="40" r="1.5" fill="#e8c840" />
                  <circle cx="26" cy="43" r="1" fill="#e8c840" />
                  {/* dark green shirt / open chest */}
                  <path d="M26 52 L28 48 L40 54 L52 48 L54 52 L54 80 L26 80 Z" fill="#1a4a1a" />
                  {/* open chest V */}
                  <path d="M33 48 L40 58 L47 48" fill="#f0c080" />
                  {/* green haramaki belt */}
                  <rect x="26" y="72" width="28" height="8" rx="2" fill="#2e6b2e" />
                  <rect x="30" y="72" width="20" height="8" rx="2" fill="#3a8a3a" />
                  {/* THREE SWORDS */}
                  {/* left sword — held at hip */}
                  <rect x="10" y="44" width="3.5" height="48" rx="1.5" fill="#c0c0c8" />
                  <rect x="9" y="42" width="5.5" height="6" rx="1" fill="#c8a020" />
                  <rect x="10.5" y="38" width="2.5" height="6" rx="1" fill="#8b6010" />
                  {/* middle sword — at back diagonal */}
                  <rect x="37" y="36" width="3" height="52" rx="1.5" fill="#d0d0d8" transform="rotate(8 37 36)" />
                  <rect x="35" y="34" width="7" height="5" rx="1" fill="#b08820" transform="rotate(8 35 34)" />
                  {/* right sword in mouth (Zoro's iconic) */}
                  <rect x="52" y="34" width="2.8" height="40" rx="1.2" fill="#b8b8c0" transform="rotate(-12 52 34)" />
                  <rect x="50" y="32" width="7" height="5" rx="1" fill="#c09820" transform="rotate(-12 50 32)" />
                  {/* mouth sword handle near mouth */}
                  <rect x="44" y="40" width="9" height="3" rx="1.5" fill="#7a5010" />
                </svg>
 
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#5db85d", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "6px" }}>⚔️ Roronoa Zoro — First Mate ⚔️</div>
                  <div style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 700, fontFamily: "'Georgia', serif", lineHeight: 1.5, marginBottom: "8px" }}>
                    "Nothing happened." 😶🗡️
                  </div>
                  <div style={{ color: "#a8d8a8", fontSize: "0.8rem", lineHeight: 1.5, fontStyle: "italic" }}>
                    (He got lost finding this app... but still guards every item on your wishlist with three swords 🌿)
                  </div>
                  {/* three sword badge */}
                  <div style={{ marginTop: "10px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {["🗡️ Wado Ichimonji", "⚔️ Sandai Kitetsu", "🔪 Enma"].map(s => (
                      <span key={s} style={{ background: "#1a3a1a", border: "1px solid #3a7a3a", borderRadius: "20px", padding: "3px 10px", fontSize: "0.7rem", color: "#8fd88f", fontWeight: 600 }}>{s}</span>
                    ))}
                  </div>
                </div>
 
                {/* Zoro's Jolly Roger — 3 swords skull */}
                <svg width="44" height="44" viewBox="0 0 44 44" style={{ flexShrink: 0, opacity: 0.9, animation: "pulse 4s infinite 1.5s" }}>
                  <circle cx="22" cy="22" r="21" fill="#111" stroke="#5db85d" strokeWidth="1.5" />
                  <ellipse cx="22" cy="19" rx="8" ry="9" fill="#5db85d" />
                  <circle cx="18" cy="17" r="2" fill="#111" />
                  <circle cx="26" cy="17" r="2" fill="#111" />
                  <path d="M17 23 Q22 27 27 23" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
                  {/* 3 diagonal sword lines */}
                  <line x1="8" y1="10" x2="36" y2="38" stroke="#5db85d" strokeWidth="2" strokeLinecap="round" />
                  <line x1="22" y1="8" x2="22" y2="40" stroke="#5db85d" strokeWidth="2" strokeLinecap="round" />
                  <line x1="36" y1="10" x2="8" y2="38" stroke="#5db85d" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
 
            {/* Luffy / Pirate King banner */}
            <div style={{ margin: "16px 0 16px", background: "linear-gradient(135deg, #1a0a2e 0%, #2d0a3e 50%, #1a0a2e 100%)", borderRadius: "20px", padding: "18px 24px", border: "2px solid #f4a0b5", boxShadow: "0 4px 24px rgba(180,36,92,0.25)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.07, backgroundImage: "repeating-linear-gradient(45deg, #f4a0b5 0, #f4a0b5 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "16px", position: "relative" }}>
                {/* Luffy SVG */}
                <svg width="60" height="68" viewBox="0 0 60 68" style={{ flexShrink: 0, animation: "pulse 2.5s infinite" }}>
                  <ellipse cx="30" cy="18" rx="26" ry="7" fill="#e8c840" />
                  <ellipse cx="30" cy="15" rx="15" ry="10" fill="#e8c840" />
                  <rect x="6" y="17" width="48" height="3" rx="1.5" fill="#c8a020" />
                  <rect x="14" y="14" width="32" height="3" rx="1.5" fill="#f4a0b5" />
                  <ellipse cx="30" cy="34" rx="13" ry="13" fill="#f4c090" />
                  <ellipse cx="25" cy="32" rx="2.5" ry="3" fill="#111" />
                  <ellipse cx="35" cy="32" rx="2.5" ry="3" fill="#111" />
                  <circle cx="25.8" cy="31" r="0.9" fill="#fff" />
                  <circle cx="35.8" cy="31" r="0.9" fill="#fff" />
                  <line x1="35" y1="35" x2="38" y2="39" stroke="#d04040" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M22 38 Q30 46 38 38" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M24 39 Q30 45 36 39" fill="#fff" />
                  <rect x="20" y="47" width="20" height="18" rx="4" fill="#cc2020" />
                  <path d="M28 47 L30 52 L32 47" fill="#f4c090" />
                  <rect x="8" y="48" width="13" height="5" rx="2.5" fill="#cc2020" />
                  <rect x="39" y="48" width="13" height="5" rx="2.5" fill="#cc2020" />
                </svg>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#f4a0b5", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px" }}>⚓ Pirate King's Decree ⚓</div>
                  <div style={{ color: "#fff", fontSize: "0.92rem", fontWeight: 700, fontFamily: "'Georgia', serif", lineHeight: 1.4 }}>
                    "I'm gonna be King of the Pirates — and she's gonna have the greatest wishlist in the Grand Line!" 🏴‍☠️
                  </div>
                  <div style={{ color: "#f4a0b5", fontSize: "0.75rem", marginTop: "6px" }}>— Your Mard, probably 💗</div>
                </div>
                <svg width="36" height="36" viewBox="0 0 36 36" style={{ flexShrink: 0, opacity: 0.85, animation: "pulse 3s infinite 1s" }}>
                  <circle cx="18" cy="18" r="17" fill="#111" stroke="#f4a0b5" strokeWidth="1.5" />
                  <ellipse cx="18" cy="15" rx="7" ry="8" fill="#f4a0b5" />
                  <circle cx="15" cy="13" r="1.8" fill="#111" />
                  <circle cx="21" cy="13" r="1.8" fill="#111" />
                  <path d="M14 18 Q18 22 22 18" fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="6" y1="24" x2="30" y2="27" stroke="#f4a0b5" strokeWidth="2" strokeLinecap="round" />
                  <line x1="6" y1="27" x2="30" y2="24" stroke="#f4a0b5" strokeWidth="2" strokeLinecap="round" />
                  <ellipse cx="18" cy="10" rx="8" ry="3.5" fill="#e8c840" />
                  <ellipse cx="18" cy="8" rx="4.5" ry="3" fill="#e8c840" />
                </svg>
              </div>
            </div>
 
            {/* Footer */}
            <div style={{ textAlign: "center", marginTop: "20px", color: "#d4a0b8", fontSize: "0.82rem", fontStyle: "italic", lineHeight: 1.7 }}>
              Made with 💗 just for you my eklauti Aurat, my love ❤️<br />
              <span style={{ fontSize: "0.78rem" }}>Your personal shopping diary by your Mard 🏴‍☠️</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
