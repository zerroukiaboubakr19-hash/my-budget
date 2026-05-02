
import { useState } from "react";

const COLORS = {
  bg: "#F7F6F3",
  card: "#FFFFFF",
  border: "#E8E6E1",
  text: "#37352F",
  muted: "#787774",
  accent: "#2383E2",
  green: "#0F7B6C",
  greenBg: "#DDFAF3",
  red: "#E03E3E",
  redBg: "#FFE2E2",
  yellow: "#DFAB01",
  yellowBg: "#FFF8DC",
  blue: "#0B6E99",
  blueBg: "#DAEDF7",
  purple: "#6940A5",
  purpleBg: "#EAE4F2",
  orangeBg: "#FAEBDD",
  orange: "#D9730D",
};

const categories = [
  { emoji: "🏠", name: "Housing", budget: 1500, spent: 1500 },
  { emoji: "🛒", name: "Groceries", budget: 400, spent: 312 },
  { emoji: "🚗", name: "Transport", budget: 250, spent: 198 },
  { emoji: "🍽️", name: "Dining Out", budget: 200, spent: 224 },
  { emoji: "🎬", name: "Entertainment", budget: 100, spent: 67 },
  { emoji: "💪", name: "Health & Fitness", budget: 150, spent: 150 },
  { emoji: "👗", name: "Shopping", budget: 200, spent: 89 },
  { emoji: "🌐", name: "Subscriptions", budget: 80, spent: 78 },
  { emoji: "🧾", name: "Utilities", budget: 180, spent: 155 },
  { emoji: "🎁", name: "Miscellaneous", budget: 100, spent: 43 },
];

const transactions = [
  { date: "May 01", desc: "Monthly Salary", amount: 5200, type: "Income", category: "💼 Income", notes: "Main paycheck" },
  { date: "May 01", desc: "Rent Payment", amount: 1500, type: "Expense", category: "🏠 Housing", notes: "May rent" },
  { date: "May 03", desc: "Whole Foods Market", amount: 156, type: "Expense", category: "🛒 Groceries", notes: "Weekly shop" },
  { date: "May 05", desc: "Freelance Project", amount: 800, type: "Income", category: "💼 Income", notes: "UI design gig" },
  { date: "May 07", desc: "Uber + Metro Card", amount: 89, type: "Expense", category: "🚗 Transport", notes: "Commute week 1" },
  { date: "May 10", desc: "Dinner at Nobu", amount: 124, type: "Expense", category: "🍽️ Dining Out", notes: "Anniversary dinner" },
  { date: "May 12", desc: "Spotify + Netflix + Apple", amount: 43, type: "Expense", category: "🌐 Subscriptions", notes: "Monthly subs" },
  { date: "May 14", desc: "Trader Joe's", amount: 98, type: "Expense", category: "🛒 Groceries", notes: "Midweek restock" },
  { date: "May 17", desc: "Planet Fitness", amount: 25, type: "Expense", category: "💪 Health & Fitness", notes: "Monthly membership" },
  { date: "May 20", desc: "Amazon — Clothing", amount: 89, type: "Expense", category: "👗 Shopping", notes: "Summer basics" },
];

const trendData = [
  { month: "March", spent: 2640 },
  { month: "April", spent: 3200 },
  { month: "May", spent: 2816 },
];

function ProgressBar({ spent, budget }) {
  const pct = Math.min(spent / budget, 1);
  const filled = Math.round(pct * 10);
  const empty = 10 - filled;
  const over = spent > budget;
  const almostOver = !over && pct >= 0.85;
  return (
    <div style={{ fontFamily: "monospace", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ letterSpacing: 1 }}>
        {"⬛".repeat(filled)}{"⬜".repeat(empty)}
      </span>
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
        fontWeight: 600,
        color: over ? COLORS.red : almostOver ? COLORS.yellow : COLORS.green,
      }}>
        {over ? "🚨 " : ""}{Math.round(pct * 100)}%
      </span>
    </div>
  );
}

function StatusBadge({ spent, budget }) {
  const pct = spent / budget;
  if (pct > 1) return <span style={{ color: COLORS.red, fontWeight: 700, fontSize: 13 }}>🚨 Over Budget</span>;
  if (pct >= 0.85) return <span style={{ color: COLORS.yellow, fontWeight: 700, fontSize: 13 }}>⚠️ Almost</span>;
  return <span style={{ color: COLORS.green, fontWeight: 700, fontSize: 13 }}>✅ On Track</span>;
}

function Callout({ emoji, label, value, bg, color, subtext }) {
  return (
    <div style={{
      background: bg,
      borderRadius: 10,
      padding: "16px 20px",
      flex: 1,
      minWidth: 0,
      borderLeft: `4px solid ${color}`,
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>
        {emoji} {label}
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.text, lineHeight: 1.1 }}>{value}</div>
      {subtext && <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 4 }}>{subtext}</div>}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: COLORS.border, margin: "32px 0" }} />;
}

function SectionHeading({ emoji, title, sub }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: COLORS.text, fontFamily: "'DM Serif Display', serif" }}>
        {emoji} {title}
      </h2>
      {sub && <p style={{ margin: "4px 0 0", fontSize: 13, color: COLORS.muted }}>{sub}</p>}
    </div>
  );
}

function TrendBar({ month, spent, max }) {
  const blocks = Math.round((spent / max) * 20);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
      <span style={{ width: 52, fontSize: 13, fontWeight: 600, color: COLORS.muted, flexShrink: 0 }}>{month}</span>
      <span style={{ fontSize: 16, letterSpacing: -1, lineHeight: 1 }}>{"🟦".repeat(blocks)}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, flexShrink: 0 }}>${spent.toLocaleString()}</span>
    </div>
  );
}

export default function App() {
  const [openToggle, setOpenToggle] = useState(false);

  const totalIncome = 6000;
  const totalExpenses = categories.reduce((a, c) => a + c.spent, 0);
  const netSavings = totalIncome - totalExpenses;
  const savingsRate = ((netSavings / totalIncome) * 100).toFixed(1);
  const totalBudget = categories.reduce((a, c) => a + c.budget, 0);
  const budgetRemaining = totalBudget - totalExpenses;
  const maxTrend = Math.max(...trendData.map(d => d.spent));

  return (
    <div style={{
      background: COLORS.bg,
      minHeight: "100vh",
      fontFamily: "'DM Sans', sans-serif",
      color: COLORS.text,
      padding: "0 0 80px",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: "#fff",
        borderBottom: `1px solid ${COLORS.border}`,
        padding: "28px 40px 24px",
        marginBottom: 32,
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
            💼 Personal Finance · May 2026
          </div>
          <h1 style={{
            margin: 0,
            fontSize: 36,
            fontWeight: 800,
            color: COLORS.text,
            fontFamily: "'DM Serif Display', serif",
            letterSpacing: -0.5,
          }}>
            💰 Monthly Spending Tracker
          </h1>
          <p style={{ margin: "8px 0 0", color: COLORS.muted, fontSize: 14 }}>
            Your all-in-one financial hub — track income, expenses, budgets & savings in one place.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>

        {/* ── DASHBOARD ── */}
        <SectionHeading emoji="📊" title="Monthly Dashboard" sub="All figures update automatically from your transaction log and category budgets." />

        <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
          <Callout emoji="💰" label="Total Income" value={`$${totalIncome.toLocaleString()}`} bg={COLORS.greenBg} color={COLORS.green} subtext="Salary + freelance" />
          <Callout emoji="💸" label="Total Expenses" value={`$${totalExpenses.toLocaleString()}`} bg={COLORS.redBg} color={COLORS.red} subtext="All categories combined" />
          <Callout emoji="🏦" label="Net Savings" value={`$${netSavings.toLocaleString()}`} bg={COLORS.blueBg} color={COLORS.blue} subtext="Income − Expenses" />
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Callout emoji="📈" label="Savings Rate" value={`${savingsRate}%`} bg={COLORS.purpleBg} color={COLORS.purple} subtext={savingsRate >= 20 ? "🎉 Above 20% goal!" : "🎯 Aim for 20%+"} />
          <Callout emoji="🎯" label="Total Budget" value={`$${totalBudget.toLocaleString()}`} bg={COLORS.yellowBg} color={COLORS.yellow} subtext="Sum of all categories" />
          <Callout emoji="✅" label="Budget Remaining" value={`$${budgetRemaining.toLocaleString()}`} bg={budgetRemaining >= 0 ? COLORS.greenBg : COLORS.redBg} color={budgetRemaining >= 0 ? COLORS.green : COLORS.red} subtext={budgetRemaining >= 0 ? "Still within budget" : "Over budget!"} />
        </div>

        <Divider />

        {/* ── CATEGORY BUDGETS ── */}
        <SectionHeading emoji="🗂️" title="Category Budget Tracker" sub="Monitor your spending by category. Progress bars update as you log transactions." />

        <div style={{
          background: COLORS.card,
          borderRadius: 12,
          border: `1px solid ${COLORS.border}`,
          overflow: "hidden",
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: COLORS.bg, borderBottom: `1px solid ${COLORS.border}` }}>
                {["🏷️ Category", "🎯 Budget", "💸 Spent", "📊 Progress", "🚦 Status"].map(h => (
                  <th key={h} style={{
                    padding: "12px 16px", textAlign: "left", fontSize: 11,
                    fontWeight: 700, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, i) => (
                <tr key={cat.name} style={{
                  borderBottom: i < categories.length - 1 ? `1px solid ${COLORS.border}` : "none",
                  background: i % 2 === 0 ? "#fff" : "#FAFAF9",
                }}>
                  <td style={{ padding: "14px 16px", fontWeight: 600, fontSize: 14 }}>{cat.emoji} {cat.name}</td>
                  <td style={{ padding: "14px 16px", fontSize: 14, color: COLORS.muted }}>${cat.budget}</td>
                  <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 600, color: cat.spent > cat.budget ? COLORS.red : COLORS.text }}>${cat.spent}</td>
                  <td style={{ padding: "14px 16px" }}><ProgressBar spent={cat.spent} budget={cat.budget} /></td>
                  <td style={{ padding: "14px 16px" }}><StatusBadge spent={cat.spent} budget={cat.budget} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Divider />

        {/* ── TREND ── */}
        <SectionHeading emoji="📉" title="Monthly Spending Trend" sub="3-month overview — bars scale proportionally to spending." />

        <div style={{
          background: "#F0F7FF",
          border: `1px solid #C5DDF7`,
          borderRadius: 12,
          padding: "24px 28px",
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.blue, marginBottom: 18, textTransform: "uppercase", letterSpacing: 1 }}>
            📊 Spending by Month
          </div>
          {trendData.map(d => (
            <TrendBar key={d.month} month={d.month} spent={d.spent} max={maxTrend} />
          ))}
          <div style={{ marginTop: 16, fontSize: 12, color: COLORS.muted, borderTop: `1px solid #C5DDF7`, paddingTop: 12 }}>
            💡 Each 🟦 = ~${Math.round(maxTrend / 20).toLocaleString()} · Highest month sets the scale (20 blocks)
          </div>
        </div>

        <Divider />

        {/* ── SAVINGS SPOTLIGHT ── */}
        <SectionHeading emoji="✨" title="Monthly Savings Spotlight" sub="A quick snapshot of how this month's savings stack up." />

        <div style={{
          background: "linear-gradient(135deg, #F0FDF8 0%, #E8F4FD 100%)",
          border: `1px solid #B8E8D8`,
          borderRadius: 12,
          padding: "24px 28px",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 40px", marginBottom: 20 }}>
            {[
              { emoji: "💰", label: "Income this month", value: `$${totalIncome.toLocaleString()}` },
              { emoji: "💸", label: "Expenses this month", value: `$${totalExpenses.toLocaleString()}` },
              { emoji: "🏦", label: "Amount Saved", value: `$${netSavings.toLocaleString()}` },
              { emoji: "📈", label: "Savings Rate", value: `${savingsRate}%` },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 20 }}>{item.emoji}</span>
                <div>
                  <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600 }}>{item.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.text }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{
            background: "rgba(255,255,255,0.7)",
            borderRadius: 8,
            padding: "14px 18px",
            fontSize: 13,
            color: COLORS.text,
            borderLeft: `3px solid ${COLORS.green}`,
          }}>
            💬 <strong>Tip:</strong> Financial experts recommend saving <strong>20%+</strong> of your income.{" "}
            {savingsRate >= 20
              ? `You're at ${savingsRate}% — you're crushing it! 🎉 Keep it up.`
              : `You're at ${savingsRate}% — just ${(20 - savingsRate).toFixed(1)}% away from the 20% goal. You've got this! 💪`}
          </div>
        </div>

        <Divider />

        {/* ── TRANSACTION LOG ── */}
        <SectionHeading emoji="🧾" title="Transaction Log" sub="Log every income and expense here. Categories auto-feed your budget tracker." />

        <div style={{
          background: COLORS.card,
          borderRadius: 12,
          border: `1px solid ${COLORS.border}`,
          overflow: "hidden",
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: COLORS.bg, borderBottom: `1px solid ${COLORS.border}` }}>
                {["📅 Date", "📝 Description", "💵 Amount", "🔁 Type", "🏷️ Category", "📌 Notes"].map(h => (
                  <th key={h} style={{
                    padding: "12px 14px", textAlign: "left", fontSize: 11,
                    fontWeight: 700, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i} style={{
                  borderBottom: i < transactions.length - 1 ? `1px solid ${COLORS.border}` : "none",
                  background: i % 2 === 0 ? "#fff" : "#FAFAF9",
                }}>
                  <td style={{ padding: "12px 14px", fontSize: 13, color: COLORS.muted, fontWeight: 500 }}>{t.date}</td>
                  <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 600 }}>{t.desc}</td>
                  <td style={{
                    padding: "12px 14px", fontSize: 13, fontWeight: 700,
                    color: t.type === "Income" ? COLORS.green : COLORS.red
                  }}>
                    {t.type === "Income" ? "+" : "−"}${t.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{
                      display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                      background: t.type === "Income" ? COLORS.greenBg : COLORS.redBg,
                      color: t.type === "Income" ? COLORS.green : COLORS.red,
                    }}>{t.type === "Income" ? "⬆️ Income" : "⬇️ Expense"}</span>
                  </td>
                  <td style={{ padding: "12px 14px", fontSize: 13 }}>{t.category}</td>
                  <td style={{ padding: "12px 14px", fontSize: 12, color: COLORS.muted }}>{t.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Divider />

        {/* ── HOW TO USE ── */}
        <div
          onClick={() => setOpenToggle(!openToggle)}
          style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            padding: "18px 24px",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 18, transition: "transform 0.2s", display: "inline-block", transform: openToggle ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
            <span style={{ fontWeight: 800, fontSize: 16 }}>📖 How to Use This Template — Start Here!</span>
          </div>

          {openToggle && (
            <div style={{ marginTop: 20, paddingLeft: 32 }}>
              {[
                { emoji: "1️⃣", title: "Set your monthly income", body: "Open the Transaction Log and add your income sources (salary, freelance, etc.) with the Type set to Income. Your dashboard totals will update automatically." },
                { emoji: "2️⃣", title: "Adjust your category budgets", body: "Go to the Category Budget Tracker and update the Budget column for each category to reflect your actual monthly targets. Be honest — realistic budgets work better!" },
                { emoji: "3️⃣", title: "Log every expense", body: "Each time you spend money, add a row to the Transaction Log. Include the amount, category, and a quick note. Aim to log daily or weekly for best accuracy." },
                { emoji: "4️⃣", title: "Watch your progress bars", body: "Your Category Budget Tracker progress bars (⬛⬜) update as you log spending. Keep an eye on 🚨 Over Budget rows and adjust spending accordingly." },
                { emoji: "5️⃣", title: "Review your Savings Spotlight monthly", body: "At month end, check your Savings Spotlight for a full summary. If you're below 20% savings rate, look at your biggest expense categories for cutbacks." },
              ].map((step, i) => (
                <div key={i} style={{ marginBottom: 18, display: "flex", gap: 14 }}>
                  <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{step.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{step.title}</div>
                    <div style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.6 }}>{step.body}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 48, textAlign: "center", fontSize: 12, color: COLORS.muted }}>
          💡 Template by Monthly Spending Tracker · Duplicate this page to start a fresh month · Made with ❤️ in Notion
        </div>

      </div>
    </div>
  );
}
