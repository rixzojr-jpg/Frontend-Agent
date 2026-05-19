
import { useState } from "react";

export default function App() {
  const [pair, setPair] = useState("BTC-USDT");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyze() {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ pair })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setResult(data.analysis);
    } catch (err) {
      setResult("ERROR: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      background:"#050b14",
      minHeight:"100vh",
      color:"#cce6ff",
      padding:"40px",
      fontFamily:"monospace"
    }}>
      <h1>Institutional Trading Agent</h1>

      <input
        value={pair}
        onChange={(e)=>setPair(e.target.value)}
        style={{
          padding:"12px",
          width:"240px",
          background:"#0d1626",
          border:"1px solid #335577",
          color:"#fff"
        }}
      />

      <button
        onClick={analyze}
        disabled={loading}
        style={{
          marginLeft:"10px",
          padding:"12px 20px",
          background:"#0066cc",
          color:"#fff",
          border:"none",
          cursor:"pointer"
        }}
      >
        {loading ? "Analyzing..." : "Run Analysis"}
      </button>

      <pre style={{
        marginTop:"30px",
        whiteSpace:"pre-wrap",
        background:"#08111f",
        padding:"20px",
        border:"1px solid #223344",
        borderRadius:"8px"
      }}>
        {result}
      </pre>
    </div>
  );
}
