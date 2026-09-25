"use client";

import {
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

export default function Error({ reset }) {
  const styles = {
    errorPage: {
      minHeight: "70vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 20px",
    },

    errorContent: {
      width: "min(100%, 560px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },

    icon: {
      marginBottom: "22px",
      color: "#ccff00",
    },

    code: {
      color: "#ccff00",
      fontSize: "11px",
      fontWeight: "900",
      letterSpacing: "0.18em",
    },

    title: {
      marginTop: "12px",
      fontFamily: "var(--font-display), sans-serif",
      fontSize: "clamp(2.8rem, 7vw, 5rem)",
      lineHeight: "1",
      fontWeight: "700",
      letterSpacing: "-0.03em",
      textTransform: "uppercase",
    },

    description: {
      maxWidth: "450px",
      marginTop: "18px",
      color: "#92969d",
      fontSize: "14px",
      lineHeight: "1.7",
    },

    retryButton: {
      minHeight: "46px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "9px",
      marginTop: "28px",
      padding: "0 20px",
      border: "1px solid #ccff00",
      background: "#ccff00",
      color: "#090a0c",
      cursor: "pointer",
      fontSize: "11px",
      fontWeight: "900",
      letterSpacing: "0.05em",
    },
  };

  return (
    <section style={styles.errorPage}>
      <div style={styles.errorContent}>
        <AlertTriangle
          size={48}
          style={styles.icon}
        />

        <p style={styles.code}>
          FITLOG ERROR
        </p>

        <h1 style={styles.title}>
          SOMETHING WENT WRONG
        </h1>

        <p style={styles.description}>
          We could not load this part of FitLog.
          Please try again.
        </p>

        <button
          type="button"
          style={styles.retryButton}
          onClick={() => reset()}
        >
          <RotateCcw size={17} />
          TRY AGAIN
        </button>
      </div>
    </section>
  );
}